const mongojs = require('mongojs');

module.exports = class Controller {

    constructor(entityName) {
        this.dataAccess = require('../db/db')[entityName];
        this.promiseHandler = (resolve, reject) => {
            return (err, data) => {
                return err ? reject(err) : resolve(data);
            }
        }
    }

    findById(_id) {
        return new Promise((resolve, reject) => {
            this.dataAccess.findOne({
                _id: mongojs.ObjectId(_id)
            }, this.promiseHandler(resolve, reject));
        });
    }

    findByIds(_ids) {
        return this.findByQuery({
            _id: { $in: _ids.map((e) => mongojs.ObjectId(e)) }
        });
    }

    findByQuery(query) {
        return new Promise((resolve, reject) => {
            this.dataAccess.find(query, this.promiseHandler(resolve, reject));
        });
    }

    save(instance) {
        return new Promise((resolve, reject) => {
            this.dataAccess.save(instance, this.promiseHandler(resolve, reject));
        });
    }

}

