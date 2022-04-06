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

                (isEquipping && player.isEquipped(this.weapon, 'name')).throw(phrase.WEAPON_ALREADY_EQUIPPED)
                    .and(!!this.weapon.price).throw(phrase.SELLING_ITEM)

                if (isEquipping) {
                    if (this.weapon.isItem)
                        (player.getItems().length == itemsLimit).throw(phrase.EQUIP_LIMIT.format(itemsLimit, word.SPECIAL_ITEMS))

                    if (this.weapon.isWeapon)
                        (player.getWeapons().length == weaponsLimit).throw(phrase.EQUIP_LIMIT.format(weaponsLimit, word.WEAPONS))
                }
            })
            .setEquip(this.weapon, isEquipping)
            .build()

        return super.make(update);
    }
}