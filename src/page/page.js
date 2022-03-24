
const PlayerData = require("../db/data-access/player");

module.exports = class Page {

    constructor(app) {
        this.app = app;

        this.playerData = new PlayerData();
    }

    findPlayer(req) {
        return this.playerData.get(req.session.playerId).then((player) => {
            return player;
        });
    }

    bindPath(method, path, loadPlayer = true, handleReject = true) {
        const result = new RequestResult();

        this.app[method](path, (req, res) => {
            if (loadPlayer) {
                this.findPlayer(req)
                    .then((player) => {
                        req.session.player = player;
                        return result.resolve({ player, req, res, session: req.session });
                    })
                    .catch(handleReject ? (e) => {
                        console.error(e);
                        res.status(500).send(e.message)
                    } : result.reject(e));
            } else {
                result.resolve({ req, res });
            }
        });

        return result;
    }

    page(...params) {
        return this.bindPath('get', ...params);
    }

    get(...params) {
        return this.bindPath('get', ...params);
    }

    post(...params) {
        return this.bindPath('post', ...params);
    }
}


class RequestResult {

    resolve(...params) {
        try {
            if (this.onThen) return this.onThen(...params)
        } catch (e) {
            console.error(e);
            this.reject(e);
        }
    }

    then(callback) {
        this.onThen = callback;
        return this;
    }

    reject(error) {
        if (this.onCatch) this.onCatch(error)
    }

    catch(callback) {
        this.onCatch = callback;
        return this;
    }
}