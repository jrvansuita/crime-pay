require('dotenv').config()

var express = require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/img', express.static('img'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

app.set('view engine', 'ejs');

const Routes = require('./src/routes/routes');
new Routes(app).init();

app.listen(3001);

