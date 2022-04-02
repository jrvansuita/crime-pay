const phrase = require('../../const/phrase');
const word = require('../../const/word');
const PlayerUpdateModel = require('../../model/player-update');
const Action = require('../action');

module.exports = class InventoryEquip extends Action {

    constructor(player, weapon) {
        super(player, weapon);
        this.weapon = weapon;
    }

    make() {
        const isEquipping = !this.player.isEquipped(this.weapon);

        const update = new PlayerUpdateModel(this.player)
            .validate((player) => {
                const itemsLimit = 3;
                const weaponsLimit = 2;

                this.check(isEquipping && player.isEquipped(this.weapon, 'name'), phrase.WEAPON_ALREADY_EQUIPPED)
                    .check(this.weapon.price, phrase.SELLING_ITEM)

                if (isEquipping) {
                    if (this.weapon.isItem)
                        this.check(player.getItems().length == itemsLimit, phrase.EQUIP_LIMIT.format(itemsLimit, word.SPECIAL_ITEMS))

                    if (this.weapon.isWeapon)
                        this.check(player.getWeapons().length == weaponsLimit, phrase.EQUIP_LIMIT.format(weaponsLimit, word.WEAPONS))
                }
            })
            .setEquip(this.weapon, isEquipping)
            .build()

        return super.make(update);
    }
}