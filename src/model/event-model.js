const moment = require("moment");

const EventModel = class {
    constructor(type) {
        this.setType(type).setSuccess(true);
        this.date = moment().toDate();
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setPlayerId(playerId) {
        this.playerId = playerId.toString();
        return this;
    }

    setPlayerUpdate(playerUpdate) {
        this.playerUpdate = playerUpdate;
        return this;
    }

    setTypeItemId(typeItemId) {
        if (typeItemId && (typeItemId != '0')) this.typeItemId = typeItemId.toString();
        return this;
    }

    setSuccess(success = true) {
        this.success = success;
        return this;
    }
}



const EventTypes = {
    ROB: 1,
    CLUB_HOOKER: 2,
    CLUB_DRUG: 3,
    PRISON_BRIBE: 4,
    PRISON_ESCAPE: 5,

}


module.exports = { EventModel, EventTypes };