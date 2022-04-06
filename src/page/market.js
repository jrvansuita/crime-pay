const MarketController = require("../controller/market");
const MerchandiseController = require("../controller/merchandise");
const MarketMechanics = require("../mechanics/market");
const Page = require("./page");

module.exports = class MarketPage extends Page {

    constructor(app) {
        super(app);
        this.marketMechanics = new MarketMechanics();
        this.merchandiseController = new MerchandiseController();
        this.marketController = new MarketController();
    }

    findController(req) {
        return req.query.newItem ? this.merchandiseController : this.marketController;
    }

    findSubmit(req) {
        return req.body.newItem ? this.marketMechanics.merchandise() : this.marketMechanics.weapon();
    }

    routes() {
        this.page('/market').then(({ player, res }) => res.render('pages/market', { player }));

        this.get('/market-merchandise').then(({ player, res }) => {
            return this.merchandiseController.for(player).then((items) => res.render('partials/market-items', { items }));
        });

        this.get('/market-weapons').then(({ res, player }) => {
            return this.marketController.for(player).then((items) => res.render('partials/market-items', { items }));
        });

        this.get('/market-form').then(({ player, req, res, session }) => {
            return this.findController(req).details(req.query.id, player).then(data => {
                res.render('partials/market-form', { data, player })
            });
        });

        this.post('/market-submit').then(({ player, req, res }) => {
            return this.findSubmit(req).submit(req.body.id, player).then(result => res.send(result))
        });

        this.page('/dev/merchandises', false).then(({ req, res }) => {
            const PlayerEvolution = require("../dev/player-evolution");
            return new PlayerEvolution(req.query).merchandises().then(result => { return res.render('dev/player-evolution', result); })
        });

    }
}