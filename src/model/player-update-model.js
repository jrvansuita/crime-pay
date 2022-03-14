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

    setArrested(arrested, arrestDays = 1) {
        this.arrested = arrested;

        const date = this.player?.arrestRelease || new Date();
        this.arrestRelease = this.arrested ? moment(date).add(arrestDays, 'days').minutes(0).toDate() : null;
        return this;
    }

    setPlayerAttr(attr, value, add = true, min = 1, minOnDecrease = false, checkPlayerOnDecrease = true) {
        value = Math.trunc(Math.abs(value));
        value = Math.max(min, value);

        if (!add) {
            if (minOnDecrease) value = min;

            if (checkPlayerOnDecrease) {
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