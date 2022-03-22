const moment = require("moment");
const phrase = require('../const/phrase');
const PlayerUpdateModel = require('../model/player-update');
const { Num } = require('../lib/util');
const { EventTypes } = require("../model/event");

class PrisonReleaseAttempt {

    constructor(player, enventType) {
        this.enventType = enventType;
        this.player = player;
        this.data = new PlayerUpdateModel(player);
        this.escapeChance = this.player.arrestRelease ? 100 : 0;

        this.coins = 0;
        this.respect = 0;
        this.stamina = 100;

        this.data.validate((player, model) => {
            model.check(!player.arrested, phrase.PLAYER_NOT_ARRESTED)
                .check(player.arrestRelease == null, phrase.FOR_LIFE_PRISON)
                .check(player.stamina < Math.abs(model.stamina), phrase.OUT_OF_STAMINA)
                .check(player.coins < Math.abs(model.coins), phrase.INSUFFICIENT_COINS)
        })
    }

    make() {

        this.success = Num.lucky(100) <= this.escapeChance;
        this.get();

        delete this.player;

        this.data
            .setArrested(!this.success, this.daysIncOnFail)
            .build();

        return this;
    }
}

class EscapeAttempt extends PrisonReleaseAttempt {

    constructor(player) {
        super(player, EventTypes.PRISON_ESCAPE);

        if (this.escapeChance)
            this.escapeChance = Math.max(10, moment(this.player.arrestRelease).seconds())
    }

    get() {

        if (this.escapeChance) {
            this.daysIncOnFail = Math.trunc(Math.max(1, this.escapeChance / 20));

            this.data
                .setRespect((this.player.respect * .05 * (100 / (100 - this.escapeChance)) + 2), this.success, 0, true)
                .setCoins(this.player.coins * ((Math.max(30, this.escapeChance) / 100) * .7), false)
                .setStamina(((this.escapeChance * .5 * 100) / 60), false, 5, false, false)

        }

        return this;
    }
}


class BribeAttempt extends PrisonReleaseAttempt {

    constructor(player) {
        super(player, EventTypes.PRISON_BRIBE);
    }

    get() {
        if (this.escapeChance) {
            this.data
                .setRespect((this.player.respect * .05 * .7) + 5, true, 0, true)
                .setCoins(this.player.coins * .41, false, 100, false, false)
                .setStamina(this.player.stamina, false, 50, false, false)
        }

        return this;
    }
}


module.exports = { BribeAttempt, EscapeAttempt }


