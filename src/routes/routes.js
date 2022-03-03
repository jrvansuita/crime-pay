const RobberyPage = require('../pages/robbery');



module.exports = class Routes {
    constructor(app) {
        this.app = app;
    }

    init() {
        const robberyPage = new RobberyPage();

        this.app.get('/robbery', function (req, res) {
            robberyPage.load().then(thief => {
                req.session.player = thief;
                res.render('pages/robbery', { thief })
            });
        });

        this.app.get('/robbery-places', function (req, res) {
            robberyPage.places(req.session.player).then((places) => res.render('partials/robbery-places', { places }));
        });

        this.app.get('/robbery-form', function (req, res) {
            robberyPage.place(req.query._id, req.session.player).then(place => res.render('partials/robbery-form', { place }));
        });

        this.app.post('/robbery-submit', function (req, res) {
            robberyPage.submit(req.body.placeId, req.session.player).then(result => res.send(result));
        });

    }

}