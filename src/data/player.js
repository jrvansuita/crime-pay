const mongojs = require('mongojs');
const playerData = require('../db/db').player;

const Weapon = require('../data/weapon');



module.exports = class Player {

    find(id, callback) {
        // find a document using a native ObjectId
        playerData.findOne({
            _id: mongojs.ObjectId(id)
        }, callback);
    }

    get(id, callback) {
        this.find(id, (err, player) => {

            if (player) {
                const weapon = new Weapon();
                weapon.findAll(player.equipedWeapons, (err, weapons) => {
                    callback(err, { player, weapons });
                })
            }
        });
    }

}


// // find everything
// player.find(function (err, docs) {
//     const player01 = docs[0];

//     console.log(typeof player01._id);

//     player01.brains = 21;

//     player.save(player01, function () {
//         console.log('complete');
//     })
// })
