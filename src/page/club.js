const ClubMechanics = require("../mechanics/club");
const HookerController = require("../controller/hooker");
const Page = require("./page");
const DrugController = require("../controller/drug");

module.exports = class ClubPage extends Page {

    constructor(app) {
        super(app)
        this.clubMechanics = new ClubMechanics();
        this.drugController = new DrugController();
        this.hookerController = new HookerController();
    }

    routes() {
        this.page('/club').then(({ player, res }) => { res.render('pages/club', { player }) });

        this.get('/club-hookers').then(({ player, res }) => {
            return this.hookerController.for(player).then((hookers) => res.render('partials/club-hookers', { hookers }));
        });

        this.get('/club-drugs').then(({ player, res }) => {
            return this.drugController.for(player).then((drugs) => res.render('partials/club-drugs', { drugs }));
        });

        this.get('/club-form').then(({ player, req, res, session }) => {
            const dispatcher = req.query.type == 'hooker' ? this.hookerController : this.drugController;

            return dispatcher.details(req.query.id, player).then(element => {
                res.render('partials/club-form', { data: element, player })
            });
        });

        this.post('/club-submit').then(({ player, req, res }) => {
            return this.clubMechanics.submit(req.body.id, req.body.type, player).then(result => res.send(result))
        });

        this.page('/dev/hookers', false).then(({ req, res }) => {
            const PlayerEvolution = require("../dev/player-evolution");
            return new PlayerEvolution(req.query).hookers().then(result => { return res.render('dev/player-evolution', result); })
        });

        this.page('/dev/drugs', false).then(({ req, res }) => {
            const PlayerEvolution = require("../dev/player-evolution");
            return new PlayerEvolution(req.query).drugs().then(result => { return res.render('dev/player-evolution', result); })
        });

    }
}