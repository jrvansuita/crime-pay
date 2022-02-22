const RobberyPlace = require("../controller/place");
const Player = require("../controller/player");

const USERID = '620bd7d3167e2e95193329e1';


module.exports = class RobberyMecanics {

    constructor() {
        this.robberyPlaces = new RobberyPlace();
        this.player = new Player();
    }

    getPlayerAndAllPlacesList(callback) {
        this.player.get(USERID, (err, player) => {
            this.robberyPlaces.findAll((err, places) => {
                places = places.map((each) => { return this.calculatePlaceAttributes(player, each) })
                callback({ places: places, player: player });
            })
        });
    }


    getPlaceDetails(placeId, callback) {
        this.player.get(USERID, (err, player) => {
            this.robberyPlaces.find(placeId, (err, place) => {
                place = this.calculatePlaceAttributes(player, place);
                callback({ place: place, player: player });
            });
        });
    }


    calculatePlaceAttributes(player, place) {
        var intelligenceMultiplier = player.weapons.reduce((p, c) => p + c.intelligence, 0)
        var dexterityMultiplier = player.weapons.reduce((p, c) => p + c.dexterity, 0)

        var intelligence = player.intelligence * intelligenceMultiplier;
        var dexterity = player.dexterity * dexterityMultiplier;
        var strength = player.strength;

        var calc = (intelligence + dexterity + strength) / place.dificulty;
        var successChance = Math.trunc(calc * 100);
        successChance = Math.min(successChance, 100);
        place.successChance = successChance;

        var staminaCost = Math.trunc((100 / place.successChance) * 7.5);
        staminaCost = Math.min(staminaCost, 100);
        place.staminaCost = staminaCost;

        var coinsReward = (((place.dificulty / 2) * staminaCost * (intelligence + dexterity + strength)) / Math.max(successChance, 1)) / 550;

        var decreaseReward = (100 + (player.intoxication * 5)) / Math.max(player.stamina, 20)
        decreaseReward = Math.min(Math.max(decreaseReward, 1.01), 9.25);

        if (decreaseReward > 1) {
            coinsReward = coinsReward * (1 - (decreaseReward / 10));
        }

        place.coinsReward = Math.max(Math.trunc(coinsReward), 1);

        return place;
    }


}