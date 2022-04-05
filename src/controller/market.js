const { Num } = require("../lib/util");
const mongo = require('mongojs');
const Controller = require("./controller");
const InventoryWrapper = require("../wrapper/inventory");
const PlayerMutation = require("../mutation/player");

module.exports = class MarketController extends Controller {

    constructor() {
        super('weapon');
    }

    onFindQuery(player) {
        return { price: { $gt: 0 }, level: player.getLevel(), playerId: { $ne: player._id.toString() } };
    }

    onBeginSort(items, player) {
        return items.random(5);
    }

    onDetails(item, player) {
        item.coins = item.price;
        return item;
    }

    onPreview(item, player) {
        return new InventoryWrapper(player, item).preview();
    }


    onFinalSort(merchandises) {
        //Sort by coins cost
        return merchandises.sort((a, b) => { return a.coins - b.coins });
    }

}






