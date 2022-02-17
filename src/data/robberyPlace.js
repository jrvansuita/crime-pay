const mongojs = require('mongojs')
const data = require('../db/db').robberyplace;


module.exports = class RobberyPlace {


    findAll(callback) {
        data.find({}, callback);

    }


}