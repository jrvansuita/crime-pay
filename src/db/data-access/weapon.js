const { Classes } = require("../../enum/merchandise");
const { Util } = require("../../lib/util");
const DataAccess = require("./data-access");

module.exports = class WeaponData extends DataAccess {

    constructor() {
        super('weapon');
    }

    onAfterFind(data) {
        return Util.spread(Util.array(data).map(w => {
            if (Classes.SPECIAL_ITEM.includes(w.type)) w.isItem = true;
            if (Classes.WEAPON.includes(w.type)) w.isWeapon = true;
            return w;
        }));
    }



}