const phrase = require("../../const/phrase");
const { Classes } = require("../../enum/merchandise");
const { Util } = require("../../lib/util");
const WeaponMutation = require("../../mutation/weapon");
const DataAccess = require("./data-access");

module.exports = class WeaponData extends DataAccess {

    constructor() {
        super('weapon');
    }

    findById(id, doThrow = false) {
        return super.findById(id).then((weapon) => {
            if (doThrow && !weapon) throw new Error(phrase.EQUIP_NOT_FOUND);
            return weapon
        });
    }

    onAfterFind(data) {
        const isArray = Array.isArray(data);

        data = Util.array(data).map(w => {
            return new WeaponMutation(w);
        });

        return isArray ? data : Util.spread(data)
    }



}