const mongojs = require('mongojs');
const playerData = require('../db/db').player;

const Weapon = require('./weapon.old');



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
                    player.weapons = weapons;
                    callback(err, player);
                })
            }
        });
    }

    save(player, callback) {
        playerData.save(player, callback)
    }

}

