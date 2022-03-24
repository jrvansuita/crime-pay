const moment = require("moment");

const EventModel = class {
    constructor(type) {
        this.setType(type).setSuccess(true);
        this.date = moment().toDate();
    }

    //See EventType
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




module.exports = EventModel;