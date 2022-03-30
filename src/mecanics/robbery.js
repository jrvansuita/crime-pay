const PlaceController = require("../controller/place");
const EventData = require('../db/data-access/event');
const RobberyAttempt = require('../actions/robbery-attempt');
const Mecanics = require("./mecanics");


module.exports = class RobberyMecanics extends Mecanics {

    constructor() {
        super();
        this.placeController = new PlaceController();
        this.eventData = new EventData();
    }



    submit(placeId, player, fullStamina) {
        return this.placeController.details(placeId, player).then((place) => {

            const action = new RobberyAttempt(player, place).make(fullStamina);

            return super.update(player, action, EventData.robbery);
        })
    }

}
