const { Classes } = require("../../enum/merchandise");
const { Util } = require("../../lib/util");
const DataAccess = require("./data-access");

module.exports = class WeaponData extends DataAccess {

    constructor() {
        super('weapon');
    }


    onAfterFind(data) {
        return Util.array(data).map(w => {
            w.isItem = Classes.SPECIAL_ITEM.includes(w.type);
            w.isWeapon = Classes.WEAPON.includes(w.type);

            if (!w.isItem) delete w.isItem;
            if (!w.isWeapon) delete w.isWeapon;

            return w;
        });
    }



}