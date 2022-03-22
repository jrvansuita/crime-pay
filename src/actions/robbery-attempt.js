const prahse = require('../const/phrase');
const PlayerUpdateModel = require('../model/player-update-model');
const { Num } = require('../lib/util');

module.exports = class RobberyAttempt {

    constructor(player, place) {
        this.player = player;
        this.place = place;
    }

    make(fullStamina) {
        const success = Num.lucky(100) <= this.place.successChance;

        const theftsCount = fullStamina ? Math.trunc(this.player.stamina / this.place.staminaCost) : 1;

        return new PlayerUpdateModel(this.player)
            .setSuccessMultiplier(theftsCount)
            .validate((player, model) => {
                model.check(player.arrested, prahse.PLAYER_ARRESTED)
                    .check(player.stamina < this.place.staminaCost, prahse.OUT_OF_STAMINA)
                    .check(this.place.successChance == 0, prahse.ROBBERY_ZERO_CHANCES)
            })
            .setArrested(!success)
            .setCoins(success ? this.place.coinsReward : this.place.coinsLoss, success)
            .setRespect(this.place.respect, success)
            .setStamina(this.place.staminaCost, false)
            .setIntelligence(this.place.intelligence, success)
            .setDexterity(this.place.dexterity, success)
            .setStrength(this.place.strength, success)
            .build()
    }
}