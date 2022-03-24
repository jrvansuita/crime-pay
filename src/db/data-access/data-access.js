const mongojs = require('mongojs');

module.exports = class DataAccess {

    constructor(entityName) {
        this.entity = require('../db')[entityName];

        this.promiseHandler = (resolve, reject) => {
            return (err, data) => {
                return err ? reject(err) : resolve(data);
            }
        }
    }

    findById(_id) {
        return new Promise((resolve, reject) => {
            this.entity.findOne({
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
            this.entity.find(query, this.promiseHandler(resolve, reject));
        });
    }

    all() {
        return this.findByQuery({});
    }

    modify(_id, data) {
        return new Promise((resolve, reject) => {
            this.entity.findAndModify({
                query: { _id: mongojs.ObjectId(_id) },
                update: { ...data },
                new: true
            }, this.promiseHandler(resolve, reject));
        });
    }


    updateAll(query, data, multi) {
        return new Promise((resolve, reject) => {
            this.entity.update(
                query,
                data,
                { multi: multi }
                , this.promiseHandler(resolve, reject));
        });
    }

    save(data) {
        return new Promise((resolve, reject) => {
            this.entity.save(data, this.promiseHandler(resolve, reject));
        });
    }


    remove(query) {
        return new Promise((resolve, reject) => {
            this.entity.remove(query, this.promiseHandler(resolve, reject));
        });
    }

    page(filter = {}, sort = {}, page = 0, count = 10) {
        return new Promise((resolve, reject) => {
            this.entity.find(filter).limit(count).skip(page * count).sort(sort).toArray(this.promiseHandler(resolve, reject))
        });


    }
}

