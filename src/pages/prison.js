const ThiefController = require("../controller/complex/thief");
const PrisonMecanics = require("../mecanics/prison");


module.exports = class PrisonPage {

    constructor() {
        this.prisonMecanics = new PrisonMecanics();
        this.thiefController = new ThiefController();
    }

    bind(app) {

        app.get('/prison', (req, res) => {
            this.thiefController.get(req.session.playerId)
                .then((thief) => {
                    res.render('pages/prison', { thief, stats: this.prisonMecanics.statsFor(thief) });
                })
        });

        app.post('/escape-attempt', (req, res) => {
            this.thiefController.get(req.session.playerId).then((thief) => {
                return this.prisonMecanics.escape(thief).then(result => res.send(result))
                    .catch((e) => res.status(500).send(e.message));
            });
        });

        app.post('/bribe-attempt', (req, res) => {
            this.thiefController.get(req.session.playerId).then((thief) => {
                return this.prisonMecanics.bribe(thief).then(result => res.send(result))
                    .catch((e) => res.status(500).send(e.message));
            });
        });



    }
}