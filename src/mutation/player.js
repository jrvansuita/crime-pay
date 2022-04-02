class PlayerMutation {

    constructor(player) {
        Object.assign(this, player);

        this.attributes();
    }

    attributes() {
        this.lifeImprisonment = this.arrested && !this?.arrestRelease;
    }

    getItems() {
        return this?.equipments?.filter((w) => { return w.isItem; })
    }

    getWeapons() {
        return this?.equipments?.filter((w) => { return w.isWeapon; })
    }

    isEquipped(e, attr = '_id') {
        return this?.equipments?.some((w) => { return (e[attr] || e).toString() === w[attr].toString(); })
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
}




if (typeof module !== 'undefined') {
    module.exports = PlayerMutation;
}
