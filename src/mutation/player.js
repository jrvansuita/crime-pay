

class PlayerMutation {

    constructor(player) {
        Object.assign(this, player);

        this.attributes();
    }

    attributes() {
        this.lifeImprisonment = this.arrested && !this?.arrestRelease;
    }

    getItems(def = []) {
        return this?.equipments?.filter((w) => { return w.isItem; }) || def
    }

    getWeapons(def = []) {
        return this?.equipments?.filter((w) => { return w.isWeapon; }) || def;
    }

    isEquipped(e, attr = '_id') {
        return this?.equipments?.some((w) => { return (e[attr] || e).toString() === w[attr].toString(); }) || false;
    };

    getAttribute(attr) {
        return this[attr] + (this?.equipments?.reduce((s, e) => { return s + (e?.bundle?.[attr] || 0); }, 0) || 0)
    }

    getBonuses(some) {
        return this?.equipments?.reduce((sum, e) => {
            Object.keys(e.bundle).forEach((key) => {
                if (!some || some?.includes(key))
                    sum[key] = (sum[key] || 0) + e.bundle[key];
            })

            return sum;
        }, {})
    }

    getBonusValue(attr, def = 0) {
        return this.getBonuses([attr])?.[attr] || def
    }


    getFactor() {
        if (!this.factor) {
            const sumAttributes = this.intelligence + this.dexterity + this.strength;

            //Define a player factor based on all the player stats
            //Each stats group is considered, each one with own percentage amount
            const playerFactor = (sumAttributes * .23) +
                (this.respect * .2) +
                (this.coins * .2);

            this.factor = Math.trunc(playerFactor);
        }

        return this.factor;
    }

    getLevel() {
        if (!this.level) {
            this.level = this.getFactor().toString().length - 1;
        }

        return this.level;
    }

    isArrested() {
        return this.arrested || false;
    }

    isIntoxicated() {
        return this.intoxication > 0;
    }
}




if (typeof module !== 'undefined') {
    module.exports = PlayerMutation;
}
