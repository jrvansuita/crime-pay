const EventController = require("../controller/event");
const HistoricItem = require("../model/historic-item");

module.exports = class HistoricMecanics {

    constructor() {
        this.eventController = new EventController();
    }

    page(player, filter = {}, page = 0) {
        const query = { playerId: player._id.toString(), ...(filter || {}) };
        const sort = { date: -1 };
        const count = 100;

        return this.eventController
            .page(query, sort, page, count)
            .then((events) => {
                return events.map((event) => {
                    return new HistoricItem(event).build();
                })

            });
    }


}

