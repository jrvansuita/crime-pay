

const HookerController = require("../controller/hooker");
const PlayerUpdateModel = require('../model/player-update-model');
const EventController = require('../controller/event');
const PlayerController = require("../controller/player");
const { EventModel } = require("../model/event-model");
const constants = require('../const/constants');
const { Num } = require("../lib/util");


module.exports = class ClubMecanics {

    constructor() {
        this.playerController = new PlayerController();
        this.hookerController = new HookerController();
    }


    submit(hookerId, player) {
        return this.hookerController.details(hookerId, player).then((hooker) => {

            var playerUpdate = buildPlayerUpdate(player, hooker);

            return this.playerController.update(player._id, playerUpdate).then((updatedPlayer) => {

                return EventController.clubHooker(player._id, playerUpdate, hookerId, playerUpdate.stamina > 0, constants.CLUB_HOOKER)
                    .then((event) => {
                        return { event: event, player: updatedPlayer }
                    })

            });
        })
    }
}

const buildPlayerUpdate = (player, hooker) => {

    var lucky = Num.lucky(100, 1);

    const failed = lucky <= hooker.failChance;
    const jailed = lucky <= hooker.jailChance;
    const succeed = !failed && !jailed;

    return new PlayerUpdateModel(player)
        .validate((player, model) => {
            model.check(player.arrested, constants.PLAYER_ARRESTED)
                .check(player.coins < hooker.coins, constants.INSUFFICIENT_COINS)
        })
        .setArrested(jailed)
        .setCoins(hooker.coins, false, 0, false, false)
        .setRespect(hooker.respect, succeed, 0, true)
        .setStamina(hooker.stamina, succeed, 0, true)
        .setIntoxication(hooker.intoxication, succeed, 0, true)
        .build()
}



