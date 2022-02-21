require('dotenv').config()

var express = require('express');

var app = express();

app.use('/img', express.static('img'));
app.use('/css', express.static('css'));

app.set('view engine', 'ejs');

const Routes = require('./src/routes/routes');
new Routes(app).init();

app.listen(3000);

