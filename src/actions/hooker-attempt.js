const phrase = require('../const/phrase');
const PlayerUpdateModel = require('../model/player-update-model');
const { Num } = require('../lib/util');

module.exports = class HookerAttempt {

    constructor(player, hooker) {
        this.player = player;
        this.hooker = hooker;
    }

    make() {
        const lucky = Num.lucky(100, 1);

        const failed = lucky <= this.hooker.failChance;
        const jailed = lucky <= this.hooker.jailChance;
        const succeed = !failed && !jailed;

        return new PlayerUpdateModel(this.player)
            .validate((player, model) => {
                model.check(player.arrested, phrase.PLAYER_ARRESTED)
                    .check(player.coins < this.hooker.coins, phrase.INSUFFICIENT_COINS)
                    .check(player.stamina == 100, phrase.FULL_STAMINA)
                    .check(player.intoxication == 100, phrase.FULL_INTOXICATION)
            })
            .setArrested(jailed)
            .setCoins(this.hooker.coins, false, 0, false, true)
            .setRespect(this.hooker.respect, succeed, 0, true)
            .setStamina(this.hooker.stamina, succeed, 0, true, true, 100)
            .setIntoxication(this.hooker.intoxication, succeed, 0, true, true, 100)
            .build()
    }
}