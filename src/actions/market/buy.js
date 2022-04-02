const phrase = require('../../const/phrase');
const PlayerUpdateModel = require('../../model/player-update');
const WeaponModel = require('../../model/weapon');
const Action = require('../action');

module.exports = class MarketDeal extends Action {

    constructor(player, merchandise) {
        super(player, merchandise);
        this.merchandise = merchandise;
    }

    getExtraEventData() {
        return { level: this.merchandise.level };
    }

    success() {
        return true;
    }

    weapon() {
        return this.weaponModel;
    }

    make() {

        this.weaponModel = new WeaponModel(this.player, this.merchandise)
            .validate((player) => {
                this.check(player.arrested, phrase.PLAYER_ARRESTED)
                    .check(player.coins < Math.abs(this.merchandise.coins), phrase.INSUFFICIENT_COINS)
            })
            .createFromMerchandise()
            .build();


        const update = new PlayerUpdateModel(this.player)
            .setCoins(this.merchandise.coins, false)
            .build()

        return super.make(update);
    }


}