const ClubMecanics = require("../mecanics/club");
const HookerController = require("../controller/hooker");
const PlayerController = require("../controller/player");


module.exports = class ClubPage {

    constructor() {
        this.clubMecanics = new ClubMecanics();
        this.playerController = new PlayerController();
        this.hookerController = new HookerController();
    }

    bind(app) {

        app.get('/club', (req, res) => {
            this.playerController.get(req.session.playerId).then(player => res.render('pages/club', { player }));
        });

        app.get('/club-hookers', (req, res) => {
            this.playerController.get(req.session.playerId).then(player => {
                this.hookerController.for(player).then((hookers) => res.render('partials/club-hookers', { hookers }));
            });
        });

        app.get('/club-form', (req, res) => {
            this.playerController.get(req.session.playerId).then(player => {
                this.hookerController.details(req.query._id, player).then(hooker => {
                    req.session.lastClubItemSelected = hooker._id;
                    res.render('partials/club-form', { data: hooker, player })
                });
            });
        });

        app.post('/club-submit', (req, res) => {
            this.playerController.get(req.session.playerId).then(player => {

                this.clubMecanics.submit(req.body.hookerId, player)
                    .then(result => res.send(result))
                    .catch((e) => res.status(500).send(e.message))

            });
        });


        app.get('/dev/hookers', (req, res) => {
            const PlayerEvolution = require("../dev/player-evolution");
            new PlayerEvolution(req.query).hookers().then(result => { return res.render('dev/player-evolution', result); })
        });

    }
}