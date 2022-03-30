const phrase = require('../const/phrase');
const { Num } = require('../lib/util');
const Action = require('./action');

module.exports = class InventoryBurn extends Action {

    constructor(player, weapon) {
        super(player, weapon);
    }

    success() {
        return false;
    }

    make() {
        this.check(this.player.equip.includes(this.getElementId()), phrase.CANT_BURN_EQUIPPED);

        return super.make();
    }
}