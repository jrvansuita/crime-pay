const Mechanics = require("./mechanics");
const IntoxicationRegenerate = require('../actions/hospital/intoxication-regenerate');
const { text } = require("express");


module.exports = class HospitalMechanics extends Mechanics {

    for(player) {
        return {
            regenerate: new IntoxicationRegenerate(player).make(false)
        }
    }

    regenerate(player) {
        return Promise.resolve().then(() => {
            const action = new IntoxicationRegenerate(player).make();

            return super.update(player, action).then((player) => {
                return { player, message: text.FULL_INTOXICATION };
            })
        })

    }

};




