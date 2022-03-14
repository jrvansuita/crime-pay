const moment = require("moment");
const constants = require('../const/constants');

const PlayerController = require("../controller/player");
const PlayerUpdateModel = require('../model/player-update-model');
const EventController = require('../controller/event');
const { EventTypes, EventModel } = require("../model/event-model");
const { PRISON_ESCAPE, PRISON_BRIBE } = require("../const/constants");
const { Num } = require("../lib/util");


module.exports = class PrisonMecanics {

    constructor() {
        this.playerController = new PlayerController();
        this.eventController = new EventController();
    }

    statsFor(player) {
        return player.arrested ? {
            escape: new Escape(player).get(),
            bribe: new Bribe(player).get()
        } : {};
    }

    makeAttempt(player, attempt, msg) {
        attempt.make();

        return this.playerController.update(player._id, attempt.data).then((updatedPlayer) => {

            return EventController.save(attempt.enventType, player._id, attempt.data, '', attempt.success, msg).then((event) => {
                return { player: updatedPlayer, event, newAttempt: this.statsFor(updatedPlayer) };
            })
        });
    }

    escape(player) {
        return Promise.resolve().then(() => {
            return this.makeAttempt(player, new Escape(player), PRISON_ESCAPE);
        });
    }

    bribe(player) {
        return Promise.resolve().then(() => {
            return this.makeAttempt(player, new Bribe(player), PRISON_BRIBE);
        });
    }



};



class ReleaseAttempt {

    constructor(player, enventType) {
        this.enventType = enventType;
        this.player = player;
        this.data = new PlayerUpdateModel(player);

        this.data.validate((player, model) => {
            model.check(!player.arrested, constants.PLAYER_NOT_ARRESTED)
                .check(player.stamina < Math.abs(model.stamina), constants.OUT_OF_STAMINA)
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

class Escape extends ReleaseAttempt {

    constructor(player) {
        super(player, EventTypes.PRISON_ESCAPE);

        this.escapeChance = Math.max(10, moment(this.player.arrestRelease).seconds());
    }

    get() {
        this.daysIncOnFail = Math.trunc(Math.max(1, this.escapeChance / 20));

        this.data
            .setRespect((this.player.respect * .05 * (100 / (100 - this.escapeChance)) + 2), this.success, 0, true)
            .setCoins(this.player.coins * (this.escapeChance / 250), false)
            .setStamina(((this.escapeChance * .5 * 100) / 60), false, 5, false, false)

        return this;
    }
}


class Bribe extends ReleaseAttempt {

    constructor(player) {
        super(player, EventTypes.PRISON_BRIBE);
        this.escapeChance = 100;
    }

    get() {
        this.data
            .setRespect((this.player.respect * .05 * .7) + 5, true, 0, true)
            .setCoins(this.player.coins * .41, false)
            .setStamina(this.player.stamina, false, 50, false, false)

        return this;
    }
}



