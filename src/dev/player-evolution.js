const PlayerController = require("../controller/player");
const PlaceController = require("../controller/place");

module.exports = class PlayerEvolution {


    constructor({ all, stats, id }) {
        this.modelPlayerId = id || "6230c97f40a4ff252550104f";
        this.playerController = new PlayerController();
        this.placeController = new PlaceController();

        this.showAll = all;
        this.mStats = stats;
    }

    multiplyStats(player, multiplier) {
        player.name = multiplier + 'x';

        ['coins', 'respect', 'intelligence', 'dexterity', 'strength'].forEach(attr => {
            player[attr] = parseInt(player[attr]) * parseInt(multiplier);
        });

        return player;
    }

    make() {

        return this.playerController.get(this.modelPlayerId).then(player => {

            var data = [];
            var players = [player];

            this.mStats.split('-').forEach(m => {
                players.push(this.multiplyStats({ ...player }, m));
            });

            const getPlaces = (index) => {
                return this.placeController.for(players[index], this.showAll, true).then((places) => {
                    data.push({ player: players[index], places: places })
                    return (++index) < players.length ? getPlaces(index) : data;
                })
            }

            return getPlaces(0).then(data => { return { data: data } });
        })

    }




}