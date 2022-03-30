const { Classes } = require("../../enum/merchandise");
const DataAccess = require("./data-access");

module.exports = class WeaponData extends DataAccess {

    constructor() {
        super('weapon');
    }


    onAfterFind(data) {
        return Array.isArray(data).if(data, [data]).map(w => {
            w.isItem = Classes.SPECIAL_ITEM.includes(w.type);
            w.isWeapon = Classes.WEAPON.includes(w.type);

            return w;
        });
    }



}