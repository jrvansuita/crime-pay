const mongojs = require('mongojs')
const data = require('../db/db').robberyplace;


module.exports = class Place {


    find(id, callback) {
        data.findOne({ _id: mongojs.ObjectId(id) }, callback);
    }

    findAll(callback) {
        data.find({}, callback);
    }




}