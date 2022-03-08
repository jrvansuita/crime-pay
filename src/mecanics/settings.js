
const ThiefController = require("../controller/complex/thief");
const PlayerController = require("../controller/player");



module.exports = class SettingsMecanics {

    constructor() {
        this.playerController = new PlayerController();
    }

    reset(playerId) {
        return this.playerController.modify(playerId, {
            $set: {
                intelligence: 25,
                dexterity: 25,
                strength: 25,
                coins: 15,
                respect: 1,
                stamina: 100,
                intoxication: 0
            }
        });
    }
}