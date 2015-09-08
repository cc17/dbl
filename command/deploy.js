var webpack = require('webpack');

var gulp = require('gulp');
var gutil = require('gulp-util');
var src = process.cwd() + '/src';
var assets = process.cwd() + '/build';
var webpackConf = require(process.cwd() + '/webpack.config');

function taskWebpack(done){

  webpack(webpackConf, function(err, stats) {
      if(err) throw new gutil.PluginError('webpack', err);
      gutil.log('[webpack]', stats.toString({colors: true}));
      done();
  });
}


function build(){
  var replace = require('gulp-replace');
  var htmlmin = require('gulp-htmlmin');

  return gulp
      .src(assets + '/*.html')
      .pipe(replace(/<script(.+)?data-debug([^>]+)?><\/script>/g, ''))
      // @see https://github.com/kangax/html-minifier
      .pipe(htmlmin({
          collapseWhitespace: true,
          removeComments: true
      }))
      .pipe(gulp.dest(assets));
}




module.exports = function(program){

  //编译
  taskWebpack(build);

  // return gulp.src(process.cwd + '/src/**')
  //   .pipe();
  //     .pipe(sftp({
  //         host: '[remote server ip]',
  //         remotePath: '/www/app/',
  //         user: 'foo',
  //         pass: 'bar'
  //     }));
}