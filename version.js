module.exports = function(){
  var art = require('ascii-art'); 
  var chalk = require('chalk'); 
  console.log( art.font('Demo!', 'Doom') );
  art.font('Demo!', 'Doom', function(rendered){
    console.log(art.style(rendered, 'blue_bg+red+blink+inverse'));
  });
};