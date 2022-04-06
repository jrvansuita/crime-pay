const moment = require("moment")
const phrase = require("../const/phrase")
const text = require("../const/text")
const word = require("../const/word")

const defaultImages = { coins: 'coin', price: 'coin', respect: 'respect', stamina: 'stamina', intoxication: 'intoxication' }

const valuesFormatter = {
    title: value => { return value },
    arrested: () => { return phrase.GOT_ARRESTED },
    arrestRelease: (value) => { return word.RELEASE.concat(value.toDateDisplay()) },
    equip: () => { return word.DROPPED_EQUIPS },
    class: value => { return value },
    rarity: value => { return value },
    level: value => { return word.LEVEL.concat(value) },
}


module.exports = class HistoricItem {
    constructor(event) {
        this.event = event;

    }

    getFormattedText(key, value) {
        return valuesFormatter[key] ? valuesFormatter[key](value) : ((value.format?.() || value) + ' ' + key.capitalize());
    }

    buildInfos() {
        let infos = [];

        Object.keys(this.event.data).forEach((key) => {
            const value = this.event.data[key];

            infos.push({
                image: defaultImages[key],
                text: this.getFormattedText(key, value)
            })
        });


        return infos
    }

    build() {

        console.log(this.event.type);
        return {
            success: this.event.success,
            date: moment(this.event.date).fromNow(),
            message: text.HISTORIC.EVENT_TYPE[this.event.type]?.randomOne() || phrase.NO_EVENT_MESSAGE,
            infos: this.buildInfos()
        };
    }

}


