const SettingsMecanics = require("../mecanics/settings");
const Page = require("./page");

module.exports = class SettingsPage extends Page {

    constructor(app) {
        super(app)
        this.settingsMecanics = new SettingsMecanics();
    }

    routes() {
        this.page('/settings').then(({ res }) => { res.render('pages/settings') });

        this.post('/settings-reset').then(({ req, res, player }) => {
            return this.settingsMecanics.setState(player, req.body.multiplier || 1).then(result => res.send(result));
        });

        this.post('/settings-reset-prisoner').then(({ res, player }) => {
            return this.settingsMecanics.setPrisoner(player).then(result => res.send(result));
        });
    }
}