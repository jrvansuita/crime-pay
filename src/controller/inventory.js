const WeaponMutation = require("../mutation/weapon");
const Controller = require("./controller");

module.exports = class InventoryController extends Controller {

    constructor() {
        super('weapon');
    }

    onFindQuery(player) {
        return { playerId: player._id.toString() }
    }


    onPreview(item, player) {
        return new WeaponMutation(item);
    }

    onFinalSort(weapons) {
        //Sort by level
        return weapons.sort((a, b) => { return (b.level + b.rarity) - (a.level + a.rarity) });
    }

}






