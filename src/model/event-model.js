const moment = require("moment");

const EventModel = class {
    constructor(type) {
        this.setType(type).setSuccess(true).setTypeItemId('');
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
        this.typeItemId = typeItemId != '0' ? typeItemId.toString() : '';
        return this;
    }

    setSuccess(success = true) {
        this.success = success;
        return this;
    }

}



const EventTypes = {
    ROB: 0,
    CLUB_HOOKER: 1,
    CLUB_DRUG: 2,
    PRISON_BRIBE: 3,
    PRISON_ESCAPE: 4,

}


module.exports = { EventModel, EventTypes };