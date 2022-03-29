const InventoryBurn = require("../actions/inventory-burn");
const WeaponController = require("../controller/weapon");
const EventData = require("../db/data-access/event");
const Mecanics = require("./mecanics");

module.exports = class InventoryMecanics extends Mecanics {

    constructor() {
        super()
        this.weaponController = new WeaponController();
    }

    equip(player, id) {
        return this.weaponController.findById(id).then((weapon) => {

            console.log(weapon);

        });
    }


    burn(player, id) {
        return this.weaponController.findById(id).then((weapon) => {
            return this.weaponController.removeById(id).then(() => {
                return super.event(player, new InventoryBurn(player, weapon).make(), EventData.inventoryBurn);
            });
        });
    }


}

