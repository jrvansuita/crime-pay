const { Num } = require("../lib/util");
const Controller = require("./controller");
const HookerMath = require("../math/hooker-math");
const Cache = require("../cache/cache");
var hookerCache = {};

module.exports = class HookerController extends Controller {

    constructor() {
        super('hooker');
        this.hookerCache = new Cache(hookerCache, 3);
    }

    details(id, player, cacheOrThrow = false) {
        return this.hookerCache.expired(cacheOrThrow, id) || this.findById(id).then((hooker) => {
            return new HookerMath(player, hooker).make()
        });
    }

    findHookers() {
        return this.hookerCache.has() ? Promise.resolve(this.hookerCache.get()) : this.all();
    }

    for(player, loadAll = false) {

        return this.findHookers().then((hookers) => {

            if (!loadAll && !this.hookerCache.has()) {
                hookers = hookers
                    //Draw positions based on rarity 
                    .filter((hooker) => { return Num.lucky(100) >= hooker.rarity; })
                    //Handle all calculated attributes
                    .map(hooker => { return new HookerMath(player, hooker).preview() })
                    //Remove duplicate free positions
                    .filter((each, index, arr) => {
                        return !arr.some(e => {
                            return (e !== each) &&
                                (e.coins == each.coins) &&
                                (e.coins == 0)
                        })
                    })
                    .random(7)

                this.hookerCache.set(hookers)
            }

            return hookers
                //Deep Copy the array, to keep primitive values stored on cache
                .deepCopy()
                //Load all attributes
                .map(hooker => { return new HookerMath(player, hooker).make() })
                //Sort by coins cost
                .sort((a, b) => { return a.coins - b.coins });
        });
    }
}






