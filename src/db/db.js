
const mongojs = require('mongojs')

const db = mongojs(process.env.CONN_DB, [])


db.on('error', function () {
    //Not implemented
})

db.on('connect', function () {
    //Not implemented


})


module.exports = db;




