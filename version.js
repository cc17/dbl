module.exports = function(){
  var art = require('ascii-art');  
  console.log('s');
  art.font('Prompt', 'Basic', 'red').font('v1', 'Doom', 'magenta', function(rendered){
    console.log(rendered);
  });
};