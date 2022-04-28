const WeaponData = require("./weapon");
const { PLAYER_NOT_FOUND } = require("../../const/phrase");
const DataAccess = require("./data-access");
const { Util } = require("../../lib/util");
const PlayerMutation = require("../../mutation/player");


module.exports = class PlayerData extends DataAccess {

    constructor() {

        super('player');
        this.weaponData = new WeaponData();
    }

    onAfterFind(player) {
        if (!player || (player.length == 0)) return null;

        if (player?.equip) {
            return this.weaponData.findByIds(player.equip).then((weapons) => {
                player.equipments = Util.array(weapons);

                return new PlayerMutation(player);
            })
        }

        return new PlayerMutation(player);
    }

    restoreStamina(points) {
        return super.updateAll({ stamina: { $lt: 100 } }, { $inc: { stamina: points } }, true)
    }

    clearIntoxication(points) {
        return super.updateAll({ intoxication: { $gte: 1 } }, { $inc: { intoxication: -points } }, true)
    }

    releasePrisoners() {
        return super.updateAll({ arrestRelease: { $lte: new Date() } }, { $set: { arrested: false, arrestRelease: null } }, true)
    }

    update(playerId, model) {
        return super.modify(playerId, new ModelHandler(model).forUpdate())
            .then(player => { return this.onAfterFind(player) });
    }

    set(playerId, model) {
        return super.modify(playerId, new ModelHandler(model).forSet());
    }

}


class ModelHandler {
    constructor(model) {
        this.model = model;

    }

    handle(attrs) {
        return attrs.reduce((a, e) => (a[e] = this.model[e], a), {});
    }

    setAlways() {
        return this.handle(['arrested', 'arrestRelease']);
    }

    setIncs() {
        return this.handle(['coins', 'respect', 'stamina', 'intoxication', 'intelligence', 'dexterity', 'strength']);
    }

    setWhenHasValues() {
        return this.handle(['equip']);
    }

    forUpdate() {
        return {
            $inc: Util.neat(this.setIncs()), $set: { ...this.setAlways(), ...Util.neat(this.setWhenHasValues()) }
        };
    }

    forSet() {
        return { $set: { ...this.setIncs(), ...this.setAlways() } };
    }

}
