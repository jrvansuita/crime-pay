const EventData = require("../db/data-access/event")
const PlayerData = require('../db/data-access/player');

module.exports = class Mechanics {

    constructor() {
        this.playerData = new PlayerData();
    }

    event(player, action, eventBuilder) {
        return eventBuilder(action.success())
            .setIds(player._id, action.getElementId())
            .setData(action.eventData())
            .save()
            .then((event) => {
                return { event, player: player }
            })
    }

    modifyDispatch(method, player, actionData, eventBuilder) {
        return this.playerData[method](player._id, (actionData?.get?.() || actionData)).then((updatedPlayer) => {
            return eventBuilder ? this.event(updatedPlayer, actionData, eventBuilder) : updatedPlayer;
        })
    }

    update(...p) {
        return this.modifyDispatch('update', ...p)
    }

    set(...p) {
        return this.modifyDispatch('set', ...p)
    }


}