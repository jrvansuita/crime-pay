
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

    getPlaceDetails(placeId, callback) {
        this.mecanics.getPlaceDetails(placeId, callback);
    }




}

