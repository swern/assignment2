var Festival = require('./models/festivals/festival');
var Airport = require('./models/airports/airport');
var Flight = require('./models/flights/flight');
var View = require ('./view/view');

window.onload= function(){
  var view = new View();
  view.initialize()  
  main()
}

function main(){

  var festival = new Festival();
  var airport = new Airport();
  var flight = new Flight();

  festival.getFestivals();

  festival.onUpdate = function(festivals){
    console.log("festivals: ", festivals);
    airport.getAirports();
  };

  airport.onUpdate = function(airports){
    console.log("airports: ", airports);
    flight.getFlights();
  };

  flight.onUpdate = function (flights){
    console.log("flights: ", flights);
  }; 

}

