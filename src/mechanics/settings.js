const PlayerMinter = require('../minter/player');
const PlayerUpdateModel = require('../model/player-update');
const Mechanics = require("./mechanics");


module.exports = class SettingsMechanics extends Mechanics {

    buildPlayerModel(player, multiplier, arrested) {


        return new PlayerMinter().mint(multiplier, arrested)

        // return new PlayerUpdateModel(player)
        //     .setArrested(arrested, 1)
        //     .setStamina(100)
        //     .setIntoxication(0, true, 0)
        //     .setCoins(50 * multiplier)
        //     .setRespect(15 * multiplier)
        //     .setIntelligence(30 * multiplier)
        //     .setDexterity(32 * multiplier)
        //     .setStrength(35 * multiplier)
        //     .clear()
    }


    setState(player, multiplier = 1) {
        return this.set(player, this.buildPlayerModel(player, multiplier));
    }

    setPrisoner(player) {
        return this.set(player, this.buildPlayerModel(player, 1, true));
    }


}