// var View = require('./view/view.js');
var Festival = require('./models/festivals/festival');
var Airport = require('./models/airports/airport');

// var user = require('./user/user.js');

// var state = {
//   view: new View(),
//   user: new user(),
//   latLng: '''',
//   map: '',
//   markers: []
// }

window.onload= function(){
  console.log('good so far');

  var airport = new Airport();
  airport.onUpdate = function(airports){
    console.log("airports: ", airports);
  }

  var fest = new Festival();
  fest.onUpdate = function(festivals){
    console.log(festivals);
    airport.getAirports("festivals: ", festivals);
  }
  
  fest.getFestivals();
 



  //fest.onUpdate = function(festivals){
    // do some DOM view stuf
    //list out the festivals on a page
    //do some data cleaning
    //festivalView.showFestivals(festivals);
    //get all the airports for the festival
}

