const Controller = require("./controller");
const { Num } = require("../lib/util");
const HookerMath = require("../math/hooker-math");

module.exports = class HookerController extends Controller {

    constructor() {
        super('hooker');
    }

    details(hookerId, player) {
        return this.findById(hookerId).then((hooker) => {
            return new HookerMath(player, hooker).make()
        });
    }

    for(player, loadAll = false) {

        return this.all().then((hookers) => {

            if (!loadAll) {
                hookers = hookers
                    //Draw positions based on rarity 
                    .filter((hooker) => { return Num.lucky(100) >= hooker.rarity; })
                    //Handle all calculated attributes
                    .map(hooker => { return new HookerMath(player, hooker).preview() })
                    //Remove duplicate free positions
                    .filter((each, index, arr) => {
                        return !arr.some(e => {
                            return (e._id != each._id) &&
                                (e.coins == each.coins) &&
                                (e.coins == 0)
                        })
                    })
                    //Shuffle the array
                    .sort(() => Math.random() - 0.5)
                    //Get only firsts positions
                    .slice(0, 7)
            }

            return hookers
                //Load all attributes
                .map(hooker => { return new HookerMath(player, hooker).make() })
                //Sort by coins cost
                .sort((a, b) => { return a.coins - b.coins });
        });
    }
}






