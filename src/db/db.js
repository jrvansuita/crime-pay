
const mongojs = require('mongojs')
const PlaceScripts = require('./scripts/places');

const Command = require('./commands')

const db = mongojs(process.env.CONN_DB, [])


db.on('error', function () {
    //Not implemented
})

db.on('connect', function () {
    //Not implemented

    // console.log('Command OK');
    // new Command(db).renameField('place', 'x', 'name')

    //new PlaceScripts().assertDifficulties()


})






module.exports = db;




