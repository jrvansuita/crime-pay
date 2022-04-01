const EventData = require("../db/data-access/event");
const HistoricItem = require("../model/historic-item");

module.exports = class HistoricMechanics {

    constructor() {
        this.eventData = new EventData();
    }

    page(player, filter = {}, page = 0) {
        const query = { playerId: player._id.toString(), ...(filter || {}) };
        const sort = { date: -1 };
        const count = 100;

        return this.eventData
            .page(query, sort, page, count)
            .then((events) => {
                return events.map((event) => {
                    return new HistoricItem(event).build();
                })

            });
    }


}

