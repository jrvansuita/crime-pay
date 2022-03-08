const RobberyPage = require('../pages/robbery');
const SettingsPage = require('../pages/settings');



module.exports = {
    bind(app) {
        new RobberyPage().bind(app);
        new SettingsPage().bind(app);
    }

}