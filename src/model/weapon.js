module.exports = class WeaponModel {

    constructor(player, weapon) {
        this.player = player;
        this.weapon = weapon;
    }

    setPrice(price = 0) {
        this.price = Math.trunc(price);
        return this;
    }


    setAsNewOwner() {
        this.price = 0;
        this.playerId = this.player._id.toString();
        return this;
    }

    createFromMerchandise() {
        this.playerId = this.player._id.toString();
        this.name = this.weapon.name;
        this.type = this.weapon.type;
        this.level = this.weapon.level;
        this.rarity = this.weapon.rarity;

        if (this.weapon.bundle) {
            this.bundle = {}

            const bundle = this.weapon.bundle;

            Object.keys(bundle).forEach(key => {
                const value = bundle[key];

                this.bundle[key] = Array.isArray(value) ? value.sortBetween() : value;
            });
        }

        return this;
    }

    clear() {
        delete this.player;
        delete this.validations;
        delete this.weapon;

        return this;
    }

    validate(validations) {
        this.validations = () => {
            if (validations) validations(this.player, this)
        };

        return this;
    }


    build() {
        this.validations()

        return this.clear();
    }


}