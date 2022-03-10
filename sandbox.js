

//require('dotenv').config()

const moment = require("moment");

//const ThiefController = require('../crims/src/controller/complex/thief.js');



console.log(moment().add(1, 'days').minutes(0).seconds(0).toDate());
console.log(new Date(new Date().setDate(new Date().getDate() + 1)));