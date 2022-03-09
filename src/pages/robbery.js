
const RobberyMecanics = require("../mecanics/robbery");
const ThiefController = require("../controller/complex/thief");
const RobberyPlaceController = require("../controller/robbery-place");



module.exports = class RobberyPage {

    constructor() {
        this.robberyMecanics = new RobberyMecanics();
        this.thiefController = new ThiefController();
        this.robberyPlaceController = new RobberyPlaceController();
    }

    bind(app) {
        app.get('/robbery', (req, res) => {
            this.thiefController.get(process.env.USER_ID).then(thief => {
                req.session.player = thief;
                res.render('pages/robbery', { thief })
            });
        });

        app.get('/robbery-places', (req, res) => {
            this.robberyPlaceController.placesFor(req.session.player).then((places) => res.render('partials/robbery-places', { places }));
        });

        app.get('/robbery-form', (req, res) => {
            this.robberyPlaceController.placesDetails(req.query._id, req.session.player).then(place => {
                req.session.lastSelectedPlaceId = place._id;
                res.render('partials/robbery-form', { place })
            });
        });

        app.post('/robbery-submit', (req, res) => {
            this.robberyMecanics.submit(req.body.placeId, req.session.player).then(result => res.send(result));
        });
    }
}

