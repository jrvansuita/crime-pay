const moment = require("moment");
const { ROBBERY_SUCCESS, ROBBERY_FAIL } = require("../const/constants");



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

            this.coins = -noNegativeResult(this.thief.coins, loss);
        }

        return this;
    }

    createRespect() {
        if (this.success) {
            this.respect = this.place.respect;
        } else {
            this.respect = -noNegativeResult(this.thief.respect, this.place.respect);
        }

        return this;
    }

    createStamina() {
        this.stamina = -noNegativeResult(this.thief.stamina, this.place.staminaCost);
        return this;
    }

    setAttributes(intelligence, dexterity, strength) {
        this.intelligence = this.success ? intelligence : -noNegativeResult(this.thief.intelligence, intelligence);
        this.dexterity = this.success ? dexterity : -noNegativeResult(this.thief.dexterity, dexterity);
        this.strength = this.success ? strength : -noNegativeResult(this.thief.strength, strength);

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

const noNegativeResult = (greater, dec) => {
    return (greater - Math.abs(dec)) < 0 ? greater : dec;
}