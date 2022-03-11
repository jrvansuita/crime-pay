const ThiefController = require("../controller/complex/thief");
const PrisonMecanics = require("../mecanics/prison");

module.exports = class PrisonPage {

    constructor() {
        this.prisonMecanics = new PrisonMecanics();
        this.thiefController = new ThiefController();
    }

    bind(app) {

        app.get('/prison', (req, res) => {
            this.thiefController.get(req.session.playerId).then(thief => res.render('pages/prison', { thief }));
        });


    }
}