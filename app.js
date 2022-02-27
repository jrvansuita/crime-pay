require('dotenv').config()

var express = require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/img', express.static('front/img'));
app.use('/css', express.static('front/css'));
app.use('/js', express.static('front/js'));
app.use('/pages', express.static('front/js'));

var path = require('path')
app.set('views', path.join(__dirname, '/front/views'))

app.set('view engine', 'ejs');




const Routes = require('./src/routes/routes');
new Routes(app).init();

app.listen(3001);

