const moment = require("moment");
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

        if (this.merchandise.bundle) {
            this.bundle = {}

            Object.keys(this.merchandise.bundle).forEach(key => {
                const value = this.merchandise.bundle[key];
                this.bundle[key] = (value?.[1] !== undefined) ? Num.lucky(value[1], value[0]) : value
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