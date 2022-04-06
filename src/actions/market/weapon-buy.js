const phrase = require('../../const/phrase');
const PlayerUpdateModel = require('../../model/player-update');
const WeaponModel = require('../../model/weapon');
const Action = require('../action');

module.exports = class WeaponBuy {

    constructor(buyer, seller, weapon) {
        this.weapon = weapon;
        this.buyer = buyer;
        this.seller = seller;
    }

    getWeapon() {
        const update = new WeaponModel(this.buyer, this.weapon)
            .validate((player) => {
                player.isArrested().throw(phrase.PLAYER_ARRESTED)
                    .and(player.coins < Math.abs(this.weapon.price)).throw(phrase.INSUFFICIENT_COINS)
                    .and(this.weapon.playerId?.length < 20).throw(phrase.ITEM_NOT_SELLING)
                    .and(player._id.toString() === this.weapon.playerId).throw(phrase.ITEM_NOT_SELLING)
            })
            .setAsNewOwner()
            .build();

        return new Action(this.buyer, this.weapon).setUpdate(update);
    }


    getBuyer() {
        const update = new PlayerUpdateModel(this.buyer)
            .setCoins(this.weapon.price, false)
            .build()

        return new WeaponBuyPlayerAction(this.buyer, this.weapon).setUpdate(update);
    }

    getSeller() {
        const update = new PlayerUpdateModel(this.seller)
            .setCoins(this.weapon.price, true)
            .build()

        return new WeaponBuyPlayerAction(this.seller, this.weapon).setUpdate(update);
    }
}


class WeaponBuyPlayerAction extends Action {
    constructor(player, weapon) {
        super(player, weapon)
    }

    getExtraEventData() {
        return {
            level: this.actionElement.level,
            rarity: this.actionElement.rarityTitle,
            class: this.actionElement.class,
        };
    }

    success() {
        return true;
    }

}