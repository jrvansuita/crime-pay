require('dotenv').config();
require('./src/schedule/jobs');

var express = require('express');

var app = express();

app.locals.moment = require('moment');

//== Body Parser Post ==//
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//==========//


//== Static Files ==/
app.use('/img', express.static('front/img'));
app.use('/css', express.static('front/css'));
app.use('/js', express.static('front/js'));
app.use('/pages', express.static('front/js'));

var path = require('path')
app.set('views', path.join(__dirname, '/front/views'))

app.set('view engine', 'ejs');
//==========//



//== Session ==//
const cookieSession = require('cookie-session');
const tenDays = 1000 * 60 * 60 * 24 * 10;

app.use(cookieSession({
    name: 'crime-pay',
    secret: process.env.SESS,
    maxAge: tenDays
})
);


//Making session visible in all ejs files
app.use(function (req, res, next) {

    //Remove this line when login screen finished
    req.session.playerId = process.env.USER_ID

    res.locals.session = req.session;
    next();
});

//==========//

(require('./src/routes/routes')).bind(app);

app.listen(process.env.PORT || 3000);


