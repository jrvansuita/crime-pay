const EventModel = require("../../model/event");
const EventTypes = require('../../enum/event-types');
const { Util } = require("../../lib/util");
const DataAccess = require("./data-access");

module.exports = class EventData extends DataAccess {

    constructor() {
        super('event');
    }

    save(event) {
        Util.clearProps(event.playerUpdate);
        Util.clearProps(event);

        return super.save(event);
    }

    static save(type, playerId, playerUpdate, typeItemId = '', success = false, message = null) {
        const event = new EventModel(type)
            .setPlayerId(playerId)
            .setPlayerUpdate(playerUpdate)
            .setTypeItemId(typeItemId)
            .setSuccess(success)

        return new EventData().save(event)
            .then(event => {
                event.message = event.success ? message?.SUCCESS?.randomOne() : message?.FAIL?.randomOne()
                return event
            });
    }

    static robbery(...params) {
        return EventData.save(EventTypes.ROB, ...params)
    }


}
