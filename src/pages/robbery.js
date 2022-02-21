const Player = require("../data/player");
const RobberyPlace = require("../data/robberyPlace");



module.exports = class RobberyPage {


    load(callback) {
        const player = new Player();
        const robberyPlace = new RobberyPlace();

        player.get('620bd7d3167e2e95193329e1', (err, player) => {
            robberyPlace.findAll((err, places) => {


                places = this.calculateAttributes(player, places);

                callback({ places: places, player: player });
            })

        });

    }





    calculateAttributes(player, places) {
        places.forEach(place => {
            console.log(place);

            var intelligenceMultiplier = player.weapons.reduce((p, c) => p + c.intelligence, 0)
            var dexterityMultiplier = player.weapons.reduce((p, c) => p + c.dexterity, 0)

            var intelligence = player.intelligence * intelligenceMultiplier;
            var dexterity = player.dexterity * dexterityMultiplier;
            var strength = player.strength;

            var calc = (intelligence + dexterity + strength) / place.dificulty;
            var successChance = Math.trunc(calc * 100);
            place.chance = successChance;

            console.log(successChance);
        });

        console.log(player);

        return places;
    }

}

