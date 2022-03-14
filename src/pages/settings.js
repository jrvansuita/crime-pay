const SettingsMecanics = require("../mecanics/settings");

module.exports = class SettingsPage {

    constructor() {
        this.settingsMecanics = new SettingsMecanics();
    }

    bind(app) {
        app.get('/settings', (req, res) => {
            res.render('pages/settings')
        });

        app.post('/settings-reset', (req, res) => {
            this.settingsMecanics.setInicialState(req.session.playerId).then(result => res.send(result));
        });

        app.post('/settings-reset-prisoner', (req, res) => {
            this.settingsMecanics.setPrisoner(req.session.playerId).then(result => res.send(result));
        });

        app.post('/settings-reset-good', (req, res) => {
            this.settingsMecanics.setGoodRespectPlayer(req.session.playerId).then(result => res.send(result));
        });

    }
}