
const RobberyMechanics = require("../mechanics/robbery");
const PlaceController = require("../controller/place");
const Page = require("./page");

module.exports = class RobberyPage extends Page {

    constructor(app) {
        super(app);
        this.robberyMechanics = new RobberyMechanics();
        this.placeController = new PlaceController();
    }

    routes() {
        this.page('/robbery').then(({ player, res }) => res.render('pages/robbery', { player }));

        this.get('/robbery-places').then(({ player, res }) => {
            return this.placeController.for(player).then((places) => res.render('partials/robbery-places', { places }));
        });

        this.get('/robbery-form').then(({ player, req, res, session }) => {
            return this.placeController.details(req.query.id, player).then(place => {
                res.render('partials/robbery-form', { place, player })
            });
        });

        this.post('/robbery-submit').then(({ player, req, res }) => {
            return this.robberyMechanics.submit(req.body.id, player, req.body.fullStamina).then(result => res.send(result))
        });

        this.get('/dev/robberies', false).then(({ req, res }) => {
            const PlayerEvolution = require("../dev/player-evolution");
            new PlayerEvolution(req.query).places().then(result => { return res.render('dev/player-evolution', result); })
        });
    }
}

