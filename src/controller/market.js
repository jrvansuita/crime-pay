const { Num } = require("../lib/util");
const Controller = require("./controller");
const InventoryWrapper = require("../wrapper/inventory");

var cache = {};

module.exports = class MarketController extends Controller {

    constructor() {
        super('weapon', cache, 30);
    }

    onFindQuery() {
        return { price: { $gt: 0 } };
    }

    onDetails(player, item) {
        item.coins = item.price;
        return item;
    }

    onPreview(player, weapon) {
        return new InventoryWrapper(player, weapon).preview();
    }

    onFinalSort(merchandises) {
        //Sort by coins cost
        return merchandises.sort((a, b) => { return a.coins - b.coins });
    }

}






