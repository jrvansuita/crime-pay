const { Num, Util } = require("../lib/util");


//Attributes Bundle

module.exports = class AttributesBundle {

    static do() {
        return new AttributesBundle();
    }

    add(name, value, min, max) {
        if (value) this[name] = Num.assert(value, true, min, max);

        return this;
    }

    //Can increase or decrease the any of player attributes
    primary(intelligence, dexterity, strength) {
        return this.add('intelligence', intelligence)
            .add('dexterity', dexterity)
            .add('strength', strength);
    }

    //Respect increase or decrease
    respect(value) {
        return this.add('respect', value);
    }


    addRange(name, value, divider = 5) {

        if (value) {
            const max = value;
            const min = (max > 0 ? 1 : -1) * Num.assert(Math.abs(max) / divider, true, 1);
            this[name] = [min, max];
        }

        return this;
    }

    //Coins Rewards % per robberies
    coins(value) {
        return this.addRange('coins', value);
    }


    //Can increase or decrease robbery chances
    //This values ar set to max and min ranges
    robbery(successChance, staminaCost) {
        return this.addRange('successChance', successChance)
            .addRange('staminaCost', staminaCost)
    }

};