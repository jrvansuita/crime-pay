const PlayerData = require("../db/data-access/player");
const { Num } = require("../lib/util");

module.exports = class RobberyMath {

    constructor(player, place) {
        this.player = player;
        this.place = place;
    }

    getPlayerFactor() {
        if (this.playerFactor === undefined) {

            const sumAttributes = this.player.getAttribute('intelligence') +
                this.player.getAttribute('dexterity') +
                this.player.getAttribute('strength');

            //Define a player factor based on all the player stats
            //Each stats group is considered, each one with own percentage amount
            const playerFactor = (sumAttributes * .37) +
                (this.player.respect * .015) +
                (this.player.coins * .010) +
                ((this.player.stamina - this.player.intoxication) * .015);

            this.playerFactor = Num.assert(playerFactor, true);
        }

        return this.playerFactor;
    }


    getSuccessFactor() {
        if (this.successFactor === undefined) {
            //Define a success factor base on player factor and place difficulty
            const successFactor = (((100 - this.place.difficulty) / 100) * this.getPlayerFactor() * .69)

            this.successFactor = Num.assert(successFactor, true, 0);
        }

        return this.successFactor;
    }

    getSuccessChance() {
        if (this.successChance === undefined) {
            //Define the place success chance. Based on the success factor and each place difficulty
            const successChance = (this.getSuccessFactor() / this.place.difficulty) || 0;

            //Weapon Success Chance Bonus
            const bonus = this.player.getBonusValue('successChance');

            this.successChance = Num.assert(successChance + bonus, true, 0, 100);
        }

        return this.successChance;
    }

    getCoinsPrintFactor() {
        //Define a Coins Print Factor. The greater this value, more coins will be generated.
        return 1.9;
    }

    getCoinsHolderBonus() {
        if (this.coinsBonus === undefined) {
            //Define a bonus for coins holder. Based on Coins Holdings and success chances.
            const coinsBonus = this.player.coins * ((100 - this.getSuccessChance()) / 100) * .1;

            this.coinsBonus = Num.assert(coinsBonus, true);
        }

        return this.coinsBonus;
    }


    getCoinsReward() {

        if ((this.getSuccessChance() > 0) && (this.coinsReward === undefined)) {
            //Define the Rewards Factor
            const factor = this.getPlayerFactor() / this.getSuccessFactor();

            //Define the Coins Rewards
            const coins = factor * this.place.difficulty * this.getCoinsPrintFactor();

            //Adding Coins Bonus for Holding coins
            const coinsReward = coins + this.getCoinsHolderBonus();

            //Weapon Stamina Coins Bonus
            const bonus = (coinsReward * this.player.getBonusValue('coins')) / 100;

            //Remove decimal values and define min value
            this.coinsReward = Num.assert(coinsReward + bonus, true, 1);
        }

        return this.coinsReward || 0;
    }

    getCoinsLoss() {
        if (this.getSuccessChance().isBetween(1, 100) && (this.coinsLoss === undefined)) {
            //Define the coins loss when fail
            const coinsLoss = (this.getCoinsReward() / 3.3) + this.getCoinsHolderBonus();

            //Remove decimal values and define min value
            this.coinsLoss = Num.assert(coinsLoss, true, 1)
        }

        return this.coinsLoss || 0;
    }

    getStaminaCost() {
        if (this.staminaCost === undefined) {
            const min = 15;

            const intoxicationIncrease = (this.player.intoxication * .33);

            //Define Stamina cost based on place success chance
            const staminaCost = ((100 - this.getSuccessChance()) * .75) + intoxicationIncrease;

            //Weapon Stamina Cost Bonus
            const bonus = this.player.getBonusValue('staminaCost');

            //Define min and max values
            this.staminaCost = Num.assert(staminaCost + bonus, true, min + bonus, 100);
        }

        return this.staminaCost;
    }

    getRespect() {
        if ((this.getSuccessChance() > 0) && this.respect === undefined) {
            //Defining the bonus
            const respectBonus = Math.min(3, this.player.respect * .01)

            //Define the respect gain based on place difficulty and success chances plus player respect bonus
            const respect = this.place.difficulty * ((100 - this.getSuccessChance()) / 100) + respectBonus

            this.respect = Num.assert(respect, true, 1);
        }

        return this.respect || 0;
    }


    getPlayerAttributeValue(attributeName) {
        if ((this.getSuccessChance() > 0) && this[attributeName] === undefined) {

            //Defining attribute points
            const attributePoints = (100 - this.getSuccessChance()) * this.place.difficulty * .033;

            //Defining as min bonus, the weapons stats
            const minBonus = (this.place.difficulty || 1) * 2.5;

            //Define as max bonus a player attribute percentage
            const maxBonus = this.player.getAttribute(attributeName) * 0.5;

            //Defining the bonus for keep playing
            const bonus = Math.min(minBonus, maxBonus);

            //Define the increase points this attribute will take
            const value = Math.max(3, attributePoints) + bonus;

            this[attributeName] = Num.assert(value, true, 1);
        }


        return this[attributeName] || 0;
    }

    getStrength() {
        if ((this.getSuccessChance() > 0) && this.strength === undefined) {

            const strength = (this.getPlayerAttributeValue('intelligence') + this.getPlayerAttributeValue('dexterity')) / 2.1;

            this.strength = Num.assert(strength, true);
        }

        return this.strength || 0;
    }

    preview() {
        this.place.successChance = this.getSuccessChance();

        return this.place;
    }


    make() {
        this.place.successChance = this.getSuccessChance();

        this.place.coinsReward = this.getCoinsReward();
        this.place.coinsLoss = this.getCoinsLoss();

        this.place.staminaCost = this.getStaminaCost();
        this.place.respect = this.getRespect();

        this.place.intelligence = this.getPlayerAttributeValue('intelligence');
        this.place.dexterity = this.getPlayerAttributeValue('dexterity');
        this.place.strength = this.getStrength()

        //To Analyze purposes. Can be removed.
        this.place.playerFactor = this.getPlayerFactor();
        this.place.successFactor = this.getSuccessFactor();
        this.place.coinsHolderBonus = this.getCoinsHolderBonus()
        // ----------------------------------//

        return this.place;
    }



}