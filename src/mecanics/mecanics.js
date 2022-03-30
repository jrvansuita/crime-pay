const EventData = require("../db/data-access/event")
const PlayerData = require('../db/data-access/player');

module.exports = class Mecanics {

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

    modifyDispatch(method, player, actionOrModel, eventBuilder) {
        return this.playerData[method](player._id, (actionOrModel?.get?.() || actionOrModel)).then((updatedPlayer) => {
            return eventBuilder ? this.event(updatedPlayer, action, eventBuilder) : updatedPlayer;
        })
    }

    update(...p) {
        return this.modifyDispatch('update', ...p)
    }

    set(...p) {
        return this.modifyDispatch('set', ...p)
    }


}