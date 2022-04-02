const InventoryBurn = require("../actions/inventory/burn");
const InventoryEquip = require("../actions/inventory/equip");
const InventorySell = require("../actions/inventory/sell");
const text = require("../const/text");
const EventData = require("../db/data-access/event");
const WeaponData = require("../db/data-access/weapon");
const Mechanics = require("./mechanics");

module.exports = class InventoryMechanics extends Mechanics {

    constructor() {
        super()
        this.weaponData = new WeaponData();
    }

    equip(player, id) {
        return this.weaponData.findById(id, true).then((weapon) => {
            return super.update(player, new InventoryEquip(player, weapon).make()).then((updatedPlayer) => {
                return { player: updatedPlayer, message: text.INVENTORY.WEAPON_EQUIPPED };
            });
        });
    }

    burn(player, id) {
        return this.weaponData.findById(id, true).then((weapon) => {
            return this.weaponData.removeById(id).then(() => {
                return super.event(player, new InventoryBurn(player, weapon).make(), EventData.inventoryBurn);
            });
        });
    }

    sell(player, id, price) {
        return this.weaponData.findById(id, true).then((weapon) => {

            const action = new InventorySell(player, weapon, price).make();
            return this.weaponData.modify(id, action.get()).then(() => {
                return this.event(player, action, EventData.inventorySell)
            });
        });
    }


}

