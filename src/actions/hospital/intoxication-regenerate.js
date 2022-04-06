const phrase = require("../../const/phrase");
const PlayerUpdateModel = require("../../model/player-update");
const Action = require("../action");

module.exports = class IntoxicationRegenerate extends Action {


    make(validate = true) {

        const update = new PlayerUpdateModel(this.player);

        if (validate)
            update.validate((player) => {
                player.isArrested().throw(phrase.PLAYER_ARRESTED)
                    .and(!player.isIntoxicated()).throw(phrase.NOT_INTOXICATED)
            })

        update
            .setIntoxication(this.player.intoxication, false)
            .setCoins(this.player.coins * 0.15 * (this.player.intoxication / 100), false, 5)

        return super.make(update.build());
    }
}