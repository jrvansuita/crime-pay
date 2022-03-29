const word = require('../const/word');
const moment = require("moment");
const phrase = require('../const/phrase');
const PlayerUpdateModel = require('../model/player-update');
const { Num } = require('../lib/util');
const Action = require("./action");

class PrisonReleaseAttempt extends Action {

    constructor(player, escapeChance) {
        super(player);
        this.escapeChance = escapeChance

        //For Life prison
        if (!this.player.arrestRelease) this.escapeChance = 0;
    }

    make(validate = true) {
        const success = Num.lucky(100) <= this.escapeChance;
        const update = new PlayerUpdateModel(this.player);


        if (validate) {
            update.validate((player, model) => {
                this.check(!player.arrested, phrase.PLAYER_NOT_ARRESTED)
                    .check(player.arrestRelease == null, phrase.FOR_LIFE_PRISON)
                    .check(player.stamina < Math.abs(model.stamina), phrase.OUT_OF_STAMINA)
                    .check(player.coins < Math.abs(model.coins), phrase.INSUFFICIENT_COINS)
            })
        }

        this.applyUpdateAttributes(update, success);

        return super.make(update.build());
    }
}



class EscapeAttempt extends PrisonReleaseAttempt {
    constructor(player) {
        super(player, Math.max(10, moment(player.arrestRelease).seconds()));
        this.daysIncOnFail = Math.trunc(Math.max(1, this.escapeChance / 20));
    }

    getElementName() {
        return word.PRISON.concat(word.ESCAPE);
    }

    applyUpdateAttributes(update, success) {
        update
            .setArrested(!success, this.daysIncOnFail)
            .setRespect((this.player.respect * .05 * (100 / (100 - this.escapeChance)) + 2), success, 0, true)
            .setCoins(this.player.coins * ((Math.max(30, this.escapeChance) / 100) * .7), false, 12)
            .setStamina(((this.escapeChance * .5 * 100) / 60), false, 15, false, false)
    }
}


class BribeAttempt extends PrisonReleaseAttempt {
    constructor(player) {
        super(player, 100);
    }

    getElementName() {
        return word.PRISON.concat(word.BRIBE);
    }

    applyUpdateAttributes(update) {
        update
            .setRespect((this.player.respect * .05 * .7) + 5, true, 0, true)
            .setCoins(this.player.coins * .41, false, 100, false, false)
            .setStamina(this.player.stamina, false, 50, false, false)
    }
}


module.exports = { EscapeAttempt, BribeAttempt }