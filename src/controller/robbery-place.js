const Controller = require("./controlle");

module.exports = class RobberyPlaceController extends Controller {


    constructor() {
        super('robberyplace');
    }

    placesDetails(placeId, player) {
        return this.findById(placeId).then((place) => {
            return calculatePlaceAttributes(player, place);
        });
    }

    placesFor(player) {
        return this.all().then((places) => {
            return places.sort((a, b) => { return a.dificulty - b.dificulty })
                .map((each) => { return calculatePlaceAttributes(player, each) });
        });
    }




}


const calculatePlaceAttributes = (player, place) => {

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
    staminaCost = Math.max(5, Math.min(staminaCost, 100));
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