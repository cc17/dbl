module.exports = function (program) {
  var async = require('async');
  var connect = require('connect');
  var favicon = require('serve-favicon');
  var _static = require('serve-static');
  var webpackDevMiddleware = require("webpack-dev-middleware");
  var webpack = require('webpack');
  var path = require('path');
  var resolve = path.resolve;
  var fs = require('fs');
  // path
  var server_path = resolve(process.cwd() + '/src/');

  var options = {
    port: program.mockPort ,
    lazyLoadTime:3000,
    database:'mock2easy',
    doc:'doc',
    keepAlive:true,
    isSpider:false,
    ignoreField:[],
    interfaceSuffix: program.interfaceSuffix,
    preferredLanguage:'en'
  };

  async.parallel([
    function(callback) {
      require('mock2easy')(options,function(app){
        try{
          app.listen(options.port, function () {
            console.log(('mock2easy is starting , please visit : http://localhost:' + options.port).bold.cyan);
            callback();
          });
        }catch (e){
          console.error(e);
        }
      });
    },
    function(callback) {

      var server = connect();

      var env = process.env.NODE_ENV;
      var debug = !env || env === 'development';

      // handle favicon.ico
      server.use('/favicon.ico', function (req, res) {
        res.end('');
      });

      if (debug) {
        var webpackDevConf = require(path.join(process.cwd(), './webpack-dev.config'));
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

      
      server.use( require(path.resolve(__dirname,'../mock2easy/do'))(program)  );
      
      //以上为静态资源目录，除了以上路径，其他都默认为mock数据
      server.use(_static(server_path, {
        maxage: 0
      }));

      

      server.listen(program.port || 3001, function () {
        callback();
      });

    }
  ], function(err) { //This is the final callback
    console.log('serer is runing');
  });

};