// var View = require('./view/view.js');
var Festival = require('./models/festivals/festival');
var Airport = require('./models/airports/airport');
var Flight = require('./models/flights/flight');

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

  var flight = new Flight();

  flight.onUpdate = function (flights){
    console.log("flights: ", flights);
  }

  var airport = new Airport();

  airport.onUpdate = function(airports){
    console.log("airports: ", airports);
    flight.getFlights();
  }

  var fest = new Festival();

  fest.onUpdate = function(festivals){
    console.log("festivals: ", festivals);
    airport.getAirports();
  }
  
  fest.getFestivals();

}

