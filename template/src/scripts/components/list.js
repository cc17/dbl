require('../../css/components/list.css');

function query2json(){

  document.write('hello');

  var searchArray = location.search.split('?').splice(1).split("&");
  var obj = {};
  searchArray.forEach(function(item){
    var temp = item.split('=');
    obj[temp[0]] = temp[1];
  });
  return obj;
};
module.exports = query2json;