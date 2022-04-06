const moment = require("moment");

module.exports = class PlayerUpdateModel {

    constructor(player, multiplier = 1) {
        this.player = player;
        this.multiplier = multiplier;
    }


    setSuccessMultiplier(multiplier = 1) {
        this.multiplier = multiplier;
        return this;
    }

    setArrested(arrested, arrestDays = 1) {
        this.arrested = arrested;

        const lastDate = this.player?.arrestRelease || new Date();

        this.arrestRelease = this.arrested ? moment(lastDate).add(arrestDays, 'days').minutes(0).toDate() : null;

        if (this.arrested) this.clearEquip()
        return this;
    }

    clearEquip() {
        this.equip = []
        return this;
    }

    setEquip(w, add = true) {
        if (add) {
            this.equip = [(w?._id?.toString() || w), ...(this.player.equip || [])];
        } else {
            this.equip = this.player.equip.filter((id) => { return id !== (w?._id?.toString() || w) });
        }

        return this;
    }

    setAttr(attr, value, adding = true, min = 1, minOnDecrease = false, checkPlayerLimit = true, max = 999999999) {
        value = Math.trunc(Math.abs(value));
        value = Math.max(min, value);
        value = Math.min(max, value);

        if (adding) {
            if (checkPlayerLimit) {
                value = Math.min(value, max - (this.player[attr] || 0));
            }


        } else {
            if (minOnDecrease) value = min;

            if (checkPlayerLimit) {
                value = Math.min(value, (this.player[attr] || 0));
            }

            value = -value;
        }

        if (!this.arrested) value = value * this.multiplier;

        this[attr] = value;
        return this;
    }

    setCoins(...params) {
        return this.setAttr('coins', ...params);
    }

    setRespect(...params) {
        return this.setAttr('respect', ...params);
    }

    setStamina(...params) {
        return this.setAttr('stamina', ...params);
    }

    setIntoxication(...params) {
        return this.setAttr('intoxication', ...params);
    }

    setIntelligence(...params) {
        return this.setAttr('intelligence', ...params);
    }

    setDexterity(...params) {
        return this.setAttr('dexterity', ...params);
    }

    setStrength(...params) {
        return this.setAttr('strength', ...params);
    }

    validate(validations) {

        this.validations = () => {

            if (validations) validations(this.player, this)

            this.checkForLifePrison();
        };

        return this;
    }

    checkForLifePrison() {
        if (this.arrested) {
            //This player just lost the character. Took for life prison.
            const intelligence = this.player.intelligence + this.intelligence;
            const dexterity = this.player.dexterity + this.dexterity;
            const strength = this.player.strength + this.strength;

            if ((intelligence + dexterity + strength) <= 1)
                this.arrestRelease = null;
        }
    }

    clear() {
        delete this.player;
        delete this.validations;
        delete this.multiplier;

        return this;
    }

    build() {
        this.validations?.()

        return this.clear()
    }


}