const PrisonMecanics = require("../mecanics/prison");
const Page = require("./page");


module.exports = class PrisonPage extends Page {

    constructor(app) {
        super(app);
        this.prisonMecanics = new PrisonMecanics();
    }

    routes() {
        this.page('/prison').then(({ player, res }) => {
            res.render('pages/prison', { player, ...this.prisonMecanics.for(player) });
        })

        this.post('/escape-attempt').then(({ player, res }) => {
            return this.prisonMecanics.escape(player).then(result => res.send(result))
        })

        this.post('/bribe-attempt').then(({ player, res }) => {
            return this.prisonMecanics.bribe(player).then(result => res.send(result))
        })
    }
}