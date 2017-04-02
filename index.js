var express = require('express');

var port = process.env.PORT || 3000;
var app = express();

app.use('/static', express.static(__dirname + '/app/static'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
});
