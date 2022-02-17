require('dotenv').config()


var express = require('express');
var app = express();

app.use(express.static('img'));
app.set('view engine', 'ejs');


// index page
app.get('/robbery', function (req, res) {

  const Player = require('./src/data/player');
  const player = new Player();

  player.get('620bd7d3167e2e95193329e1', (err, data) => {
    console.log(data);
    res.render('pages/robbery', { data: data });
  });
});


app.listen(3000);
console.log('Server is listening on port 3000');
