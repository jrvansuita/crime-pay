const ClubPage = require('../page/club');
const PrisonPage = require('../page/prison');
const RobberyPage = require('../page/robbery');
const SettingsPage = require('../page/settings');
const MarketPage = require('../page/market');
const RouteRules = require('./rules');
const HistoricPage = require('../page/historic');
const InventoryPage = require('../page/inventory');
const HospitalPage = require('../page/hospital');

module.exports = {

    bind(app) {
        const rules = new RouteRules(app);

        rules.begin();

        new RobberyPage(app).routes();
        new PrisonPage(app).routes();
        new ClubPage(app).routes();
        new MarketPage(app).routes();
        new HistoricPage(app).routes();
        new SettingsPage(app).routes();
        new InventoryPage(app).routes();
        new HospitalPage(app).routes();

        rules.end();
    }

}