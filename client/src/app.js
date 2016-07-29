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

  var festival = new Festival();
  var airport = new Airport();
  var flight = new Flight();

  festival.getFestivals();

  festival.onUpdate = function(festivals){
    console.log("festivals: ", festivals);
    airport.getAirports();
  }

  airport.onUpdate = function(airports){
    console.log("airports: ", airports);
    flight.getFlights();
  }

  flight.onUpdate = function (flights){
    console.log("flights: ", flights);
  } 

}

