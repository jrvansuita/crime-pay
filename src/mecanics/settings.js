const PlayerController = require("../controller/player");
const moment = require("moment");
const PlayerUpdateModel = require('../model/player-update-model');


module.exports = class SettingsMecanics {

    constructor() {
        this.playerController = new PlayerController();
    }

    setInicialState(playerId) {
        return this.playerController.get(playerId).then((player) => {
            return this.playerController.set(playerId, PlayerUpdateModel.build(player, 15, 5, 100, 0, 25, 25, 25).get());
        })
    }

    setPrisoner(playerId) {
        return this.playerController.get(playerId).then((player) => {
            return this.playerController.set(playerId, PlayerUpdateModel.build(player, 15, 5, 100, 0, 25, 25, 25).setArrested(true, 1).get());
        })
    }

    setGoodRespectPlayer(playerId) {
        return this.playerController.get(playerId).then((player) => {
            return this.playerController.set(playerId, PlayerUpdateModel.build(player, 1500, 900, 100, 0, 2240, 2170, 1850).get());
        })
    }
}