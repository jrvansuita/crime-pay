const PlaceController = require("../../controller/place");

module.exports = class PlaceScripts {

    assertDifficulties() {

        const modify = (name, dif) => {
            new PlaceController().updateAll({ name: name }, { $set: { difficulty: dif } }).then((data) => {
                console.log(data);
            });
        }


        modify('Little Baby', 0)
        modify('Grandmother', 2.5)
        modify('Candy Machine', 5)
        modify("Street's Shop Stand", 10)
        modify("Your Boss", 12.5)
        modify("Ice Cream Truck", 15)
        modify("Credit Card Limit", 17.5)
        modify("Friend's Motorcycle", 20)
        modify("Junky Car", 23.5)
        modify("Tourist's Pockets", 26.5)
        modify("Neighborhood Store", 30)
        modify("Mountain Cabin", 34)
        modify("McDonalds", 37)
        modify("Moored Boat", 40)
        modify("Tiny House", 41.5)
        modify("Random Pickup Car", 44.5)
        modify("Uncle's House", 47.6)
        modify("Donut Store", 49.5)
        modify("Dog Shop Store", 52.2)
        modify("Farm Barn", 56.4)
        modify("Neighbor's House", 58.5)
        modify("Neighborhood Office", 60)
        modify("Cafeteria", 63.5)
        modify("Downtown House", 66.5)
        modify("Local Drug Dealer", 68.5)
        modify("Gas Station", 71.5)
        modify("Downtown Store", 73.5)
        modify("Church's Tithings", 78.5)
        modify("ATM", 80.5)
        modify("Mansion", 83.5)
        modify("Hotel", 85.5)
        modify("Jewelry Store", 88.5)
        modify("Mosque Money Reserve", 90.5)
        modify("Red Helicopter", 92.5)
        modify("Armored Bank Truck", 93.5)
        modify("Bank", 94.5)
        modify("Cassino", 95.5)
        modify("Italian Mafia", 96.5)
        modify("Police Headquarters", 98.5)
        modify("Plane Hijacking", 99.5)
        modify("Prince's Fortress", 99.7)
        modify("Museum's Ancient Relic", 99.8)
        modify("King Castle", 99.91)
        modify("Museum of Art", 99.95)
        modify("Egypt's Ancient Treasure", 99.98)
        modify("Nacional Treasure", 99.999)
    }

}