const DataAccess = require("./data-access");

module.exports = class WeaponData extends DataAccess {

    constructor() {
        super('weapon');
    }

    findByUser(userId) {
        return this.findByQuery({
            userId: userId
        });
    }

}