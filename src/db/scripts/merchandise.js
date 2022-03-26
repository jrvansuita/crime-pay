const MerchandiseController = require("../../controller/merchandise");
const Script = require("./scripts");
const MerchandiseTypes = require("../../enum/merchandise-types");
const AttributesBundle = require("../../enum/attributes-bundle");

module.exports = class MerchandiseScripts extends Script {

    constructor() {
        super(new MerchandiseController());
    }

    create(name, type, coinsFactor, rarity, int, dex, str, resp, coins, succcessChance, staminaCost) {
        super.create({
            name, type, coinsFactor, rarity,
            bundle: AttributesBundle.do().primary(int, dex, str).respect(resp).coins(coins).robbery(succcessChance, staminaCost)
        });
    }

    createAll() {
        this.removeAll();

        this.create('Covid Mask', MerchandiseTypes.MASK, .001, 15, 1, 0, 0, 1);
        this.create('Wooden Disguise Mask', MerchandiseTypes.MASK, .002, 40, 1);
        this.create('Hockey Mask', MerchandiseTypes.MASK, .05, 55, 4, 0, 0, 2, 1);
        this.create('Steel Disguise Mask', MerchandiseTypes.MASK, .06, 60, 3, 0, 0, 3, 3, 1);


        this.create('Branch Tree', MerchandiseTypes.DOMESTIC, .0001, 5, 0, 0, 1);
        this.create('Broom', MerchandiseTypes.DOMESTIC, .1, 15, 0, 0, 2, -1, -5, -10);
        this.create('Hair Dryer', MerchandiseTypes.DOMESTIC, .13, 18, 0, 1, 0, 0, 3, 0);
        this.create('Razor Blade', MerchandiseTypes.DOMESTIC, .01, 40, 1, 0, 0);
        this.create('Red Scissor', MerchandiseTypes.DOMESTIC, .01, 20, 0, 2, 0, 0, 0, -5);
        this.create('Razor', MerchandiseTypes.DOMESTIC, .03, 55, 1, 3, 0);
        this.create('Shuriken', MerchandiseTypes.DOMESTIC, .09, 70, 1, 2, 1, 2);
        this.create('Wooden Sword', MerchandiseTypes.DOMESTIC, .01, 50, 0, 2, 2);
        this.create('Paintball Gun', MerchandiseTypes.DOMESTIC, .03, 65, 0, 3, 0);
        this.create('Bow & Arrow', MerchandiseTypes.DOMESTIC, .5, 35, 1, 3, 2, 2, 0, 0, -5);
        this.create('Hammer', MerchandiseTypes.DOMESTIC, .46, 40, 0, 2, 6, 1, 0, 3);
        this.create('Spiked Stick', MerchandiseTypes.DOMESTIC, .5, 55, 2, 1, 3, 0, 4, 2);

        this.create('Knife', MerchandiseTypes.BLADED, 0.7, 20, 2, 2, 0);
        this.create('Red Axe', MerchandiseTypes.BLADED, 1, 25, 0, 0, 3, 1, 1);
        this.create('Pirate Sword', MerchandiseTypes.BLADED, 1.2, 35, 0, 3, 2, 2, 2);
        this.create('Katana', MerchandiseTypes.BLADED, 1.3, 42, 5, 0, 0, 5, 0, 5);
        this.create('Double Edged Sword', MerchandiseTypes.BLADED, 1.4, 40, 0, 0, 6, 5, 0, 0, -5);

        this.create('Antique Gun', MerchandiseTypes.PISTOL, 2, 44, 6, 3, 7, 100, 0, -5);
        this.create('Taurus .22 Pistol', MerchandiseTypes.PISTOL, 2.8, 25, 7, 6, 0);
        this.create('38 Revolver', MerchandiseTypes.PISTOL, 2.9, 40, 5, 0, 7);
        this.create('Smith & Wesson 1911', MerchandiseTypes.PISTOL, 3.2, 45, 8, 0, 9);
        this.create('Glock 9MM', MerchandiseTypes.PISTOL, 3.3, 45, 8, 0, 8, 0, 0, 4);
        this.create('MAC-10 Pistol', MerchandiseTypes.PISTOL, 3.7, 50, 0, 11, 10, 0, 0, 8);
        this.create('Mini Uzi Submachine', MerchandiseTypes.PISTOL, 3.9, 55, 0, 9, 14, 6, 0, 6);

        this.create('Pump Action Shotgun', MerchandiseTypes.SHOTGUN, 4.1, 45, 10, 11, 16, 1, 0, 0, -3);
        this.create('Wooden Shotgun', MerchandiseTypes.SHOTGUN, 4.3, 55, 12, 11, 16);
        this.create('Tactical Shotgun', MerchandiseTypes.SHOTGUN, 4.6, 60, 13, 16, 16, 0, 2, 5);

        this.create('P90 Submachine', MerchandiseTypes.SUBMACHINE, 5, 50, 17, 16, 20, 3, 0, 5);
        this.create('Submachine .40', MerchandiseTypes.SUBMACHINE, 5.2, 55, 19, 20, 23, 4, 5, 3);
        this.create('Clarion 5.56mm', MerchandiseTypes.SUBMACHINE, 5.7, 60, 20, 15, 23, 0, 0, 5, -2);
        this.create('Gatling Gun', MerchandiseTypes.SUBMACHINE, 8, 80, 40, 35, 66, 100, 7, 0, -5);

        this.create('Remington .308 Rifle', MerchandiseTypes.RIFFLE, 4.8, 65, 22, 15, 21, 5, 0, 0, -2);
        this.create('Magnum Sniper Rifle', MerchandiseTypes.RIFFLE, 5.5, 55, 26, 20, 27, 10, 0, 6);
        this.create('Al Arctic Warfare Rifle', MerchandiseTypes.RIFFLE, 6.3, 69, 30, 22, 29, 12, 0, 5);
        this.create("Sig Sauer MCX", MerchandiseTypes.RIFFLE, 6.8, 60, 33, 34, 27, 10, 3, 4);
        this.create('AK-47 Assault Rifle', MerchandiseTypes.RIFFLE, 6.7, 72, 36, 35, 40, 17, 4, 6);
        this.create('Colt M4 Rifle', MerchandiseTypes.RIFFLE, 7.1, 63, 37, 39, 30, 14, 6, 7);
        this.create('Colt AR-15', MerchandiseTypes.RIFFLE, 7.5, 70, 43, 40, 38, 0, 10, 3);
        this.create("Israel's .338 Sniper Rifle", MerchandiseTypes.RIFFLE, 7.8, 91, 46, 43, 53, 19, 0, 0, -3);
        this.create('SG550 Sniper Rifle', MerchandiseTypes.RIFFLE, 7.2, 87, 47, 45, 49, 9, 2, 10);

        this.create('Scifi Plasma Gun', MerchandiseTypes.FICTITIOUS, 8.5, 95, 58, 45, 65, 50, 20, 10,);
        this.create('Ultrasonic Gun', MerchandiseTypes.FICTITIOUS, 8.9, 96, 61, 55, 43, 18, 6, 12);
        this.create('Alien Rifle', MerchandiseTypes.FICTITIOUS, 9.1, 98, 71, 70, 81, 300, 25, 20, -19);
        this.create('Alien Sniper Rifle', MerchandiseTypes.FICTITIOUS, 9.3, 99, 74, 59, 89, 500, 30, 23, -28);

        this.create("Soviet Army Bazooka", MerchandiseTypes.BOMB, 9, 94, 51, 42, 61, 90, 0, 20, -50);
        this.create('US Army Bazooka', MerchandiseTypes.BOMB, 9.2, 95, 54, 40, 59, 100, 0, 22, -55);
        this.create('War Tank', MerchandiseTypes.BOMB, 9.9, 99, 90, 0, 110, 250, 30, 15, -90);
        this.create('Dynamite', MerchandiseTypes.BOMB, 3, 80, 0, 0, 20, 8, 0, 3, -5);
        this.create('TNT Bomb', MerchandiseTypes.BOMB, 5, 85, 0, 0, 25, 15, 0, 6, -10);

        this.execute();
    }


}


