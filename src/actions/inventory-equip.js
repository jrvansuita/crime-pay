const phrase = require('../const/phrase');
const PlayerUpdateModel = require('../model/player-update');
const Action = require('./action');

module.exports = class InventoryEquip extends Action {

    constructor(player, weapon) {
        super(player, weapon);
        this.weapon = weapon;
    }

    make() {
        const update = new PlayerUpdateModel(this.player)
            .validate((player) => {
                //this.check(player.isEquipped(this.weapon), phrase.WEAPON_ALREADY_EQUIPPED)
            })
            .setEquip(this.weapon, !this.player.isEquipped(this.weapon))
            .build()

        return super.make(update);
    }
}