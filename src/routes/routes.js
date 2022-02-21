const RobberyPage = require('../pages/robbery');



module.exports = class Routes {
    constructor(app) {
        this.app = app;
    }

    init() {
        const robberyPage = new RobberyPage();

        this.app.get('/robbery', function (req, res) {

            robberyPage.load((data) => {

                res.render('pages/robbery', data);
            });

        });

    }

}