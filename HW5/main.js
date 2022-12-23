var shelljs = require('shelljs');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/hw5.html');
});

app.get('/api', function (req, res) {

  var cx = req.query.cx;
  var cy = req.query.cy;
  var r = req.query.r;
  var min0 = req.query.min0;
  var min1 = req.query.min1;
  var max0 = req.query.max0;
  var max1 = req.query.max1;

  shelljs.exec('circle-rect.exe ' + ' ' + cx + ' ' + cy + ' ' + r + ' ' + min0 + ' ' + min1 + ' ' + max0 + ' ' + max1, function (status, output) {
    console.log('Exit status:', status);
    console.log('Program output:', output);

    var output = {
      status: status,
      output: output
    };


    /*
      The response header for supporting CORS:
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type"
    */

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type"
    });

    res.write(JSON.stringify(output));
    res.end();

  });

});


// or simply
// app.listen (1337); 
// will do

var server = app.listen(1337, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('server started on http://' + host + ':' + port);
});

