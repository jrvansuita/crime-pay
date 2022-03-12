const schedule = require('node-schedule');
const PlayerController = require('../controller/player');



//Updade +1 stamina point every hour for all player, evern the arrested ones
schedule.scheduleJob('59 * * * *', function () {
    new PlayerController().restoreStamina(1);
});

//Release Player arrested
schedule.scheduleJob('1 0 * * * *', function () {
    new PlayerController().releasePrisoners();
});