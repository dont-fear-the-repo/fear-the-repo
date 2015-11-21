var express = require('express');
var parser = require('body-parser');

var app = express();
app.use(parser.json());
app.use(express.static(__dirname.slice(0, -6) + 'dist'));
app.post('/login',function(req,res){
})




var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});


