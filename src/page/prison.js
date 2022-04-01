const PrisonMechanics = require("../mechanics/prison");
const Page = require("./page");


module.exports = class PrisonPage extends Page {

    constructor(app) {
        super(app);
        this.prisonMechanics = new PrisonMechanics();
    }

    routes() {
        this.page('/prison').then(({ player, res }) => {
            res.render('pages/prison', { player, ...this.prisonMechanics.for(player) });
        })

        this.post('/escape-attempt').then(({ player, res }) => {
            return this.prisonMechanics.escape(player).then(result => res.send(result))
        })

        this.post('/bribe-attempt').then(({ player, res }) => {
            return this.prisonMechanics.bribe(player).then(result => res.send(result))
        })
    }
}