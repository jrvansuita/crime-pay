const Controller = require("./controlle");

module.exports = class WeaponController extends Controller {

    constructor() {
        super('weapon');
    }

    findByUser(userId) {
        return this.findByQuery({
            userId: userId
        });
    }

}