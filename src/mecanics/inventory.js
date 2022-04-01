
const InventoryBurn = require("../actions/inventory-burn");
const InventoryEquip = require("../actions/inventory-equip");
const phrase = require("../const/phrase");
const text = require("../const/text");
const InventoryController = require("../controller/inventory");
const EventData = require("../db/data-access/event");
const WeaponData = require("../db/data-access/weapon");
const Mecanics = require("./mecanics");

module.exports = class InventoryMecanics extends Mecanics {

    constructor() {
        super()
        this.weaponData = new WeaponData();
        this.inventoryController = new InventoryController();
    }

    equip(player, id) {
        return this.weaponData.findById(id).then((weapon) => {
            return super.update(player, new InventoryEquip(player, weapon).make()).then((updatedPlayer) => {
                return { player: updatedPlayer, message: text.INVENTORY.WEAPON_EQUIPPED };
            });
        });
    }

    burn(player, id) {
        return this.weaponData.findById(id).then((weapon) => {
            if (!weapon) throw new Error(phrase.EQUIP_NOT_FOUND);

            return this.inventoryController.removeById(id).then(() => {
                return super.event(player, new InventoryBurn(player, weapon).make(), EventData.inventoryBurn);
            });
        });
    }


}

