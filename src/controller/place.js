
const Controller = require("./controller");
const PlayerController = require("./player");

module.exports = class PlaceController extends Controller {


    constructor() {
        super('place');
    }

    details(placeId, player) {
        return this.findById(placeId).then((place) => {
            return calculateAttributes(player, place);
        });
    }

    for(player) {
        return this.all().then((places) => {
            return places
                //Sort by difficulty asc
                .sort((a, b) => { return a.difficulty - b.difficulty })
                //Handle all calculated attributes
                .map(each => { return calculateAttributes(player, each) })
                //Remove places with zero success chances
                .filter(each => { return each.successChance > 0 })
                //Remove more than 1 places with 100% success chances
                .filter((each, index, arr) => {
                    return !arr.some(e => {
                        return (e._id != each._id)
                            && (e.successChance == each.successChance)
                            && (each.successChance == 100 ? (each.difficulty < e.difficulty) : (each.difficulty > e.difficulty))
                    })
                });
        });
    }




}


const calculateAttributes = (player, place) => {
    /* Defining Weapons Intelligence and Dexterity Multiplier Bonus */
    const multiplier = PlayerController.weaponsStatsMultiplier(player);

    /* Defining Player Attributes */
    var intelligence = player.intelligence * multiplier.intelligence;
    var dexterity = player.dexterity * multiplier.dexterity;
    var strength = player.strength;

    /* Defining Robbery Success Chance */
    var successPoints = (intelligence + dexterity + strength);
    var failPoints = place.difficulty + (player.respect * 10);

    var successChance = successPoints / failPoints;

    successChance = Math.min(Math.trunc(successChance * 100), 100);
    place.successChance = successChance;

    /* Defining Stamina Cost */
    var staminaCost = Math.trunc((100 / place.successChance) * 7.5);
    staminaCost = Math.max(5, Math.min(staminaCost, 100));
    place.staminaCost = staminaCost;

    /* Defining Coins Reward */
    var coinsReward = (((place.difficulty * .005) * (staminaCost * .01) * ((intelligence + dexterity + strength) * 0.03)) / Math.max(successChance, 1));
    var decreaseReward = ((100 + (player.intoxication * 5)) / Math.max(player.stamina, 20)) * place.difficulty;
    decreaseReward = Math.min(Math.max(decreaseReward, 1.01), 9.25);

    if (decreaseReward > 1) {
        coinsReward = coinsReward * (1 - (decreaseReward / 10));
    }

    coinsReward = Math.max(Math.trunc(coinsReward), 1);
    place.coinsReward = coinsReward;


    /* Defining Respect Increse Bonus */

    var respect = (((coinsReward / 2) * ((place.difficulty / (player.respect || 1)) * .001)) / (staminaCost * .2));
    respect = Math.max(Math.trunc(respect, 1), 1);
    place.respect = respect;


    return place;
}