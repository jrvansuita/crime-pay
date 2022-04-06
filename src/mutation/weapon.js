const word = require("../const/word");
const { Classes } = require("../enum/merchandise");
const { Num } = require("../lib/util");

module.exports = class WeaponMutation {

    constructor(weapon) {
        Object.assign(this, weapon);

        this.attributes();
    }

    attributes() {
        this.color = this.getColor();
        this.rarityTitle = this.getRarityTitle();
        this.class = Classes.SPECIAL_ITEM.includes(this.type).if(word.SPECIAL_ITEM, word.WEAPON);

        if (Classes.SPECIAL_ITEM.includes(this.type)) this.isItem = true;
        if (Classes.WEAPON.includes(this.type)) this.isWeapon = true;
    }

    getColor() {
        const name = this.name.replaceAll(' ', this.level * this.rarity);

        const saturation = Num.assert((this.level * (this.rarity / 4)), true, 43, 60);
        const lightness = Num.assert(90 - this.rarity, true, 45, 80);

        return name.toColor(220, 1, saturation, lightness);
    }

    getRarityTitle() {
        const rarity = this.rarity;

        var title = false;
        // title = title || rarity.isBetween(0, 55, word.COMMON);
        title = title || rarity.isBetween(56, 69, word.RARE);
        title = title || rarity.isBetween(70, 94, word.EPIC);
        title = title || rarity.isBetween(95, 100, word.LEGENDARY);

        return title || '';
    }

}


