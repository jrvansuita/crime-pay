const Player = require("../data/player");
const RobberyPlace = require("../data/robberyPlace");



module.exports = class RobberyPage {


    load(callback) {
        const player = new Player();
        const robberyPlace = new RobberyPlace();

        player.get('620bd7d3167e2e95193329e1', (err, data) => {
            robberyPlace.findAll((err, places) => {
                callback({ places: places, ...data });
            })

        });

    }

}

