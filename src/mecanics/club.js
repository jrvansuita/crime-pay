const HookerController = require("../controller/hooker");
const EventData = require('../db/data-access/event');
const ClubAttempt = require("../actions/club-attempt");
const DrugController = require("../controller/drug");
const Mecanics = require("./mecanics");

module.exports = class ClubMecanics extends Mecanics {

    constructor() {
        super();
        this.hookerController = new HookerController();
        this.drugController = new DrugController();
    }

    findClubItemController(type) {
        return type == 'hooker' ? this.hookerController : this.drugController;
    }

    getEventBuilder(type) {
        return type == 'hooker' ? EventData.clubHooker : EventData.clubDrug;
    }

    submit(id, type, player) {
        return this.findClubItemController(type).details(id, player, true).then((data) => {

            const action = new ClubAttempt(player, data).make();

            return super.update(player, action, this.getEventBuilder(type));
        })
    }
}
