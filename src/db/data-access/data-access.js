const mongo = require('mongojs');

module.exports = class DataAccess {

    constructor(entityName) {
        this.entity = require('../db')[entityName];

        this.promiseHandler = (resolve, reject) => {
            return (err, data) => {
                return err ? reject(err) : resolve(data);
            }
        }
    }

    all() {
        return this.find();
    }

    findById(_id) {
        return this.find({ _id: mongo.ObjectId(_id) });
    }

    findByIds(_ids) {

        return this.find({
            _id: { $in: _ids.map((e) => mongo.ObjectId(e)) }
        });
    }

    find(query = {}) {
        return new Promise((resolve, reject) => {
            this.entity.find(query, (err, data) => {
                data = data[1] ? data : data[0];

                return err ? reject(err) : resolve(this.onAfterFind(data));
            });
        });
    }

    get(_id) {
        return new Promise((resolve, reject) => {
            this.entity.find({ _id: mongo.ObjectId(_id) }, this.promiseHandler(resolve, reject));
        });
    }

    onAfterFind(data) {
        //Not implemented Here, look child
        return data;
    }

    modify(_id, data) {
        return new Promise((resolve, reject) => {
            this.entity.findAndModify({
                query: { _id: mongo.ObjectId(_id) },
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

    removeById(id) {
        return this.remove({ _id: mongo.ObjectId(id.toString()) });
    }

    page(filter = {}, sort = {}, page = 0, count = 10) {
        return new Promise((resolve, reject) => {
            this.entity.find(filter).limit(count).skip(page * count).sort(sort).toArray(this.promiseHandler(resolve, reject))
        });
    }
}

