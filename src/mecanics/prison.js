const PlayerController = require("../controller/player");
const EventController = require('../controller/event');
const { PRISON_ESCAPE, PRISON_BRIBE } = require("../const/constants");
const { EscapeAttempt, BribeAttempt } = require("../actions/prison-release-attempt");


module.exports = class PrisonMecanics {

    constructor() {
        this.playerController = new PlayerController();
        this.eventController = new EventController();
    }

    for(player) {
        return player.arrested ? {
            escape: new EscapeAttempt(player).get(),
            bribe: new BribeAttempt(player).get()
        } : {};
    }

    makeAttempt(player, attempt, msg) {
        attempt.make();

        return this.playerController.update(player._id, attempt.data).then((updatedPlayer) => {

            return EventController.save(attempt.enventType, player._id, attempt.data, '', attempt.success, msg).then((event) => {
                return { player: updatedPlayer, event, newAttempt: this.for(updatedPlayer) };
            })
        });
    }

    escape(player) {
        return Promise.resolve().then(() => {
            return this.makeAttempt(player, new EscapeAttempt(player), PRISON_ESCAPE);
        });
    }

    bribe(player) {
        return Promise.resolve().then(() => {
            return this.makeAttempt(player, new BribeAttempt(player), PRISON_BRIBE);
        });
    }

};




