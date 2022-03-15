const MarketMecanics = require("../mecanics/market");
const PlayerController = require("../controller/player");

module.exports = class MarketPage {

    constructor() {
        this.marketMecanics = new MarketMecanics();
        this.playerController = new PlayerController();
    }

    bind(app) {


        app.get('/market', (req, res) => {
            this.playerController.get(req.session.playerId).then(player => res.render('pages/market', { player }));
        });


    }
}