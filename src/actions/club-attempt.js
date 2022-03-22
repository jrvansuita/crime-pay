const phrase = require('../const/phrase');
const PlayerUpdateModel = require('../model/player-update-model');
const { Num } = require('../lib/util');

module.exports = class ClubAttempt {

    constructor(player, data) {
        this.player = player;
        this.data = data;
    }

    make() {
        const lucky = Num.lucky(100, 1);

        const failed = lucky <= this.data.failChance;
        const jailed = lucky <= this.data.jailChance;
        const succeed = !failed && !jailed;

        return new PlayerUpdateModel(this.player)
            .validate((player, model) => {
                model.check(player.arrested, phrase.PLAYER_ARRESTED)
                    .check(player.coins < this.data.coins, phrase.INSUFFICIENT_COINS)
                    .check(player.stamina == 100, phrase.FULL_STAMINA)
                    .check(player.intoxication == 100, phrase.FULL_INTOXICATION)
            })
            .setArrested(jailed)
            .setCoins(this.data.coins, false, 0, false, true)
            .setRespect(this.data.respect, succeed, 0, true)
            .setStamina(this.data.stamina, succeed, 0, true, true, 100)
            .setIntoxication(this.data.intoxication, succeed, 0, true, true, 100)
            .build()
    }
}