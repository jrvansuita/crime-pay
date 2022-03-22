const { Num } = require("../lib/util");

module.exports = class HookerMath {

    constructor(player, hooker) {
        this.player = player;
        this.hooker = hooker;

        this.hooker.jailChance = 0;
        this.hooker.failChance = 0;
    }

    getCoins() {

        if ((this.hooker.coinsFactor > 0) && (this.coins === undefined)) {

            //Define the Rewards Factor
            const factor = (this.hooker.coinsFactor / 10) * (this.player.coins * .07);

            //Define the Coins Bonus
            const rarityBonus = this.hooker.rarity * .5;

            //Define the Coins Cost
            const coins = factor + rarityBonus;

            this.coins = Num.assert(coins, true, 0)
        }

        return this.coins || 0;
    }

    getRespect() {
        if (this.respect === undefined) {
            //Defining player respect bonus
            const respectBonus = this.player.respect * .025;

            //Define the respect gain based on hooker rarity and coins factor plus player respect bonus
            const respect = (this.hooker.coinsFactor * this.hooker.rarity * .01) * respectBonus;

            this.respect = Num.assert(respect, true);
        }

        return this.respect || 0;
    }


    getStamina() {
        if (this.stamina === undefined) {

            //Define Stamina Bonus
            const bonus = (Math.max(1, this.player.stamina) / 50) / 10;

            //Define Stamina Cost 
            const stamina = this.hooker.stamina + (bonus * this.hooker.stamina);

            //Define min and max values
            this.stamina = Num.assert(stamina, true, 1, 100);
        }

        return this.stamina;
    }



    canFail() {
        const rarityCheck = (this.hooker.rarity > 40);

        const coinsFactorOrSuperRareCheck = (this.hooker.coinsFactor > 0) || (this.hooker.rarity > 80);

        const intoxicationCheck = (this.hooker.intoxication > 0);

        const canFail = rarityCheck && coinsFactorOrSuperRareCheck && intoxicationCheck;

        return canFail;
    }


    getJailChance() {
        if (this.jailChance === undefined) {

            const jailChance = (this.hooker.rarity + this.hooker.stamina) / (this.hooker.intoxication * 1.7);

            this.jailChance = Num.assert(jailChance, true, 0, 75);
        }

        return this.jailChance
    }



    getFailChance() {
        if (this.failChance === undefined) {

            const failChance = this.getJailChance() * 1.3;

            this.failChance = Num.assert(failChance, true, 0, 90);
        }

        return this.failChance
    }


    preview() {
        this.hooker.coins = this.getCoins();

        return this.hooker;
    }


    make() {
        this.hooker.coins = this.getCoins();
        this.hooker.respect = this.getRespect();
        this.hooker.stamina = this.getStamina();

        if (this.canFail()) {
            this.hooker.jailChance = this.getJailChance()
            this.hooker.failChance = this.getFailChance();

            if ((this.getFailChance() - this.getJailChance()) <= 5) {
                this.hooker.jailChance = 0;
            }
        }

        return this.hooker;
    }





}