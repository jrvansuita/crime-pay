const mongojs = require('mongojs');
const robberyResultData = require('../db/db').robberyresult;




module.exports = class RobberyResultController {

    find(id, callback) {
        robberyResultData.findOne({
            _id: mongojs.ObjectId(id)
        }, callback);
    }


    save(result, callback) {
        robberyResultData.save(result, callback)
    }

}

