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
            this.settingsMecanics.reset(req.session.playerId).then(result => res.send(result));
        });



    }
}