const EventData = require('../db/data-access/event');
const { EscapeAttempt, BribeAttempt } = require("../actions/prison/release-attempt");
const Mechanics = require("./mechanics");
const EventTypes = require("../enum/event-types");


module.exports = class PrisonMechanics extends Mechanics {

    for(player) {

        return player.arrested ? {
            escape: new EscapeAttempt(player).make(false),
            bribe: new BribeAttempt(player).make(false)
        } : {};
    }

    makeAttempt(player, action, eventBuilder) {
        action.make();

        return super.update(player, action, eventBuilder).then(({ event, player }) => {
            return { event, player, newAttempt: this.for(player) };
        })
    }

    escape(player) {
        return Promise.resolve().then(() => {
            return this.makeAttempt(player, new EscapeAttempt(player), EventData.escape);
        })
    }

    bribe(player) {
        return Promise.resolve().then(() => {
            return this.makeAttempt(player, new BribeAttempt(player), EventData.bribe);
        });
    }

};




