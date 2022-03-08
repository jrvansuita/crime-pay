

require('dotenv').config()

const ThiefController = require('../crims/src/controller/complex/thief.js');

new ThiefController().get('620bd7d3167e2e95193329e1').then((thief) => {
    const RobberyMecanics = require('./src/mecanics/robbery')
    return new RobberyMecanics().submit('62183a0db9c532e1110623ea', thief)
}).then((data) => {
    console.log('Int: ' + data.result.intelligence + ' Dex: ' + data.result.dexterity + ' Str: ' + data.result.strength + ' Resp: ' + data.result.respect);
    return;
})



