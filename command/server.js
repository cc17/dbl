module.exports = function(program){

  var connect = require('connect');
  var favicon = require('serve-favicon');
  var _static = require('serve-static');
  var webpackDevMiddleware = require("webpack-dev-middleware");
  var webpack = require('webpack');
  var path = require('path');
  var resolve = path.resolve;
  var fs = require('fs');
  // path
  var server_path = resolve( process.cwd() + '/src/');

  var server = connect();


  var env = process.env.NODE_ENV;
  var debug = !env || env === 'development';
  
  // handle favicon.ico
  server.use('/favicon.ico',function(req,res){
    res.end('');
  });

if(debug) {
  var webpackDevConf = require( path.join(process.cwd() ,'./webpack-dev.config') );
  server.use(webpackDevMiddleware(webpack(webpackDevConf), {
      contentBase: webpackDevConf.output.path,
      publicPath: webpackDevConf.output.publicPath,
      hot: true,
      // stats: webpackDevConf.devServer.stats
      stats: {
          cached: false,
          colors: true
      }
  }));
}
  
  //以上为静态资源目录，除了以上路径，其他都默认为mock数据
  //处理post
  server.use(mock);
  function mock(req,res,next){
    if(path.extname(req.url) == '.json' ) {
      fs.readFile(path.join(process.cwd() + '/' + 'tests/data/') + req.url.split('?')[0], function(err,data){
        if(err != null){
          res.end(err.toString())
        }else{
          res.end(data.toString())
        }
    });
    }else{
      next();
    }
  };
  

  // static files
  server.use(_static(server_path,{
    maxage: 0
  }));



  server.listen(program.port || 3001,function(){
    console.log('serer is runing');
  });

  
};