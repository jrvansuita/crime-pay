const { Num } = require("../lib/util");

module.exports = class DrugMath {

    constructor(player, drug) {
        this.player = player;
        this.drug = drug;

        this.drug.jailChance = 0;
        this.drug.failChance = 0;
    }

    getCoins() {

        if ((this.drug.coinsFactor > 0) && (this.coins === undefined)) {

            //Define the Rewards Factor
            const factor = (this.drug.coinsFactor / 10) * (this.player.coins * .07);

            //Define the Coins Bonus
            const rarityBonus = this.drug.rarity * .15;

            //Define the Coins Cost
            const coins = factor + rarityBonus;

            this.coins = Num.assert(coins, true, 0)
        }

        return this.coins || 0;
    }

    getRespect() {
        if (this.respect === undefined && ((this.drug.coinsFactor >= 2.5) || (this.drug.stamina > 90))) {
            //Defining player respect bonus
            const respectBonus = this.player.respect * .025;

            //Define the respect gain based on rarity and coins factor plus player respect bonus
            const respect = (this.drug.coinsFactor * .25) + (this.drug.rarity * .03) + respectBonus;

            this.respect = Num.assert(respect, true);
        }

        return this.respect || 0;
    }


    getStamina() {
        if (this.stamina === undefined) {

            //Define Stamina Onus
            const onus = Math.max(0, (this.player.intoxication / 100) * this.drug.stamina);

            //Define Stamina Cost 
            const stamina = this.drug.stamina - onus;

            //Define min and max values
            this.stamina = Num.assert(stamina, true, 1, 100);
        }

        return this.stamina;
    }



    canFail() {
        const rarityCheck = (this.drug.rarity >= 45);

        const intoxicationCheck = (this.drug.intoxication > 10);

        const canFail = rarityCheck && intoxicationCheck;

        return canFail;
    }


    getJailChance() {
        if (this.jailChance === undefined) {

            const jailChance = (this.drug.rarity + this.drug.stamina) / this.drug.intoxication;

            this.jailChance = Num.assert(jailChance, true, 0, 90);
        }

        return this.jailChance
    }



    getFailChance() {
        if (this.failChance === undefined) {

            const failChance = ((100 - this.drug.stamina) * .3) + (this.drug.intoxication * .1);

            this.failChance = Num.assert(failChance, true, 0, 95);
        }

        return this.failChance
    }


    preview() {
        this.drug.coins = this.getCoins();

        return this.drug;
    }


    make() {
        this.drug.coins = this.getCoins();
        this.drug.respect = this.getRespect();
        this.drug.stamina = this.getStamina();

        if (this.canFail()) {
            this.drug.jailChance = this.getJailChance()
            this.drug.failChance = this.getFailChance();
        }

        return this.drug;
    }





}