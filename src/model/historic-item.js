const moment = require("moment")
const phrase = require("../const/phrase")
const text = require("../const/text")
const word = require("../const/word")

const defaultImages = { coins: 'coin', respect: 'respect', stamina: 'stamina', intoxication: 'intoxication' }

const valuesFormatter = {
    title: value => { return value },
    arrested: () => { return phrase.GOT_ARRESTED },
    arrestRelease: (value) => { return word.RELEASE.concat(value.toDateDisplay()) }
}


module.exports = class HistoricItem {
    constructor(event) {
        this.event = event;

    }

    getFormatedText(key, value) {
        return valuesFormatter[key] ? valuesFormatter[key](value) : (value + ' ' + key.capitalize());
    }

    buildInfos() {
        let infos = [];

        Object.keys(this.event.data).forEach((key) => {
            const value = this.event.data[key];

            infos.push({
                image: defaultImages[key],
                text: this.getFormatedText(key, value)
            })
        });


        return infos
    }

    build() {
        return {
            success: this.event.success,
            date: moment(this.event.date).fromNow(),
            message: text.HISTORIC.EVENT_TYPE[this.event.type].randomOne(),
            infos: this.buildInfos()
        };
    }

}


