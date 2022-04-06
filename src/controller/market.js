const WeaponMutation = require("../mutation/weapon");
const Controller = require("./controller");

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
        return new WeaponMutation(item);
    }


    onFinalSort(merchandises) {
        //Sort by coins cost
        return merchandises.sort((a, b) => { return a.coins - b.coins });
    }

}






