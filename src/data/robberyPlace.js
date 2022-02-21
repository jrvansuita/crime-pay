const mongojs = require('mongojs')
const data = require('../db/db').robberyplace;


module.exports = class RobberyPlace {


    findAll(callback) {
        data.find({}, (err, data) => {
            callback(err, this.sortByDificulty(data));
        });
    }


    sortByDificulty(places) {
        places.sort(function (a, b) { return a.dificulty - b.dificulty });
        return places;
    }


}