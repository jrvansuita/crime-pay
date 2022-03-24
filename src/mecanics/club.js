const HookerController = require("../controller/hooker");
const EventData = require('../db/data-access/event');
const PlayerData = require("../db/data-access/player");
const Phrase = require('../const/phrase');
const ClubAttempt = require("../actions/club-attempt");
const DrugController = require("../controller/drug");
const EventTypes = require('../enum/event-types');


module.exports = class ClubMecanics {

    constructor() {
        this.playerData = new PlayerData();
        this.hookerController = new HookerController();
        this.drugController = new DrugController();
    }

    findClubItemController(type) {
        return type == 'hooker' ? this.hookerController : this.drugController;
    }

    getEventType(type) {
        return type == 'hooker' ? EventTypes.CLUB_HOOKER : EventTypes.CLUB_DRUG;
    }

    getEventMessage(type) {
        return type == 'hooker' ? Phrase.CLUB_HOOKER : Phrase.CLUB_DRUG;
    }

    submit(id, type, player) {
        return this.findClubItemController(type).details(id, player, true).then((data) => {

            var playerUpdate = new ClubAttempt(player, data).make();

            return this.playerData.update(player._id, playerUpdate).then((updatedPlayer) => {

                return EventData.save(this.getEventType(type), player._id, playerUpdate, id, playerUpdate.stamina > 0, this.getEventMessage(type))
                    .then((event) => { return { event: event, player: updatedPlayer } })
            });
        })
    }
}
