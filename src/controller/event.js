const { EventTypes, EventModel } = require("../model/event-model");
const Controller = require("./controller");
const { Util } = require("../lib/util");

module.exports = class EventController extends Controller {


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

        return new EventController().save(event)
            .then(event => {
                event.message = event.success ? message?.SUCCESS?.randomOne() : message?.FAIL?.randomOne()
                return event
            });
    }

    static robbery(...params) {
        return EventController.save(EventTypes.ROB, ...params)
    }

    static clubHooker(...params) {
        return EventController.save(EventTypes.CLUB_HOOKER, ...params)
    }

}
