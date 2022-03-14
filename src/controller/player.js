
const Controller = require("./controller");
const WeaponController = require("./weapon");
const { PLAYER_NOT_FOUND } = require('../const/constants');


module.exports = class PlayerController extends Controller {

    constructor() {
        super('player');
        this.weaponController = new WeaponController();
    }

    get(_id) {
        return this.findById(_id)
            .then(player => {
                if (!player) throw new Error(PLAYER_NOT_FOUND);

                return this.weaponController.findByIds(player.equipedWeapons).then(weapons => {
                    player.weapons = weapons;
                    return player;
                });
            });
    }

    static weaponsStatsMultiplier(player) {
        /* Defining Weapons Intelligence and Dexterity Multiplier Bonus */
        var intelligenceMultiplier = player.weapons.reduce((p, c) => p + c.intelligence, 0)
        var dexterityMultiplier = player.weapons.reduce((p, c) => p + c.dexterity, 0)

        return { intelligence: intelligenceMultiplier, dexterity: dexterityMultiplier };
    }

    restoreStamina(points) {
        return super.updateAll({ stamina: { $lt: 100 } }, { $inc: { stamina: points } }, true)
    }

    clearIntoxication(points) {
        return super.updateAll({ intoxication: { $gte: 1 } }, { $dec: { intoxication: points } }, true)
    }

    releasePrisoners() {
        return super.updateAll({ arrestRelease: { $lte: new Date() } }, { $set: { arrested: false, arrestRelease: null } }, true)
    }

    update(playerId, model) {
        const data = getDataFromModel(model);
        return super.modify(playerId, { $inc: data.inc, $set: data.set });
    }

    set(playerId, model) {
        const data = getDataFromModel(model);
        return super.modify(playerId, { $set: { ...data.set, ...data.inc } });
    }




}



const getDataFromModel = (model) => {
    const data = {};

    data.inc = ['coins', 'respect', 'stamina', 'intoxication', 'intelligence', 'dexterity', 'strength'].reduce((a, e) => (a[e] = model[e], a), {});
    data.set = ['arrested', 'arrestRelease'].reduce((a, e) => (a[e] = model[e], a), {});

    return data;
}