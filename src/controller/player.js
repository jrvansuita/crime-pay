const Controller = require("./controlle");

module.exports = class PlayerController extends Controller {


    constructor() {
        super('player');
    }


    restoreStamina(points) {
        return this.update({ stamina: { $lt: 100 } }, { $inc: { stamina: points } }, true)
    }



}

