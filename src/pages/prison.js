
const PlayerController = require("../controller/player");
const PrisonMecanics = require("../mecanics/prison");


module.exports = class PrisonPage {

    constructor() {
        this.prisonMecanics = new PrisonMecanics();
        this.playerController = new PlayerController();
    }

    bind(app) {

        app.get('/prison', (req, res) => {
            this.playerController.get(req.session.playerId)
                .then((player) => {
                    res.render('pages/prison', { player, ...this.prisonMecanics.statsFor(player) });
                })
        });

        app.post('/escape-attempt', (req, res) => {
            this.playerController.get(req.session.playerId).then((player) => {
                return this.prisonMecanics.escape(player).then(result => res.send(result))
                    .catch((e) => res.status(500).send(e.message));
            });
        });

        app.post('/bribe-attempt', (req, res) => {
            this.playerController.get(req.session.playerId).then((player) => {
                return this.prisonMecanics.bribe(player).then(result => res.send(result))
                    .catch((e) => res.status(500).send(e.message));
            });
        });



    }
}