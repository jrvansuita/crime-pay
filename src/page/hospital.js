const HospitalMechanics = require("../mechanics/hospital");
const PrisonMechanics = require("../mechanics/prison");
const Page = require("./page");


module.exports = class HospitalPage extends Page {

    constructor(app) {
        super(app);

        this.hospitalMechanics = new HospitalMechanics();
    }

    routes() {
        this.page('/hospital').then(({ player, res }) => {
            res.render('pages/hospital', { player, ...this.hospitalMechanics.for(player) });
        })

        this.post('/hospital-regenerate').then(({ player, res }) => {
            return this.hospitalMechanics.regenerate(player).then(result => res.send(result))
        })
    }
}