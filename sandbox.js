
require('dotenv').config()

const MerchandiseScripts = require('./src/db/scripts/merchandise')
new MerchandiseScripts().createAll()



