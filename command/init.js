module.exports = function(program){
  var copy = require('directory-copy');
  var path = require('path');
  var child_process = require('child_process');
  var chalk = require('chalk');
  copy(
    { 
      src: path.join(__dirname ,'../template'), 
      dest: process.cwd()
      //excludes: [ /^\./ ] // Exclude hidden files 
    }
  , function () {
    console.log(chalk.green('Project initialization success!Please run "npm install" or "cnpm install" if you have install cnpm.') );
    // console.log('++++++++++++++++start install npm module++++++++++++++++');
    // child_process.exec('npm install',function(error){
    //   if(error){
    //     console.log(error);
    //   }else{
    //     console.log();
    //   }
    // });
  })
  .on('log', function (msg, level) {
    // Level is debug, info, warn or error 
    console.log(level + ': ' + msg)
  })
  
};