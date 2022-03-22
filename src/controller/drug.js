const { Num } = require("../lib/util");
const Controller = require("./controller");
const DrugMath = require("../math/drug-math");
const Cache = require("../cache/cache");
const phrase = require("../const/phrase");
var drugCache = {};

module.exports = class DrugController extends Controller {

    constructor() {
        super('drug');
        this.drugCache = new Cache(drugCache, 2);
    }

    details(id, player, cacheOrThrow = false) {
        return this.drugCache.expired(cacheOrThrow, id) || this.findById(id).then((drug) => {
            return new DrugMath(player, drug).make()
        });
    }

    findDrugs() {
        return this.drugCache.has() ? Promise.resolve(this.drugCache.get()) : this.all();
    }

    for(player, loadAll = false) {

        return this.findDrugs().then((drugs) => {

            if (!loadAll && !this.drugCache.has()) {
                drugs = drugs
                    //Draw positions based on rarity 
                    .filter((drug) => { return Num.lucky(100) >= drug.rarity; })
                    //Handle all calculated attributes
                    .map(drug => { return new DrugMath(player, drug).preview() })
                    //Remove duplicate free positions
                    .filter((each, index, arr) => {
                        return !arr.some(e => {
                            return (e !== each) &&
                                (e.coins == each.coins) &&
                                (e.coins == 0)
                        })
                    })
                    .random(5)

                this.drugCache.set(drugs)
            }

            return drugs
                //Deep Copy the array, to keep primitive values stored on cache
                .deepCopy()
                //Load all attributes
                .map(drug => { return new DrugMath(player, drug).make() })
                //Sort by coins cost
                .sort((a, b) => { return a.coins - b.coins });
        });
    }
}






