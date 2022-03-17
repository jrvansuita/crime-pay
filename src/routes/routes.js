const ClubPage = require('../pages/club');
const PrisonPage = require('../pages/prison');
const RobberyPage = require('../pages/robbery');
const SettingsPage = require('../pages/settings');
const MarketPage = require('../pages/market');
const MiddleRules = require('./middle-rules');



module.exports = {
    bind(app) {

        new MiddleRules().bind(app);

        app.get('/', (req, res) => {
            res.redirect('/robbery');
        });

        new RobberyPage().bind(app);
        new SettingsPage().bind(app);
        new PrisonPage().bind(app);
        new ClubPage().bind(app);
        new MarketPage().bind(app);


    }

}