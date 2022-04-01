const Page = require("./page");
const HistoricMechanics = require("../mechanics/historic");

module.exports = class HistoricPage extends Page {

    constructor(app) {
        super(app)
        this.historicMechanics = new HistoricMechanics();
    }

    routes() {
        this.page('/historic').then(({ res, player }) => { res.render('pages/historic', { player }) });

        this.get('/historic-items').then(({ req, res, player }) => {
            return this.historicMechanics.page(player, req.query?.filter, req.query.page).then((data) => {
                return res.render('partials/historic-items', { items: data })
            });
        });
    }
}