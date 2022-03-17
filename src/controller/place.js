
const RobberyMath = require("../math/robbery-math");
const Controller = require("./controller");


module.exports = class PlaceController extends Controller {


    constructor() {
        super('place');
    }

    details(placeId, player) {
        return this.findById(placeId).then((place) => {
            return new RobberyMath(player, place).make();
        });
    }

    for(player, loadAll = false, analytcs = false) {
        return this.all().then((places) => {
            places = places
                //Sort by difficulty asc
                .sort((a, b) => { return a.difficulty - b.difficulty })

            if (!loadAll) {
                places = places
                    //Calculate the success chance for each place
                    .map(each => { return new RobberyMath(player, each).preview() })
                    //Remove places with zero success chances
                    .filter(each => { return each.successChance > 0 })
                    //Remove more than 1 places with 100% success chances
                    .filter((each, index, arr) => {
                        return !arr.some(e => {
                            return (e._id != each._id)
                                && (e.successChance == each.successChance)
                                && (each.successChance == 100 ? (each.difficulty < e.difficulty) : (each.difficulty > e.difficulty))
                        })
                    })
                    .slice(0, 7)
            }

            return places.map(each => { return new RobberyMath(player, each)[analytcs ? 'analytcs' : 'make']() });
        });
    }
}

