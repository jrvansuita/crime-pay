const PlaceController = require("../controller/place");
const PlayerController = require('../controller/player');
const EventController = require('../controller/event');
const RobberyAttempt = require('../actions/robbery-attempt');
const PHRASE = require("../const/phrase");


module.exports = class RobberyMecanics {

    constructor() {
        this.playerController = new PlayerController();
        this.placeController = new PlaceController();
        this.eventController = new EventController();
    }

    submit(placeId, player) {
        return this.placeController.details(placeId, player).then((place) => {

            var playerUpdate = new RobberyAttempt(player, place).make();

            return this.playerController.update(player._id, playerUpdate).then((updatedPlayer) => {

                return EventController.robbery(player._id, playerUpdate, placeId, !playerUpdate.arrested, PHRASE.ROBBERY).then((event) => {

                    return { event, player: updatedPlayer }
                })
            })
        })
    }
}
