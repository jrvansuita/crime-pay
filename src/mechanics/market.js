const MerchandiseBuy = require("../actions/market/merchandise-buy");
const WeaponBuy = require("../actions/market/weapon-buy");
const MerchandiseController = require("../controller/merchandise");
const WeaponData = require("../db/data-access/weapon");
const EventData = require('../db/data-access/event');
const Mechanics = require("./mechanics");
const phrase = require("../const/phrase");
const PlayerData = require("../db/data-access/player");


module.exports = class MarketMechanics extends Mechanics {

    constructor() {
        super();
        this.weaponData = new WeaponData();
        this.merchandiseController = new MerchandiseController();
    }

    merchandise() {
        return {
            submit: (id, player) => {
                return this.merchandiseController.details(id, player, true).then((merchandise) => {
                    const action = new MerchandiseBuy(player, merchandise).make();
                    return this.weaponData.save(action.weapon()).then(() => {
                        return super.update(player, action, EventData.marketBuy);
                    })
                })
            }
        }
    }

    weapon() {
        return {
            submit: (id, buyer) => {
                return this.weaponData.findById(id).then((weapon) => {
                    return new PlayerData().findById(weapon.playerId).then((seller) => {
                        const action = new WeaponBuy(buyer, seller, weapon);

                        const stack = [];

                        stack.push(this.weaponData.modify(id, action.getWeapon().get()));
                        stack.push(super.update(seller, action.getSeller(), EventData.marketSell));
                        stack.push(super.update(buyer, action.getBuyer(), EventData.marketBuy));

                        return Promise.all(stack).then((data) => {
                            return data.pop();
                        })
                    })
                })

            }
        }
    }


}