const moment = require("moment");
const { Util } = require("../lib/util");

module.exports = class EventModel {

    constructor(type) {
        this.setType(type).setSuccess(true);
        this.date = moment().toDate();
    }

    //See EventType
    setType(type) {
        this.type = type;
        return this;
    }

    setIds(playerId, typeItemId = null) {
        return this.setPlayerId(playerId).setTypeItemId(typeItemId);
    }

    setPlayerId(playerId) {
        this.playerId = playerId.toString();
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    setTypeItemId(typeItemId) {
        if (typeItemId && (typeItemId != '0')) this.typeItemId = typeItemId.toString();
        return this;
    }

    setSuccess(success = undefined) {
        if (success !== undefined) this.success = success
        return this;
    }

    assert() {
        Util.neat(this.data);
        Util.neat(this);

        return this;
    }

}
