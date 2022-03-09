
const ThiefController = require("../controller/complex/thief");
const RobberyPlaceController = require("../controller/robbery-place");
const RobberyResultController = require("../controller/robbery-result");
const RobberyResult = require("../model/robbery-result");



module.exports = class RobberyMecanics {

    constructor() {
        this.thiefController = new ThiefController();
        this.robberyPlaceController = new RobberyPlaceController();
        this.robberyResultController = new RobberyResultController();
    }

    submit(placeId, thief, testing) {
        return this.robberyPlaceController.placesDetails(placeId, thief).then((place) => {
            var result = executeRobbery(place, thief);

            return this.thiefController.update(thief, result).then((updatedThief) => {
                return testing ? result : this.robberyResultController.save(result).then((resultData) => {
                    return { result: RobberyResult.parse(resultData), thief: updatedThief }
                })
            })
        })
    }
}

var executeRobbery = (place, player) => {
    const num = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    const success = num <= place.successChance;
    const difficult = Math.max(1, 100 - place.successChance);

    /* Defining Weapons Intelligence and Dexterity Multiplier Bonus */
    var intelligenceMultiplier = player.weapons.reduce((p, c) => p + c.intelligence, 0)
    var dexterityMultiplier = player.weapons.reduce((p, c) => p + c.dexterity, 0)

    /* Defining New Player Attributes */
    var intelligence = Math.max(1, (Math.trunc(((player.intelligence * .05) * (intelligenceMultiplier * .25)) + (difficult * .1))));
    var dexterity = Math.max(1, Math.trunc((((player.dexterity * .05) * (dexterityMultiplier * .25)) + (difficult * .1))));


    var strength = Math.max(1, Math.trunc((player.strength * .031) + (difficult * .013)));

    const result = new RobberyResult(success);

    result.setStats(place.coinsReward, place.respect, place.staminaCost)
    result.setAttributes(intelligence, dexterity, strength)

    return result;
}