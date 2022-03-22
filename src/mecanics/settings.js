const PlayerController = require("../controller/player");
const PlayerUpdateModel = require('../model/player-update');


module.exports = class SettingsMecanics {

    constructor() {
        this.playerController = new PlayerController();
    }

    setInicialState(playerId, multiplier = 1) {
        return this.playerController.get(playerId).then((player) => {
            return this.playerController.set(playerId, PlayerUpdateModel.build(player, 15 * multiplier, 5 * multiplier, 100, 0, 25 * multiplier, 27 * multiplier, 23 * multiplier).get());
        })
    }

    setPrisoner(playerId) {
        return this.playerController.get(playerId).then((player) => {
            return this.playerController.set(playerId, PlayerUpdateModel.build(player, 15, 5, 100, 0, 25, 25, 25).setArrested(true, 1).get());
        })
    }


}