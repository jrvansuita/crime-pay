const ClubPage = require('../page/club');
const PrisonPage = require('../page/prison');
const RobberyPage = require('../page/robbery');
const SettingsPage = require('../page/settings');
const MarketPage = require('../page/market');
const RouteRules = require('./rules');

module.exports = {

    bind(app) {
        const rules = new RouteRules(app);

        rules.begin();

        new RobberyPage(app).routes();
        new PrisonPage(app).routes();
        new ClubPage(app).routes();
        new MarketPage(app).routes();
        new SettingsPage(app).routes();

        rules.end();
    }

}