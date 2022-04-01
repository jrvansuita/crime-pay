const word = require("../const/word");

const { Num } = require("../lib/util");

module.exports = class WeaponMath {

    constructor(player, merchandise) {
        this.player = player;
        this.merchandise = merchandise;
    }

    static color(weapon) {
        const name = weapon.name.replaceAll(' ', weapon.level * weapon.rarity);

        const saturation = Num.assert((weapon.level * (weapon.rarity / 4)), true, 43, 60);
        const lightness = Num.assert(90 - weapon.rarity, true, 45, 80);

        return name.toColor(220, 1, saturation, lightness);
    }

    static rarity(weapon) {
        const rarity = weapon.rarity;

        var title = false;
        // title = title || rarity.isBetween(0, 55, word.COMMON);
        title = title || rarity.isBetween(56, 69, word.RARE);
        title = title || rarity.isBetween(70, 94, word.EPIC);
        title = title || rarity.isBetween(95, 100, word.LEGENDARY);

        return title || '';
    }

    getPlayerFactor() {
        if (this.playerFactor === undefined) {
            const sumAttributes = (this.player.intelligence + this.player.dexterity + this.player.strength);

            //Define a player factor based on all the player stats
            //Each stats group is considered, each one with own percentage amount
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

    getRespect() {
        if (this.respect === undefined) {
            const respect = this.getPlayerAttribute('respect', this.merchandise.bundle.respect);

            this.respect = Num.assert(respect * .35, true, 0, (this.player.respect * .25));
        }

        return this.respect;

    }

    getLevel() {
        if (this.level === undefined) {
            this.level = this.getPlayerFactor().toString().length - 1;
        }

        return this.level;
    }

    getColor() {
        if (this.color === undefined) {
            this.color = WeaponMath.color(this.merchandise);
        }

        return this.color;
    }

    getRarityTitle() {
        if (this.rarityTitle === undefined) {
            this.rarityTitle = WeaponMath.rarity(this.merchandise);
        }

        return this.rarityTitle;
    }

    preview() {
        this.merchandise.coins = this.getCoins();

        return this.merchandise;
    }

    make() {
        this.merchandise.gainPercentage = this.getGainPercentage();
        this.merchandise.playerFactor = this.getPlayerFactor();
        this.merchandise.coins = this.getCoins();
        this.merchandise.level = this.getLevel();

        this.merchandise.bundle.intelligence = this.getPlayerAttribute('intelligence', this.merchandise.bundle.intelligence);
        this.merchandise.bundle.dexterity = this.getPlayerAttribute('dexterity', this.merchandise.bundle.dexterity);
        this.merchandise.bundle.strength = this.getPlayerAttribute('strength', this.merchandise.bundle.strength);
        this.merchandise.bundle.respect = this.getRespect();

        this.merchandise.color = this.getColor();
        this.merchandise.rarityTitle = this.getRarityTitle();

        return this.merchandise;
    }





}