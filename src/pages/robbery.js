
const RobberyMecanics = require("../mecanics/robbery");



module.exports = class RobberyPage {

    constructor() {
        this.mecanics = new RobberyMecanics();
    }


    loadPage(callback) {
        this.mecanics.getPlayerAndAllPlacesList((data) => {
            data.places = data.places.sort(function (a, b) { return a.dificulty - b.dificulty });
            callback(data);
        });
    }

    makeRobbery(placeId, callback) {
        this.mecanics.makeRobbery(placeId, callback);
    }

    getPlaceDetails(placeId, callback) {
        this.mecanics.getPlaceDetails(placeId, callback);
    }

    getRobberyResult(id, callback) {
        this.mecanics.getRobberyResult(id, callback);
    }




}

