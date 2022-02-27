const PlayerController = require("../player");
const WeaponController = require("../weapon");
const constants = require('../../const/constants');


module.exports = class ThiefController extends PlayerController {

    constructor() {
        super();
        this.weaponController = new WeaponController();
    }


    get(_id) {
        return this.findById(_id)
            .then(thief => {
                if (!thief) throw new Error(constants.THIEF_NOT_FOUND);

                return this.weaponController.findByIds(thief.equipedWeapons).then(weapons => {
                    return { thief, weapons }
                });
            });
    }




}