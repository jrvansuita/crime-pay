
const InventoryBurn = require("../actions/inventory-burn");
const InventoryEquip = require("../actions/inventory-equip");
const phrase = require("../const/phrase");
const text = require("../const/text");
const InventoryController = require("../controller/inventory");
const EventData = require("../db/data-access/event");
const Mecanics = require("./mecanics");

module.exports = class InventoryMecanics extends Mecanics {

    constructor() {
        super()
        this.inventoryController = new InventoryController();
    }

    equip(player, id) {
        return this.inventoryController.findById(id).then((weapon) => {
            return super.update(player, new InventoryEquip(player, weapon).make()).then(() => {
                return { player, message: text.INVENTORY.WEAPON_EQUIPPED.format(weapon.name) };
            });
        });
    }

    burn(player, id) {
        return this.inventoryController.findById(id).then((weapon) => {
            if (!weapon) throw new Error(phrase.EQUIP_NOT_FOUND);

            return this.inventoryController.removeById(id).then(() => {
                return super.event(player, new InventoryBurn(player, weapon).make(), EventData.inventoryBurn);
            });
        });
    }


}

