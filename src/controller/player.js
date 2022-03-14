
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

    //Remover o usar o method abaixo
    oldreleasePrisonAttempt(player, releaseAttempt) {
        const inc = ['coins', 'respect', 'stamina'].reduce((a, e) => (a[e] = releaseAttempt[e], a), {});
        const set = { arrested: !releaseAttempt.success, arrestRelease: releaseAttempt.success ? null : releaseAttempt.arrestRelease };


        return this.modify(player._id, { $inc: inc, $set: set });
    }

    //New Method
    update(playerId, updateModel) {
        const inc = ['coins', 'respect', 'stamina', 'intoxication', 'intelligence', 'dexterity', 'strength'].reduce((a, e) => (a[e] = updateModel[e], a), {});
        const set = ['arrested', 'arrestRelease'].reduce((a, e) => (a[e] = updateModel[e], a), {});

        return this.modify(playerId, { $inc: inc, $set: set });
    }


}

