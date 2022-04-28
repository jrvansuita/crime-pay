const PlayerUpdateModel = require("../model/player-update");

module.exports = class PlayerMinter {


    newOne(name, wallet) {
        this.head = "1";
        this.name = name;
        this.wallet = wallet;

        return this;
    }

    mint(multiplier, arrested = false) {

        multiplier = multiplier || (([0, 100].sortBetween() / 100) + 1)

        const data = new PlayerUpdateModel()
            .setArrested(arrested, 1)
            .setStamina(100)
            .setIntoxication(0, true, 0)
            .setCoins(50 * multiplier)
            .setRespect(15 * multiplier)
            .setIntelligence(30 * multiplier)
            .setDexterity(32 * multiplier)
            .setStrength(35 * multiplier)
            .clear()

        Object.assign(this, data);

        return this;
    }


}