const Controller = require("./controller");

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