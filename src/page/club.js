const ClubMecanics = require("../mecanics/club");
const HookerController = require("../controller/hooker");
const Page = require("./page");

module.exports = class ClubPage extends Page {

    constructor(app) {
        super(app)
        this.clubMecanics = new ClubMecanics();
        this.hookerController = new HookerController();
    }

    routes() {
        this.page('/club').then(({ player, res }) => { res.render('pages/club', { player }) });

        this.get('/club-hookers').then(({ player, res }) => {
            return this.hookerController.for(player).then((hookers) => res.render('partials/club-hookers', { hookers }));
        });

        this.get('/club-form').then(({ player, req, res, session }) => {
            return this.hookerController.details(req.query._id, player).then(hooker => {
                session.lastClubItemSelected = hooker._id;
                res.render('partials/club-form', { data: hooker, player })
            });
        });

        this.post('/club-submit').then(({ player, req, res }) => {
            return this.clubMecanics.submit(req.body.hookerId, player).then(result => res.send(result))
        });

        this.page('/dev/hookers', false).then(({ req, res }) => {
            const PlayerEvolution = require("../dev/player-evolution");
            return new PlayerEvolution(req.query).hookers().then(result => { return res.render('dev/player-evolution', result); })
        });

    }
}