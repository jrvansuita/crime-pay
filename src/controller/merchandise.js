
const { Num } = require("../lib/util");
const Controller = require("./controller");
const WeaponMath = require("../math/weapon-math");

var cache = {};

module.exports = class MerchandiseController extends Controller {

    constructor() {
        super('merchandise', cache, 30);
    }

    onDetails(merchandise, player) {
        return new WeaponMath(player, merchandise).make();
    }

    onFilter(merchandises) {
        //First of all, filter the results by rarity in a lucky number
        return merchandises.filter((merchandises) => { return Num.lucky(100) >= merchandises.rarity; })
    }

    onPreview(merchandise, player) {
        return new WeaponMath(player, merchandise).preview();
    }

    onFilterAfterPreview(merchandises) {
        //Split by merchandises types
        const types = merchandises.reduce((data, e) => {
            data[e.type] = [e, ...(data?.[e.type] || [])];
            return data;
        }, {});

        //Get some options aleatory by each type
        merchandises = Object.keys(types).reduce((data, key) => {
            return [...data, ...types[key].random(Num.lucky((types[key].length / 2), 2))]
        }, [])

        return merchandises.random(8);
    }

    onFinalSort(merchandises) {
        //Sort by coins cost
        return merchandises.sort((a, b) => { return a.coins - b.coins });
    }

}






