const PlayerData = require("../db/data-access/player");
const PlaceController = require("../controller/place");
const HookerController = require("../controller/hooker");
const DrugController = require("../controller/drug");
const MerchandiseController = require("../controller/merchandise");
const PlayerMutation = require("../mutation/player");

module.exports = class PlayerEvolution {


    constructor({ all, stats, id }) {
        this.modelPlayerId = id || "6230c97f40a4ff252550104f";
        this.playerData = new PlayerData();

        this.showAll = all;
        this.mStats = stats;

        if (typeof stats === 'number')
            this.mStats = stats.toString();

    }

    multiplyStats(player, multiplier) {
        player.name = multiplier + 'x';

        ['coins', 'respect', 'intelligence', 'dexterity', 'strength'].forEach(attr => {
            player[attr] = parseInt(player[attr]) * parseInt(multiplier);
        });

        return player;
    }

    findPlayers() {
        return this.playerData.findById(this.modelPlayerId).then(player => {
            var players = [player];

            this.mStats?.split('-').forEach(m => {
                players.push(this.multiplyStats(new PlayerMutation(player), m));
            });

            return players;
        });
    }

    findData(controller, players) {
        var data = [];

        const execute = (index) => {
            return controller.for(players[index], this.showAll).then((eachGroup) => {
                data.push({ player: players[index], group: eachGroup })
                return (++index) < players.length ? execute(index) : data;
            })
        }

        return execute(0).then(data => { return { data: data } });
    }

    load(controller, attributes) {
        return this.findPlayers().then(players => {
            return this.findData(controller, players);
        }).then((result) => {
            return { ...result, attributes }
        })
    }

    merchandises() {
        const attributes = [
            'playerFactor',
            'coins',
            'respect',
            'gainPercentage',
            'intelligence',
            'dexterity',
            'strength',
        ];

        return this.load(new MerchandiseController(), attributes);
    }

    hookers() {
        const attributes = [
            'rarity',
            'coinsFactor',
            'coins',
            'respect',
            'stamina',
            'intoxication',
            'failChance',
            'jailChance',
        ];

        return this.load(new HookerController(), attributes);
    }

    drugs() {
        const attributes = [
            'rarity',
            'coinsFactor',
            'coins',
            'respect',
            'stamina',
            'intoxication',
            'failChance',
            'jailChance',
        ];

        return this.load(new DrugController(), attributes);
    }

    places() {
        const attributes = [
            'difficulty',
            'successChance',
            'playerFactor',
            'successFactor',
            'coinsHolderBonus',
            'coinsReward',
            'coinsLoss',
            'respect',
            'staminaCost',
            'intelligence',
            'dexterity',
            'strength',
        ];

        return this.load(new PlaceController(), attributes);
    }




}