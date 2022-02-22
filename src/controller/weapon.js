const mongojs = require('mongojs')
const weaponData = require('../db/db').weapon;


module.exports = class Weapon {

    find(id, callback) {
        weaponData.findOne({
            _id: mongojs.ObjectId(id)
        }, callback);
    }

    findAll(ids, callback) {
        weaponData.find({
            '_id': { $in: ids.map((each) => mongojs.ObjectId(each)) }
        }, callback);

    }

    findAllByUser(userId, callback) {
        weaponData.find({
            userId: userId
        }, callback);
    }

}