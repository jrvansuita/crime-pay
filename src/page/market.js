const MerchandiseController = require("../controller/merchandise");
const MarketMecanics = require("../mecanics/market");
const Page = require("./page");

module.exports = class MarketPage extends Page {

    constructor(app) {
        super(app);
        this.marketMecanics = new MarketMecanics();
        this.merchandiseController = new MerchandiseController();

    }

    routes() {
        this.page('/market').then(({ player, res }) => res.render('pages/market', { player }));

        this.get('/market-merchandise').then(({ player, res }) => {
            return this.merchandiseController.for(player).then((merchandises) => res.render('partials/market-merchandises', { merchandises }));
        });

        this.get('/market-form').then(({ player, req, res, session }) => {
            return this.merchandiseController.details(req.query.id, player).then(data => {
                session.lastMarketItemSelected = data._id;
                res.render('partials/market-form', { data, player })
            });
        });


        this.page('/dev/merchandises', false).then(({ req, res }) => {
            const PlayerEvolution = require("../dev/player-evolution");
            return new PlayerEvolution(req.query).merchandises().then(result => { return res.render('dev/player-evolution', result); })
        });
    }
}