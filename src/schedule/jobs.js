const schedule = require('node-schedule');
const PlayerData = require('../db/data-access/player');



//Update +1 stamina point every hour for all player, even the arrested ones
schedule.scheduleJob('59 * * * *', function () {
    const controller = new PlayerData();
    controller.restoreStamina(1);
    controller.clearIntoxication(1);
});

//Release Player arrested
schedule.scheduleJob('1 0 * * * *', function () {
    new PlayerData().releasePrisoners();
});