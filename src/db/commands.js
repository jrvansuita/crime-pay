module.exports = class Command {

    constructor(db) {
        this.db = db;
    }

    renameField(collection, oldName, newName) {

        const data = {};
        data[oldName] = newName;

        this.db[collection].updateMany(
            {},
            { $rename: data }
        )
    }
}