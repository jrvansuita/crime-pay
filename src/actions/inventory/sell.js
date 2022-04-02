const phrase = require('../../const/phrase');
const word = require('../../const/word');
const PlayerUpdateModel = require('../../model/player-update');
const WeaponModel = require('../../model/weapon');
const Action = require('../action');

module.exports = class InventorySell extends Action {

    constructor(player, weapon, price) {
        super(player, weapon);
        this.weapon = weapon;
        this.price = price?.toNumber() || 0;
        this.isRemoving = price === undefined;
    }

    success() {
        return !this.isRemoving;
    }

    make() {
        const weaponModel = new WeaponModel(this.player, this.weapon)
            .validate(() => {
                this.check(!this.isRemoving && !this.price, phrase.INCORRECT_PRICE_VALUE)
                    .check(this.isRemoving && !this.weapon.price, phrase.ITEM_NOT_SELLING)
                    .check(this.player.isEquipped(this.weapon), phrase.CANT_SELL_EQUIPPED)
            })
            .setPrice(this.price)
            .build();

        return super.make(weaponModel);
    }
}