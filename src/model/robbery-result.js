module.exports = class RobberyResult {

    constructor(success) {
        this.success = success;
        this.coins = 0;
        this.intelligence = 0;
        this.dexterity = 0;
        this.strength = 0;
        this.respect = 0;
        this.stamina = 0;
    }

    setStats(coins, respect, stamina) {
        this.coins = this.success ? coins : 0;
        this.respect = this.success ? respect : -respect;
        this.stamina = -stamina;
    }

    setAttributes(intelligence, dexterity, strength) {
        this.intelligence = this.success ? intelligence : -intelligence;
        this.dexterity = this.success ? dexterity : -dexterity;;
        this.strength = this.success ? strength : -strength;;
    }

    apply(player) {
        player.intelligence += this.intelligence;
        player.dexterity += this.dexterity;
        player.strength += this.strength;
        player.coins += this.coins;
        player.respect += this.respect;
        player.stamina += this.stamina;

        return player;
    }
}