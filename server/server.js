var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.use(express.static(__dirname.slice(0, -6) + 'dist'));

console.log(__dirname + '../dist')

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


