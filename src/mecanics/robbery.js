const PlaceController = require("../controller/place");
const PlayerData = require('../db/data-access/player');
const EventData = require('../db/data-access/event');
const RobberyAttempt = require('../actions/robbery-attempt');
const PHRASE = require("../const/phrase");


module.exports = class RobberyMecanics {

    constructor() {
        this.playerData = new PlayerData();
        this.placeController = new PlaceController();
        this.eventData = new EventData();
    }

    submit(placeId, player, fullStamina) {
        return this.placeController.details(placeId, player).then((place) => {

            var playerUpdate = new RobberyAttempt(player, place).make(fullStamina);

            return this.playerData.update(player._id, playerUpdate).then((updatedPlayer) => {

                return EventData.robbery(player._id, playerUpdate, placeId, !playerUpdate.arrested, PHRASE.ROBBERY).then((event) => {

                    return { event, player: updatedPlayer }
                })
            })
        })
    }

}
