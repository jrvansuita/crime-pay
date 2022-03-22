const DrugController = require("../../controller/drug");
const Script = require("./scripts");

module.exports = class DrugScripts extends Script {

    constructor() {
        super(new DrugController());
    }

    create(name, coinsFactor, rarity, stamina, intoxication) {
        super.create({ name, coinsFactor, rarity, stamina, intoxication });
    }

    createAll() {
        this.removeAll();

        this.create('Baby Milk Bottle', 0, 70, 2, 0);
        this.create('Water Bottle', 0, 40, 5, 0);
        this.create('Strawberry Juice', .01, 35, 6, 0);
        this.create('Hand Sanitizer', 0, 39, 3, 2);
        this.create('Caustic Soda', .1, 45, 5, 10);
        this.create('Glass Of Beer', .3, 20, 5, 1);
        this.create('Cocktail', .8, 35, 7, 2);
        this.create('Champagne Bottle', 2.9, 40, 10, 1);
        this.create('Wine Bottle', 2.5, 40, 10, 2);
        this.create('Aspirin', .7, 55, 20, 5);
        this.create('Tabacco', 1.2, 20, 9, 2);
        this.create('Cobbler Glue', 1.2, 22, 10, 6);
        this.create('Cannabis', 1.1, 25, 15, 9);
        this.create('Morphine', 1.7, 48, 26, 8);
        this.create('Mushrooms', 3.1, 44, 26, 15);
        this.create('Mescaline', 1.6, 65, 27, 10);
        this.create('Ayahuasca', 2.4, 85, 46, 20);
        this.create('Buprenorphine', 3.5, 65, 49, 21);
        this.create('Crack', 3.2, 75, 27, 14);
        this.create('Cocaine', 5.3, 95, 65, 27);
        this.create('Weed Juice', 3.8, 80, 43, 16);
        this.create('Methadone', 6.8, 65, 67, 31);
        this.create('Methylthioamphetamine', 7.1, 55, 52, 28);
        this.create('Barbiturate', 4.7, 45, 37, 24);
        this.create('Centipede Venom', 7.7, 90, 58, 22);
        this.create('Ecstasy Pill', 6.4, 45, 38, 17);
        this.create('Ghb', 8.2, 70, 49, 19);
        this.create('Ketamine', 8.7, 75, 62, 26);
        this.create('Methamphetamine', 9.1, 85, 82, 31);
        this.create('Heroine', 7.4, 70, 75, 36);
        this.create('LSD', 8.8, 85, 78, 39);
        this.create('Blue Meth', 9.4, 80, 90, 45);
        this.create('Anaconda Venom', 3.1, 90, 83, 15);
        this.create('Love Potion', 2.6, 97, 100, 3);

        this.execute();
    }


}


