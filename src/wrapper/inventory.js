const { Classes } = require("../enum/merchandise");
const word = require("../const/word");
const WeaponMath = require("../math/weapon-math");

module.exports = class InventoryWrapper {

    constructor(player, weapon) {
        this.player = player;
        this.weapon = weapon;
    }

    preview() {
        this.weapon.color = WeaponMath.color(this.weapon);
        this.weapon.rarityTitle = WeaponMath.rarity(this.weapon);
        this.weapon.class = Classes.SPECIAL_ITEM.includes(this.weapon.type) ? word.SPECIAL_ITEM : word.WEAPON;
        return this.weapon;
    }



}