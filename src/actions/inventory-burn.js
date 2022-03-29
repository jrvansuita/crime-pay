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
        return super.make();
    }
}