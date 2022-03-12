
const Controller = require("./controlle");

module.exports = class PlayerController extends Controller {


    constructor() {
        super('player');
    }


    restoreStamina(points) {
        return this.update({ stamina: { $lt: 100 } }, { $inc: { stamina: points } }, true)
    }

    releasePrisoners() {
        return this.update({ arrestRelease: { $lte: new Date() } }, { $set: { arrested: false, arrestRelease: null } }, true)
    }



    releasePrisonAttempt(player, releaseAttempt) {
        const inc = ['coins', 'respect', 'stamina'].reduce((a, e) => (a[e] = releaseAttempt[e], a), {});
        const set = { arrested: !releaseAttempt.success, arrestRelease: releaseAttempt.success ? null : releaseAttempt.arrestRelease };

        return this.modify(player._id, { $inc: inc, $set: set });
    }

}

