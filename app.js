require('dotenv').config()

var express = require('express');

var app = express();

app.use(express.static('img'));
app.set('view engine', 'ejs');

const Routes = require('./src/routes/routes');
new Routes(app).init();

app.listen(3000);

