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

    isEquipped(e) {
        return this?.equip?.includes((e._id || e).toString()) || false;
    };

    getAttribute(attr) {
        return this[attr] + (this?.equipments?.reduce((s, e) => { return s + (e.bundle[attr] || 0); }, 0) || 0)
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
}




if (typeof module !== 'undefined') {
    module.exports = PlayerMutation;
}
