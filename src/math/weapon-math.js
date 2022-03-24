const { Num } = require("../lib/util");

module.exports = class WeaponMath {

    constructor(player, merchandise) {
        this.player = player;
        this.merchandise = merchandise;
    }

    getPlayerFactor() {
        if (this.playerFactor === undefined) {
            const sumAttributes = (this.player.intelligence + this.player.dexterity + this.player.strength);

            //Define a player factor based on all the player stats
            //Each stats group is considered, each one with own percentage amout
            const playerFactor = (sumAttributes * .23) +
                (this.player.respect * .2) +
                (this.player.coins * .2);

            this.playerFactor = Num.assert(playerFactor, true);
        }

        return this.playerFactor;
    }


    getCoins() {
        if ((this.merchandise.coinsFactor > 0) && (this.coins === undefined)) {

            //Define the Rewards Factor
            const factor = (this.merchandise.coinsFactor / 10) * (this.getPlayerFactor() * .59);

            //Define the Coins Increase
            const rarityIncrease = ((this.merchandise.rarity / 100) * (this.player.coins * .1)) + (this.merchandise.rarity / 3);

            //Define the Coins Cost
            const coins = factor + rarityIncrease;

            this.coins = Num.assert(coins, true, 0)
        }

        return this.coins || 0;
    }

    getRespect() {
        if ((this.respect === undefined)) {
            var respect = 0;

            if ((this.merchandise.rarity >= 10) && (this.merchandise.intelligenceFactor > 0)) {
                //Defining player respect bonus
                const respectBonus = (this.player.respect * .055) + this.merchandise.coinsFactor;

                //Define the respect gain based on elemnt rarity and coins factor plus player respect bonus
                respect = (this.merchandise.coinsFactor * this.merchandise.rarity * .008) + respectBonus;
            }

            this.respect = Num.assert(respect, true);
        }

        return this.respect || 0;
    }

    getGainPercentage() {
        if (this.gainPercentage === undefined) {
            //Define the attributes gain percentage of this weapon
            const gainPercentage = ((this.merchandise.coinsFactor * this.merchandise.rarity) * .019);

            this.gainPercentage = Num.assert(gainPercentage, true, 1, 70);
        }

        return this.gainPercentage;
    }


    getPlayerAttribute(attribute, factor) {
        if (this[attribute] === undefined && factor) {

            const points = (factor / 80) * Math.min(28450, this.getPlayerFactor());

            const bonus = Math.min(475, (this.getGainPercentage() / 100) * (this.player[attribute]));

            const value = points + bonus + this.merchandise.rarity + factor;


            this[attribute] = Num.assert(value, true, 1);
        }

        return this[attribute] || 0;
    }

    getLevel() {
        return this.getPlayerFactor().toString().length - 1;
    }

    preview() {
        this.merchandise.coins = this.getCoins();

        return this.merchandise;
    }


    make() {
        this.merchandise.gainPercentage = this.getGainPercentage();
        this.merchandise.playerFactor = this.getPlayerFactor();
        this.merchandise.coins = this.getCoins();
        this.merchandise.respect = this.getRespect();
        this.merchandise.level = this.getLevel();

        this.merchandise.intelligence = this.getPlayerAttribute('intelligence', this.merchandise.intelligenceFactor);
        this.merchandise.dexterity = this.getPlayerAttribute('dexterity', this.merchandise.dexterityFactor);
        this.merchandise.strength = this.getPlayerAttribute('strength', this.merchandise.strengthFactor);

        return this.merchandise;
    }





}