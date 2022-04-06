const phrase = require('../../const/phrase');
const Action = require('../action');
const PlayerUpdateModel = require('../../model/player-update');
const { Num } = require('../../lib/util');

module.exports = class ClubAttempt extends Action {

    constructor(player, clubItem) {
        super(player, clubItem);
        this.clubItem = clubItem;
    }

    success() {
        return this.succeed;
    }

    make() {
        const lucky = Num.lucky(100, 1);

        const failed = lucky <= this.clubItem.failChance;
        const jailed = lucky <= this.clubItem.jailChance;
        this.succeed = !failed && !jailed;

        const update = new PlayerUpdateModel(this.player)
            .validate((player) => {
                player.isArrested().throw(phrase.PLAYER_ARRESTED)
                    .and(player.coins < this.clubItem.coins).throw(phrase.INSUFFICIENT_COINS)
                    .and(player.stamina == 100).throw(phrase.FULL_STAMINA)
                    .and(player.intoxication == 100).throw(phrase.FULL_INTOXICATION)
            })
            .setArrested(jailed)
            .setCoins(this.clubItem.coins, false, 0, false, true)
            .setRespect(this.clubItem.respect, this.succeed, 0, true)
            .setStamina(this.clubItem.stamina, this.succeed, 0, true, true, 100)
            .setIntoxication(this.clubItem.intoxication, this.succeed, 0, true, true, 100)
            .build()

        return super.make(update);
    }
}