const HookerController = require("../controller/hooker");
const EventController = require('../controller/event');
const PlayerController = require("../controller/player");
const Phrase = require('../const/phrase');
const ClubAttempt = require("../actions/club-attempt");
const DrugController = require("../controller/drug");
const { EventTypes } = require("../model/event");


module.exports = class ClubMecanics {

    constructor() {
        this.playerController = new PlayerController();
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

            return this.playerController.update(player._id, playerUpdate).then((updatedPlayer) => {

                return EventController.save(this.getEventType(type), player._id, playerUpdate, id, playerUpdate.stamina > 0, this.getEventMessage(type))
                    .then((event) => { return { event: event, player: updatedPlayer } })
            });
        })
    }
}
