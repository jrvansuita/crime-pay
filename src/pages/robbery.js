
const RobberyMecanics = require("../mecanics/robbery");

const PlaceController = require("../controller/place");
const PlayerController = require("../controller/player");



module.exports = class RobberyPage {

    constructor() {
        this.robberyMecanics = new RobberyMecanics();
        this.playerController = new PlayerController();
        this.placeController = new PlaceController();
    }

    bind(app) {
        app.get('/robbery', (req, res) => {
            this.playerController.get(req.session.playerId).then(player => res.render('pages/robbery', { player }));
        });

        app.get('/robbery-places', (req, res) => {
            this.playerController.get(req.session.playerId).then(player => {
                this.placeController.for(player).then((places) => res.render('partials/robbery-places', { places }));
            });
        });

        app.get('/robbery-form', (req, res) => {
            this.playerController.get(req.session.playerId).then(player => {
                this.placeController.details(req.query._id, player).then(place => {
                    req.session.lastPlaceItemSelected = place._id;
                    res.render('partials/robbery-form', { place, player })
                });
            });
        });

        app.post('/robbery-submit', (req, res) => {
            this.playerController.get(req.session.playerId).then(player => {
                this.robberyMecanics.submit(req.body.placeId, player)
                    .then(result => res.send(result))
                    .catch((e) => res.status(500).send(e.message))
            });
        });
    }
}

