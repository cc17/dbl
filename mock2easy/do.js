var http = require('http');

module.exports = function(req, res){


  for(var name in req.body){
    req.body[name] = encodeURI(req.body[name]);
  }

  var _write = JSON.stringify(req.body);

  var options = {
    hostname: '127.0.0.1',
    port: 8001,
    path: req.url,
    method: req.method
  };

  console.log(res)

  if(req.method == 'POST'){
    options.headers =  {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Length': _write.length || 0
    };
  }

  var _req = http.request(options, function(_res) {

    var data = '';
    _res.on('data', function (chunk) {
      data += chunk;
    });
    _res.on('end',function(){
      res.end(data);
    });
  });

  _req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  if(req.method == 'POST'){
    _req.write(_write);
  }

  _req.end();
};

