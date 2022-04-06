const phrase = require('../../const/phrase');
const PlayerUpdateModel = require('../../model/player-update');
const { Num } = require('../../lib/util');
const Action = require('../action');

module.exports = class RobberyAttempt extends Action {

    constructor(player, place) {
        super(player, place);
        this.place = place;
    }

    make(fullStamina) {
        const success = Num.lucky(100) <= this.place.successChance;

        const theftsCount = fullStamina ? Math.trunc(this.player.stamina / this.place.staminaCost) : 1;

        const update = new PlayerUpdateModel(this.player)
            .setSuccessMultiplier(theftsCount)
            .validate((player) => {
                console.log(player);
                player.isArrested().throw(phrase.PLAYER_ARRESTED)
                    .and(player.stamina < this.place.staminaCost).throw(phrase.OUT_OF_STAMINA)
                    .and(this.place.successChance == 0).throw(phrase.ROBBERY_ZERO_CHANCES)
            })
            .setArrested(!success)
            .setCoins(success ? this.place.coinsReward : this.place.coinsLoss, success)
            .setRespect(this.place.respect, success)
            .setStamina(this.place.staminaCost, false)
            .setIntelligence(this.place.intelligence, success)
            .setDexterity(this.place.dexterity, success)
            .setStrength(this.place.strength, success)
            .build()

        return super.make(update);
    }
}