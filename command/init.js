module.exports = function (program) {
  var copy = require('directory-copy');
  var path = require('path');
  var fs = require('fs');
  var child_process = require('child_process');
  var path = require('path');
  var _ = require('underscore');

  copy({
    src: path.join(__dirname, '../template'),
    dest: process.cwd()
  }, function () {

    console.log('Project initialization success!Please run "npm install" or "cnpm install" if you have install cnpm.')
  }).on('log', function (msg, level) {
    // Level is debug, info, warn or error 
    console.log(level + ': ' + msg)
  })

};