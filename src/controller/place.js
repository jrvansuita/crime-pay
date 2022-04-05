
const RobberyMath = require("../math/robbery-math");
const Controller = require("./controller");


module.exports = class PlaceController extends Controller {

    constructor() {
        super('place');
    }

    onDetails(place, player) {
        return new RobberyMath(player, place).make();
    }

    onPreview(place, player) {
        return new RobberyMath(player, place).preview();
    }

    onBeginSort(places) {
        //Sort by difficulty asc
        return places.sort((a, b) => { return a.difficulty - b.difficulty })
    }

    onFilterAfterPreview(places) {
        //Remove places with 0 success chance
        //Remove more than 1 places with 100% success chances
        return places
            .filter(each => { return each.successChance > 0 })
            .filter((each, index, arr) => {
                return !arr.some(e => {
                    return (e !== each)
                        && (e.successChance == each.successChance)
                        && (each.successChance == 100 ? (each.difficulty < e.difficulty) : (each.difficulty > e.difficulty))
                })
            })
            .slice(0, 7);
    }
}

