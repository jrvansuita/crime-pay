const HookerController = require("../controller/hooker");
const EventController = require('../controller/event');
const PlayerController = require("../controller/player");
const Phrase = require('../const/phrase');
const HookerAttempt = require("../actions/hooker-attempt");


module.exports = class ClubMecanics {

    constructor() {
        this.playerController = new PlayerController();
        this.hookerController = new HookerController();
    }

    submit(hookerId, player) {
        return this.hookerController.details(hookerId, player).then((hooker) => {

            var playerUpdate = new HookerAttempt(player, hooker).make();

            return this.playerController.update(player._id, playerUpdate).then((updatedPlayer) => {

                return EventController.clubHooker(player._id, playerUpdate, hookerId, playerUpdate.stamina > 0, Phrase.CLUB_HOOKER)
                    .then((event) => {
                        return { event: event, player: updatedPlayer }
                    })

            });
        })
    }
}
