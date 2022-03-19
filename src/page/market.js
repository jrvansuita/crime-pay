const MarketMecanics = require("../mecanics/market");
const Page = require("./page");

module.exports = class MarketPage extends Page {

    constructor(app) {
        super(app);
        this.marketMecanics = new MarketMecanics();
    }

    routes() {
        this.page('/market').then(({ player, res }) => res.render('pages/market', { player }));
    }
}