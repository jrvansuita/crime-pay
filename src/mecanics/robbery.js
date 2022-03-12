const constants = require('../const/constants');
const ThiefController = require("../controller/complex/thief");
const RobberyPlaceController = require("../controller/robbery-place");
const RobberyResultController = require("../controller/robbery-result");
const RobberyResult = require("../model/robbery-result");
const Num = require('../lib/num');


module.exports = class RobberyMecanics {

    constructor() {
        this.thiefController = new ThiefController();
        this.robberyPlaceController = new RobberyPlaceController();
        this.robberyResultController = new RobberyResultController();
    }

    submit(placeId, thief) {
        return this.robberyPlaceController.placesDetails(placeId, thief).then((place) => {

            var result = new RobberyMecanicsHandler(thief, place).run();

            return this.thiefController.updateFromRobbery(thief, result).then((updatedThief) => {
                return this.robberyResultController.save(result).then((resultData) => {
                    return { result: RobberyResult.parse(resultData), thief: updatedThief }
                })
            })
        })
    }
}



class RobberyMecanicsHandler {
    constructor(player, place) {
        this.player = player;
        this.place = place;
    }

    validations() {
        if (this.player.arrested) {
            throw new Error(constants.THIEF_ARRESTED);
        }

        if (this.player.stamina < this.place.staminaCost)
            throw new Error(constants.OUT_OF_STAMINA);


        return this;
    }

    execute() {
        const luckyNumber = Math.floor(Math.random() * 100);
        const success = luckyNumber <= this.place.successChance;
        const difficult = Math.max(1, 100 - this.place.successChance);

        /* Defining Weapons Intelligence and Dexterity Multiplier Bonus */
        var intelligenceMultiplier = this.player.weapons.reduce((p, c) => p + c.intelligence, 0)
        var dexterityMultiplier = this.player.weapons.reduce((p, c) => p + c.dexterity, 0)

        /* Defining New Player Attributes */
        var intelligence = Math.max(1, (Math.trunc(((this.player.intelligence * .05) * (intelligenceMultiplier * .25)) + (difficult * .1))));
        var dexterity = Math.max(1, Math.trunc((((this.player.dexterity * .05) * (dexterityMultiplier * .25)) + (difficult * .1))));

        var strength = Math.trunc(((intelligence + dexterity) / 2));

        return new RobberyResult(success).setThiefAndPlace(this.player, this.place)
            .setAttributes(intelligence, dexterity, strength)
            .createCoins().createRespect().createStamina().build();
    }

    run() {
        return this.validations().execute();
    }

}

