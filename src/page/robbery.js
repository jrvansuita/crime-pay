
const RobberyMecanics = require("../mecanics/robbery");
const PlaceController = require("../controller/place");
const Page = require("./page");

module.exports = class RobberyPage extends Page {

    constructor(app) {
        super(app);
        this.robberyMecanics = new RobberyMecanics();
        this.placeController = new PlaceController();
    }

    routes() {
        this.page('/robbery').then(({ player, res }) => res.render('pages/robbery', { player }));

        this.get('/robbery-places').then(({ player, res }) => {
            return this.placeController.for(player).then((places) => res.render('partials/robbery-places', { places }));
        });

        this.get('/robbery-form').then(({ player, req, res, session }) => {
            return this.placeController.details(req.query._id, player).then(place => {
                session.lastPlaceItemSelected = place._id;
                res.render('partials/robbery-form', { place, player })
            });
        });

        this.post('/robbery-submit').then(({ player, req, res }) => {
            return this.robberyMecanics.submit(req.body.placeId, player).then(result => res.send(result))
        });

        this.get('/dev/robberies', false).then(({ req, res }) => {
            const PlayerEvolution = require("../dev/player-evolution");
            new PlayerEvolution(req.query).places().then(result => { return res.render('dev/player-evolution', result); })
        });
    }
}

