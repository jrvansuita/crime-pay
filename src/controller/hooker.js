
const Controller = require("./controller");
const { Num } = require("../lib/util");


module.exports = class HookerController extends Controller {


    constructor() {
        super('hooker');
    }

    details(hookerId, player) {
        return this.findById(hookerId).then((hooker) => {
            return calculateAttributes(player, hooker);
        });
    }

    for(player) {

        return this.all().then((hookers) => {

            return hookers
                //Handle all calculated attributes
                .map(each => { return calculateAttributes(player, each) })

                //Filter hookers by rarity (Max Rarity 100 based on minuts)
                .filter((hooker) => {
                    return Num.lucky(100) >= hooker.rarity;
                })
                //Remove duplicate free
                .filter((each, index, arr) => {
                    return !arr.some(e => {
                        return (e._id != each._id)
                            && (e.coins == each.coins)
                            && (e.coins == 0)
                    })
                })
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
                .slice(0, 7)
                //Sort By Coins asc
                .sort((a, b) => { return a.coins - b.coins })


            // .reduce((data, current) => {
            //     return data[current.coins]
            // }, {})






        });
    }


}



var calculateAttributes = (player, hooker) => {

    hooker.coins = Math.trunc(((hooker.coinsFactor / 10) * player.coins) + (hooker.rarity * .1))

    if (hooker.coinsFactor <= 0) {
        hooker.coins = 0;
    }

    hooker.respect = Math.trunc((hooker.coinsFactor * hooker.rarity * .01) * player.respect * .05);
    hooker.intoxication = hooker.intoxication;

    var bonusStamina = (Math.max(1, player.stamina) / 50) / 10;
    hooker.stamina = Math.min(100, Math.trunc(hooker.stamina + (bonusStamina * hooker.stamina)));


    hooker.jailChance = hooker.failChance = 0
    var hasFailChance = (hooker.rarity > 40) && ((hooker.coinsFactor > 0) || (hooker.rarity > 80)) && (hooker.intoxication > 0);

    if (hasFailChance) {
        hooker.jailChance = Math.trunc(Math.min(75, (hooker.rarity + hooker.stamina) / (hooker.intoxication * 1.7)));
        hooker.failChance = Math.trunc(Math.min(90, hooker.jailChance * 1.3));

        if ((hooker.failChance - hooker.jailChance) <= 5) {
            hooker.jailChance = 0;
        }
    }

    return hooker;
}