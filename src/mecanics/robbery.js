const constants = require('../const/constants');


const PlaceController = require("../controller/place");
const PlayerUpdateModel = require('../model/player-update-model');
const PlayerController = require('../controller/player');
const EventController = require('../controller/event');
const { Num } = require('../lib/util');


module.exports = class RobberyMecanics {

    constructor() {
        this.playerController = new PlayerController();
        this.placeController = new PlaceController();
        this.eventController = new EventController();
    }

    submit(placeId, player) {
        return this.placeController.details(placeId, player).then((place) => {

            var playerUpdate = buildPlayerUpdate(player, place);

            return this.playerController.update(player._id, playerUpdate).then((updatedPlayer) => {

                return EventController.robbery(player._id, playerUpdate, placeId, !playerUpdate.arrested, constants.ROBBERY).then((event) => {

                    return { event, player: updatedPlayer }
                })
            })
        })
    }
}


const buildPlayerUpdate = (player, place) => {

    const success = Num.lucky(100) <= place.successChance;
    const difficult = Math.max(1, 100 - place.successChance);

    const multiplier = PlayerController.weaponsStatsMultiplier(player);

    /* Defining New Player Attributes */
    const intelligence = ((player.intelligence * .05) * (multiplier.intelligence * .25)) + (difficult * .1);
    const dexterity = (((player.dexterity * .05) * (multiplier.dexterity * .25)) + (difficult * .1));
    const strength = (intelligence + dexterity) / 2;

    const coins = success ? place.coinsReward : ((intelligence / player.intelligence) * player.coins);

    return new PlayerUpdateModel(player).validate((player, model) => {
        model.check(player.arrested, constants.PLAYER_ARRESTED)
            .check(player.stamina < place.staminaCost, constants.OUT_OF_STAMINA);
    })
        .setArrested(!success)
        .setCoins(coins, success)
        .setRespect(place.respect, success)
        .setStamina(place.staminaCost, false)
        .setIntelligence(intelligence, success)
        .setDexterity(dexterity, success)
        .setStrength(strength, success)
        .build()
}

