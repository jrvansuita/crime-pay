const Controller = require("./controller");
const InventoryWrapp = require("../wrapper/inventory");


module.exports = class WeaponController extends Controller {

    constructor() {
        super('weapon');
    }

    onFindQuery(player) {
        return { playerId: player._id.toString() }
    }

    onPreview(player, weapon) {
        return new InventoryWrapp(player, weapon).preview();
    }

    // onFilter(drugs) {
    //     return drugs.filter((drug) => { return Num.lucky(100) >= drug.rarity; })
    // }

    // onPreview(player, drug) {
    //     return new DrugMath(player, drug).preview();
    // }

    // onFilterAfterPreview(drugs) {
    //     //Remove duplicate free positions when theres more than one, and get some random positions of the results
    //     return drugs
    //         .filter((each, index, arr) => {
    //             return !arr.some(e => {
    //                 return (e !== each) &&
    //                     (e.coins == each.coins) &&
    //                     (e.coins == 0)
    //             })
    //         })
    //         .random(5);
    // }

    onFinalSort(weapons) {
        //Sort by level
        return weapons.sort((a, b) => { return b.level - a.level });
    }

}






