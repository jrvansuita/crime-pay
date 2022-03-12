const moment = require("moment");
const constants = require('../const/constants');
const Num = require('../lib/num');
const PlayerController = require("../controller/player");



module.exports = class PrisonMecanics {

    constructor() {
        this.playerController = new PlayerController();
    }

    statsFor(player) {
        return player.arrested ? {
            escape: new ReleaseAttempt(player).escape().get(),
            bribe: new ReleaseAttempt(player).bribe().get()
        } : {};
    }

    releaseAttempt(player, attempt) {
        return this.playerController.releasePrisonAttempt(player, attempt).then((updatedPlayer) => {
            return { player: updatedPlayer, attempt, newStats: this.statsFor(updatedPlayer) };
        });
    }

    escape(player) {
        return Promise.resolve().then(() => {
            return this.releaseAttempt(player, new ReleaseAttempt(player).escape().make());
        });
    }

    bribe(player) {
        return Promise.resolve().then(() => {
            return this.releaseAttempt(player, new ReleaseAttempt(player).bribe().make());
        });
    }



};




class ReleaseAttempt {
    constructor(player) {
        this.player = player;
    }

    validations() {
        if (!this.player.arrested) {
            throw new Error(constants.THIEF_NOT_ARRESTED);
        }

        if (this.player.stamina < Math.abs(this.stamina)) {
            throw new Error(constants.OUT_OF_STAMINA);
        }

        return this;
    }

    messages(successMsgs, failedMgs) {
        this.successMsgs = successMsgs;
        this.failedMgs = failedMgs;
        return this;
    }

    default(coinCost, respectReward) {
        this.coins = Math.trunc(Math.max(1, this.player.coins * coinCost));
        this.coins = -Num.greaterFrom(this.player.coins, this.coins)

        this.respect = Math.trunc(Math.max(1, (this.player.respect * .05 * respectReward) + 5));

        return this;
    }

    escape() {
        this.escapeChance = Math.max(10, moment(this.player.arrestRelease).seconds());
        this.daysIncOnFail = Math.trunc(Math.max(1, this.escapeChance / 20));
        this.arrestRelease = moment(this.player.arrestRelease).add(this.daysIncOnFail, 'days').toDate();

        this.stamina = -Math.trunc(Math.max(5, (this.escapeChance * .5 * 100) / 60));

        return this.messages(constants.PRISON_ESCAPE_SUCCESS, constants.PRISON_ESCAPE_FAIL).default((this.escapeChance / 250), (100 / (100 - this.escapeChance)));
    }

    bribe() {
        this.escapeChance = 100;
        this.stamina = -Math.max(this.player.stamina, 50);

        return this.messages(constants.PRISON_BRIBE_SUCCESS).default(.41, .7);
    }


    get() {
        delete this.player;
        return this;
    }

    make() {
        this.validations();

        const luckyNumber = Math.floor(Math.random() * 100 - 1);

        this.success = luckyNumber <= this.escapeChance;
        this.respect = this.success ? this.respect : 0;

        this.msg = this.success ? this.successMsgs.randomOne() : this.failedMgs.randomOne();
        delete this.successMsgs;
        delete this.failedMgs;

        return this.get();
    }
}
