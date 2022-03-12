const moment = require("moment");
const { PRISON_ESCAPE_SUCCESS, PRISON_ESCAPE_FAIL, THIEF_NOT_ARRESTED, PRISON_BRIBE_SUCCESS } = require("../const/constants");

const PlayerController = require("../controller/player");



module.exports = class PrisonMecanics {

    constructor() {
        this.playerController = new PlayerController();
    }

    statsFor(player) {
        return player.arrested ? {
            escape: new ReleaseAttempt(player).escape(),
            bribe: new ReleaseAttempt(player).bribe()
        } : {};
    }

    releaseAttempt(player, attempt) {
        return Promise.resolve().then(() => {
            return this.playerController.releasePrisonAttempt(player, attempt).then((updatedPlayer) => {
                return { player: updatedPlayer, attempt, newStats: this.statsFor(updatedPlayer) };
            });
        })
    }

    escape(player) {
        return this.releaseAttempt(player, new ReleaseAttempt(player).validations().escape().make());
    }

    bribe(player) {
        return this.releaseAttempt(player, new ReleaseAttempt(player).validations().bribe().make());
    }



};




class ReleaseAttempt {
    constructor(player) {
        this.player = player;
    }

    validations() {
        if (!this.player.arrested) {
            throw new Error(THIEF_NOT_ARRESTED);
        }

        return this;
    }

    messages(successMsgs, failedMgs) {
        this.successMsgs = successMsgs;
        this.failedMgs = failedMgs;
        return this;
    }

    default(coinCost, respectReward) {
        this.stamina = -this.player.stamina;
        this.coins = -Math.trunc(Math.max(1, this.player.coins * coinCost));
        this.respect = Math.trunc((this.player.respect * .5 * respectReward) + 5);

        delete this.player;
        return this;
    }

    escape() {
        this.escapeChance = Math.max(10, moment(this.player.arrestRelease).seconds());
        this.daysIncOnFail = Math.trunc(Math.max(1, this.escapeChance / 20));
        this.arrestRelease = moment(this.player.arrestRelease).add(this.daysIncOnFail, 'days').toDate();

        return this.messages(PRISON_ESCAPE_SUCCESS, PRISON_ESCAPE_FAIL).default((this.escapeChance / 250), (100 / (100 - this.escapeChance)));
    }

    bribe() {
        this.escapeChance = 100;

        return this.messages(PRISON_BRIBE_SUCCESS).default(.41, .7);
    }

    make() {
        const luckyNumber = Math.floor(Math.random() * 100 - 1);

        this.success = luckyNumber <= this.escapeChance;

        this.msg = this.success ? this.successMsgs.randomOne() : this.failedMgs.randomOne();
        delete this.successMsgs;
        delete this.failedMgs;

        return this;
    }
}
