const EventData = require("../db/data-access/event")
const PlayerData = require('../db/data-access/player');

module.exports = class Mecanics {

    constructor() {
        this.playerData = new PlayerData();
    }

    update(player, action, eventBuilder) {
        return this.playerData.update(player._id, action.get()).then((updatedPlayer) => {

            return eventBuilder(action.success())
                .setIds(player._id, action.getElementId())
                .setData(action.eventData())
                .save()
                .then((event) => {
                    return { event, player: updatedPlayer }
                })
        })
    }


}