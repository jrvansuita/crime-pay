const phrase = require('../const/phrase');
const Action = require('./action');
const PlayerUpdateModel = require('../model/player-update');
const { Num } = require('../lib/util');

module.exports = class ClubAttempt extends Action {

    constructor(player, clubItem) {
        super(player, clubItem);
        this.clubItem = clubItem;
    }

    success() {
        return this.clubItem.stamina.abs().positive() && super.success();
    }

    make() {
        const lucky = Num.lucky(100, 1);

        const failed = lucky <= this.clubItem.failChance;
        const jailed = lucky <= this.clubItem.jailChance;
        const succeed = !failed && !jailed;

        const update = new PlayerUpdateModel(this.player)
            .validate((player) => {
                this.check(player.arrested, phrase.PLAYER_ARRESTED)
                    .check(player.coins < this.clubItem.coins, phrase.INSUFFICIENT_COINS)
                    .check(player.stamina == 100, phrase.FULL_STAMINA)
                    .check(player.intoxication == 100, phrase.FULL_INTOXICATION)
            })
            .setArrested(jailed)
            .setCoins(this.clubItem.coins, false, 0, false, true)
            .setRespect(this.clubItem.respect, succeed, 0, true)
            .setStamina(this.clubItem.stamina, succeed, 0, true, true, 100)
            .setIntoxication(this.clubItem.intoxication, succeed, 0, true, true, 100)
            .build()

        return super.make(update);
    }
}