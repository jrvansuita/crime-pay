const moment = require("moment");
const { LIFE_IMPRISONMENT } = require("../const/word");
const { Num } = require("../lib/util");

module.exports = class WeaponModel {

    constructor(player, merchandise) {
        this.player = player;
        this.merchandise = merchandise;
    }

    execute() {
        this.playerId = this.player._id.toString();
        this.name = this.merchandise.name;
        this.type = this.merchandise.type;
        this.level = this.merchandise.level;
        this.rarity = this.merchandise.rarity;

        if (this.merchandise.bundle) {
            this.bundle = {}

            const bundle = this.merchandise.bundle;

            Object.keys(bundle).forEach(key => {
                const value = bundle[key];

                this.bundle[key] = Array.isArray(value) ? value.sortBetween() : value;
            });
        }
    }

    clear() {
        delete this.player;
        delete this.validations;
        delete this.merchandise;

        return this;
    }

    validate(validations) {
        this.validations = () => {
            if (validations) validations(this.player, this)
        };

        return this;
    }


    build() {
        this.execute();

        this.validations()

        return this.clear();
    }


}