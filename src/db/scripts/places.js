const PlaceController = require("../../controller/place");
const Script = require("./scripts");

module.exports = class PlaceScripts extends Script {

    constructor() {
        super(new PlaceController());
    }

    create(name, difficulty) {
        super.create({ name, difficulty });
    }

    createAll() {
        this.removeAll();

        this.create("Little Baby", 0);
        this.create("Grandmother", 2.5);
        this.create("Candy Machine", 5);
        this.create("Street's Shop Stand", 10);
        this.create("Your Boss", 12.5);
        this.create("Ice Cream Truck", 15);
        this.create("Credit Card Limit", 17.5);
        this.create("Friend's Motorcycle", 20);
        this.create("Junky Car", 23.5);
        this.create("Tourist's Pockets", 26.5);
        this.create("Neighborhood Store", 30);
        this.create("Mountain Cabin", 34);
        this.create("McDonald's", 37);
        this.create("Moored Boat", 40);
        this.create("Tiny House", 41.5);
        this.create("Random Pickup Car", 44.5);
        this.create("Uncle's House", 47.6);
        this.create("Donut Store", 49.5);
        this.create("Dog Shop Store", 52.2);
        this.create("Farm Barn", 56.4);
        this.create("Neighbor's House", 58.5);
        this.create("Neighborhood Office", 60);
        this.create("Cafeteria", 63.5);
        this.create("Downtown House", 66.5);
        this.create("Local Drug Dealer", 68.5);
        this.create("Gas Station", 71.5);
        this.create("Downtown Store", 73.5);
        this.create("Church's Tithings", 78.5);
        this.create("ATM", 80.5);
        this.create("Mansion", 83.5);
        this.create("Hotel", 85.5);
        this.create("Jewelry Store", 88.5);
        this.create("Mosque Money Reserve", 90.5);
        this.create("Red Helicopter", 92.5);
        this.create("Armored Bank Truck", 93.5);
        this.create("Bank", 94.5);
        this.create("Cassino", 95.5);
        this.create("Italian Mafia", 96.5);
        this.create("Police Headquarters", 98.5);
        this.create("Plane Hijacking", 99.5);
        this.create("Prince's Fortress", 99.7);
        this.create("Museum's Ancient Relic", 99.8);
        this.create("King Castle", 99.91);
        this.create("Museum of Art", 99.95);
        this.create("Egypt's Ancient Treasure", 99.98);
        this.create("National Treasure", 99.999);

        this.execute();
    }

    set(name, difficulty) {
        super.set({ name: name }, { difficulty: difficulty });
    }

}