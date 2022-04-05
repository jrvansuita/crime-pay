const Controller = require("./controller");
const InventoryWrapper = require("../wrapper/inventory");


module.exports = class InventoryController extends Controller {

    constructor() {
        super('weapon');
    }

    onFindQuery(player) {
        return { playerId: player._id.toString() }
    }

    onPreview(weapon, player) {
        return new InventoryWrapper(player, weapon).preview();
    }

    onFinalSort(weapons) {
        //Sort by level
        return weapons.sort((a, b) => { return (b.level + b.rarity) - (a.level + a.rarity) });
    }

}






