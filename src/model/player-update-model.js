const moment = require("moment");

module.exports = class PlayerUpdateModel {

    constructor(player) {
        this.player = player;

        this.coins = 0;
        this.respect = 0;
        this.stamina = 0;
        this.intoxication = 0;

        this.intelligence = 0;
        this.dexterity = 0;
        this.strength = 0;
    }

    static build(player, coins, respect, stamina, intoxication, intelligence, dexterity, strength) {
        return new PlayerUpdateModel(player)
            .setCoins(coins)
            .setRespect(respect)
            .setStamina(stamina)
            .setIntoxication(intoxication)
            .setIntelligence(intelligence)
            .setDexterity(dexterity)
            .setStrength(strength)
    }

    setArrested(arrested, arrestDays = 1) {
        this.arrested = arrested;

        const date = this.player?.arrestRelease || new Date();
        this.arrestRelease = this.arrested ? moment(date).add(arrestDays, 'days').minutes(0).toDate() : null;
        return this;
    }

    setPlayerAttr(attr, value, adding = true, min = 1, minOnDecrease = false, checkPlayerLimit = true, max = 999999999) {
        value = Math.trunc(Math.abs(value));
        value = Math.max(min, value);
        value = Math.min(max, value);

        if (adding) {
            if (checkPlayerLimit) {
                value = Math.min(value, max - this.player[attr]);
            }
        } else {
            if (minOnDecrease) value = min;

            if (checkPlayerLimit) {
                value = Math.min(value, this.player[attr]);
            }

            value = -value;
        }

        this[attr] = value;
        return this;
    }

    setCoins(...params) {
        return this.setPlayerAttr('coins', ...params);
    }

    setRespect(...params) {
        return this.setPlayerAttr('respect', ...params);
    }

    setStamina(...params) {
        return this.setPlayerAttr('stamina', ...params);
    }

    setIntoxication(...params) {
        return this.setPlayerAttr('intoxication', ...params);
    }

    setIntelligence(...params) {
        return this.setPlayerAttr('intelligence', ...params);
    }

    setDexterity(...params) {
        return this.setPlayerAttr('dexterity', ...params);
    }

    setStrength(...params) {
        return this.setPlayerAttr('strength', ...params);
    }

    validate(validations) {
        this.validations = validations;
        return this;
    }

    check(condition, errorMessage) {
        if (condition) throw new Error(errorMessage);

        return this;
    }

    get() {
        delete this.player;
        delete this.validations;
        return this
    }

    build() {
        if (this.validations) this.validations(this.player, this)

        return this.get()
    }


}