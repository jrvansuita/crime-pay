
const PlayerData = require("../db/data-access/player");

module.exports = class Page {

    constructor(app) {
        this.app = app;

        this.playerData = new PlayerData();
    }

    sessionClear(req) {
        this.applySession({ req });
        req.session = null;
    }

    applySession({ req, player = null, res }) {
        req.session.playerId = player?._id?.toString();
        req.session.player = player;

        if (res) res.locals.session = req.session;
    }

    findPlayer(req) {
        return this.playerData.findById(req.session.playerId).then((player) => {
            return player;
        });
    }

    bindPath(method, path, loadPlayer = true, handleReject = true) {
        const result = new RequestResult();

        this.app[method](path, (req, res) => {

            if (loadPlayer) {
                this.findPlayer(req)
                    .then((player) => {
                        this.applySession({ req, player, res })
                        return result.resolve({ player, req, res, session: req.session });
                    })
                    .catch(handleReject ? (e) => {
                        Error.handler(e)
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


class Error {
    static handler(e) {
        console.error(e);
        return e;
    }
}

class RequestResult {

    resolve(...params) {
        try {
            if (this.onThen) return this.onThen(...params)
        } catch (e) {
            Error.handler(e);
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