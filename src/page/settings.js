const SettingsMechanics = require("../mechanics/settings");
const Page = require("./page");

module.exports = class SettingsPage extends Page {

    constructor(app) {
        super(app)
        this.settingsMechanics = new SettingsMechanics();
    }

    routes() {
        this.page('/settings').then(({ res, player }) => { res.render('pages/settings', { player }) });

        this.get('/player-status').then(({ res, player }) => { res.render('partials/player/main', { player }) });

        this.post('/settings-reset').then(({ req, res, player }) => {
            return this.settingsMechanics.setState(player, req.body.multiplier || 1).then(result => res.send(result));
        });

        this.post('/settings-reset-prisoner').then(({ res, player }) => {
            return this.settingsMechanics.setPrisoner(player).then(result => res.send(result));
        });
    }
}