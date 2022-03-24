const PlayerData = require("../db/data-access/player");
const EventData = require('../db/data-access/event');
const { PRISON_ESCAPE, PRISON_BRIBE } = require("../const/phrase");
const { EscapeAttempt, BribeAttempt } = require("../actions/prison-release-attempt");


module.exports = class PrisonMecanics {

    constructor() {
        this.playerData = new PlayerData();
        this.eventData = new EventData();
    }

    for(player) {
        return player.arrested ? {
            escape: new EscapeAttempt(player).get(),
            bribe: new BribeAttempt(player).get()
        } : {};
    }

    makeAttempt(player, attempt, msg) {
        attempt.make();

        return this.playerData.update(player._id, attempt.data).then((updatedPlayer) => {

            return EventData.save(attempt.enventType, player._id, attempt.data, '', attempt.success, msg).then((event) => {
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




