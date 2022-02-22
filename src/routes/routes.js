const RobberyPage = require('../pages/robbery');



module.exports = class Routes {
    constructor(app) {
        this.app = app;
    }

    init() {
        const robberyPage = new RobberyPage();

        this.app.get('/robbery', function (req, res) {
            robberyPage.loadPage((data) => {
                res.render('pages/robbery', data);
            });
        });

        this.app.get('/robbery-form', function (req, res) {
            robberyPage.getPlaceDetails(req.query._id, (data) => {
                res.render('partials/robbery-form', data);
            })
        });

    }

}