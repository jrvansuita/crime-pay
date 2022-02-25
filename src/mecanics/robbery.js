const RobberyPlace = require("../controller/place");
const Player = require("../controller/player");
const RobberyResult = require("../model/robbert-result");

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

    makeRobbery(placeId, callback) {
        this.player.get(USERID, (err, player) => {
            this.robberyPlaces.find(placeId, (err, place) => {
                place = this.calculatePlaceAttributes(player, place);
                this.executeRobbery(player, place, callback);
            });
        });
    }


    calculatePlaceAttributes(player, place) {

        /* Defining Weapons Intelligence and Dexterity Multiplier Bonus */
        var intelligenceMultiplier = player.weapons.reduce((p, c) => p + c.intelligence, 0)
        var dexterityMultiplier = player.weapons.reduce((p, c) => p + c.dexterity, 0)

        /* Defining Player Attributes */
        var intelligence = player.intelligence * intelligenceMultiplier;
        var dexterity = player.dexterity * dexterityMultiplier;
        var strength = player.strength;

        /* Defining Robbery Success Chance */
        var successPoints = (intelligence + dexterity + strength);
        var failPoints = place.dificulty + (player.respect * 10);

        var successChance = successPoints / failPoints;

        successChance = Math.min(Math.trunc(successChance * 100), 100);
        place.successChance = successChance;

        /* Defining Stamina Cost */
        var staminaCost = Math.trunc((100 / place.successChance) * 7.5);
        staminaCost = Math.min(staminaCost, 100);
        place.staminaCost = staminaCost;

        /* Defining Coins Reward */
        var coinsReward = (((place.dificulty * .001) * (staminaCost * .01) * (intelligence + dexterity + strength)) / Math.max(successChance, 1));
        var decreaseReward = ((100 + (player.intoxication * 5)) / Math.max(player.stamina, 20)) * place.dificulty;
        decreaseReward = Math.min(Math.max(decreaseReward, 1.01), 9.25);

        if (decreaseReward > 1) {
            coinsReward = coinsReward * (1 - (decreaseReward / 10));
        }

        coinsReward = Math.max(Math.trunc(coinsReward), 1);
        place.coinsReward = coinsReward;


        /* Defining Respect Increse Bonus */

        var respect = ((coinsReward / 2) * ((place.dificulty / player.respect) * .001) / (staminaCost * .2));
        respect = Math.max(Math.trunc(respect, 1), 1);
        place.respect = respect;


        return place;
    }


    executeRobbery(player, place, callback) {

        const num = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        const success = num <= place.successChance;
        const difficult = Math.max(1, 100 - place.successChance);

        /* Defining Weapons Intelligence and Dexterity Multiplier Bonus */
        var intelligenceMultiplier = player.weapons.reduce((p, c) => p + c.intelligence, 0)
        var dexterityMultiplier = player.weapons.reduce((p, c) => p + c.dexterity, 0)

        /* Defining New Player Attributes */
        var intelligence = Math.max(1, (Math.trunc(((player.intelligence * .05) * (intelligenceMultiplier * .25)) + (difficult * .1))));
        var dexterity = Math.max(1, Math.trunc((((player.dexterity * .05) * (dexterityMultiplier * .25)) + (difficult * .1))));
        var strength = Math.max(1, Math.trunc((player.strength * .05) + (difficult * .015)));

        const result = new RobberyResult(success);

        result.setStats(place.coinsReward, place.respect, place.staminaCost)
        result.setAttributes(intelligence, dexterity, strength)
        result.apply(player);
        this.player.save(player, function (err, doc) {
            callback(result);
        })




    }

}