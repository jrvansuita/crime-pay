const PlayerData = require("../db/data-access/player");
const PlayerUpdateModel = require('../model/player-update');


module.exports = class SettingsMecanics {

    constructor() {
        this.playerData = new PlayerData();
    }

    setInicialState(playerId, multiplier = 1) {
        return this.playerData.get(playerId).then((player) => {
            return this.playerData.set(playerId, PlayerUpdateModel.build(player, 15 * multiplier, 5 * multiplier, 100, 0, 25 * multiplier, 27 * multiplier, 23 * multiplier).clear());
        })
    }

    setPrisoner(playerId) {
        return this.playerData.get(playerId).then((player) => {
            return this.playerData.set(playerId, PlayerUpdateModel.build(player, 15, 5, 100, 0, 25, 25, 25).setArrested(true, 1).clear());
        })
    }


}