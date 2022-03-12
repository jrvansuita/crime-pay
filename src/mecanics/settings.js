const PlayerController = require("../controller/player");
const moment = require("moment");


module.exports = class SettingsMecanics {

    constructor() {
        this.playerController = new PlayerController();
    }

    reset(playerId, extra) {

        return this.playerController.modify(playerId, {
            $set: {
                intelligence: 25,
                dexterity: 25,
                strength: 25,
                coins: 15,
                respect: 1,
                stamina: 100,
                intoxication: 0,
                arrested: false,
                arrestRelease: null,
                ...extra,
            }
        });
    }

    prisoner(playerId) {
        return this.reset(playerId, { arrested: true, arrestRelease: moment(new Date()).add(1, 'days').minutes(0).toDate() });
    }
}