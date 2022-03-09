const ClubPage = require('../pages/club');
const PrisonPage = require('../pages/prison');
const RobberyPage = require('../pages/robbery');
const SettingsPage = require('../pages/settings');
const MarketPage = require('../pages/market');



module.exports = {
    bind(app) {
        new RobberyPage().bind(app);
        new SettingsPage().bind(app);
        new PrisonPage().bind(app);
        new ClubPage().bind(app);
        new MarketPage().bind(app);
    }

}