const schedule = require('node-schedule');
const PlayerController = require('../controller/player');

const job = schedule.scheduleJob('59 * * * *', function () {
    new PlayerController().restoreStamina(1);
});

