
const RobberyMecanics = require("../mecanics/robbery");
const ThiefController = require("../controller/complex/thief");
const RobberyPlaceController = require("../controller/robbery-place");



module.exports = class RobberyPage {

    constructor() {
        this.robberyMecanics = new RobberyMecanics();
        this.thiefController = new ThiefController();
        this.robberyPlaceController = new RobberyPlaceController();
    }

    load() {
        return this.thiefController.get(process.env.USER_ID);
    }

    place(placeId, thief) {
        return this.robberyPlaceController.placesDetails(placeId, thief);
    }

    places(thief) {
        return this.robberyPlaceController.placesFor(thief);
    }

    submit(placeId, thief) {
        return this.robberyMecanics.submit(placeId, thief);
    }

}

