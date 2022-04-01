require('dotenv').config()
require('./src/lib/util').Prototypes();

const PlayerData = require('./src/db/data-access/player');





const MerchandiseScripts = require('./src/db/scripts/merchandise');
new MerchandiseScripts().createAll()



// new PlayerData().findById('6227a1043af3a53859484bb3').then(player => {

//     const PlayerMutation = require('./src/mutation/player');

//     console.log(new PlayerMutation(player).getWeapons());
// })

