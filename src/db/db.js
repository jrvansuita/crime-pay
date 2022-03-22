const mongojs = require('mongojs')

const db = mongojs(process.env.CONN_DB, [])


db.on('error', function () {
    //Not implemented
})

db.on('connect', function () {
    //Create DataBase Elements
    //new HookerScripts().createAll();
    //new DrugScripts().createAll()
    //new PlaceScripts().createAll();


    //Rename a collection field example
    // new Command(db).renameField('place', 'x', 'name')
})

module.exports = db;




