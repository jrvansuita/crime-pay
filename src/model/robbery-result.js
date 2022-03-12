const moment = require("moment");
const { ROBBERY_SUCCESS, ROBBERY_FAIL } = require("../const/constants");
const Num = require('../lib/num');


module.exports = class RobberyResult {

    constructor(success) {
        this.success = success;

        this.coins = 0;
        this.intelligence = 0;
        this.dexterity = 0;
        this.strength = 0;
        this.respect = 0;
        this.stamina = 0;
        this.date = moment().toDate();

        this.arrested = !success;
        if (this.arrested) this.arrestRelease = moment().add(1, 'days').minutes(0).toDate();
    }


    setThiefAndPlace(thief, place) {
        this.thief = thief;
        this.place = place;

        return this;
    }


    createCoins() {
        if (this.success) {
            this.coins = this.place.coinsReward;
        } else {
            let loss = Math.trunc((Math.abs(this.intelligence) / this.thief.intelligence) * this.thief.coins);

            this.coins = -Num.greaterFrom(this.thief.coins, loss);
        }

        return this;
    }

    createRespect() {
        if (this.success) {
            this.respect = this.place.respect;
        } else {
            this.respect = -Num.greaterFrom(this.thief.respect, this.place.respect);
        }

        return this;
    }

    createStamina() {
        this.stamina = -Num.greaterFrom(this.thief.stamina, this.place.staminaCost);
        return this;
    }

    setAttributes(intelligence, dexterity, strength) {
        this.intelligence = this.success ? intelligence : -Num.greaterFrom(this.thief.intelligence, intelligence);
        this.dexterity = this.success ? dexterity : -Num.greaterFrom(this.thief.dexterity, dexterity);
        this.strength = this.success ? strength : -Num.greaterFrom(this.thief.strength, strength);

        return this;
    }

    build() {
        this.playerId = this.thief._id.toString();
        this.placeId = this.place._id.toString();
        delete this.thief;
        delete this.place;

        return this
    }

    static parse(result) {
        result.msg = result.success ? ROBBERY_SUCCESS.randomOne() : ROBBERY_FAIL.randomOne();

        return result;
    }



}