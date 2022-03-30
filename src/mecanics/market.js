const MarketDeal = require("../actions/market-buy");
const MerchandiseController = require("../controller/merchandise");
const WeaponData = require("../db/data-access/weapon");
const EventData = require('../db/data-access/event');
const Mecanics = require("./mecanics");


module.exports = class MarketMecanics extends Mecanics {

    constructor() {
        super();
        this.weaponData = new WeaponData();
        this.merchandiseController = new MerchandiseController();
    }

    submit(id, player) {
        return this.merchandiseController.details(id, player, true).then((merchandise) => {

            const action = new MarketDeal(player, merchandise).make();
            return this.weaponData.save(action.weapon()).then(() => {

                return super.update(player, action, EventData.marketDeal);
            })
        })
    }

}