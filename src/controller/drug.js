const { Num } = require("../lib/util");
const Controller = require("./controller");
const DrugMath = require("../math/drug-math");

var cache = {};

module.exports = class DrugController extends Controller {

    constructor() {
        super('drug', cache, 2);
    }

    onDetails(player, drug) {
        return new DrugMath(player, drug).make()
    }

    onFilter(drugs) {
        return drugs.filter((drug) => { return Num.lucky(100) >= drug.rarity; })
    }

    onPreview(player, drug) {
        return new DrugMath(player, drug).preview();
    }

    onFilterAfterPreview(drugs) {
        //Remove duplicate free positions when theres more than one, and get some random positions of the results
        return drugs
            .filter((each, index, arr) => {
                return !arr.some(e => {
                    return (e !== each) &&
                        (e.coins == each.coins) &&
                        (e.coins == 0)
                })
            })
            .random(5);
    }

    onFinalSort(drugs) {
        //Sort by coins cost
        return drugs.sort((a, b) => { return a.coins - b.coins });
    }

}






