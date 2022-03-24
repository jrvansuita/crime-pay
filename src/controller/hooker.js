const { Num } = require("../lib/util");
const Controller = require("./controller");
const HookerMath = require("../math/hooker-math");
var cache = {};

module.exports = class HookerController extends Controller {

    constructor() {
        super('hooker', cache, 3);
    }

    onDetails(player, hooker) {
        return new HookerMath(player, hooker).make()
    }

    onFilter(hookers) {
        return hookers.filter((hooker) => { return Num.lucky(100) >= hooker.rarity; })
    }

    onPreview(player, hooker) {
        return new HookerMath(player, hooker).preview();
    }

    onFilterAfterPreview(hookers) {
        //Remove duplicate free positions when theres more than one, and get some random positions of the results
        return hookers
            .filter((each, index, arr) => {
                return !arr.some(e => {
                    return (e !== each) &&
                        (e.coins == each.coins) &&
                        (e.coins == 0)
                })
            })
            .random(7);
    }

    onFinalSort(hookers) {
        //Sort by coins cost
        return hookers.sort((a, b) => { return a.coins - b.coins });
    }

}






