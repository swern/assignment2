var Festival = require('./models/festivals/festival');
var Airport = require('./models/airports/airport');
var Flight = require('./models/flights/flight');
var View = require ('./view/view');

window.onload= function(){
 
  main()

}

function main(){

  var festival = new Festival();
  var flight = new Flight(); 
  var view = new View();
  //view.initialize() 
  getFlightFestCombo(festival,flight,view)
}

function getFlightFestCombo(festival,flight,view){
  

  festival.getFestivals();


  festival.onUpdate = function(festivals){
    console.log("festivals: ", festivals);
    view.showFestivals(festivals);
    festivals.results.forEach(function(festival){
      var airport = new Airport(festival.venue.latitude.toString(), festival.venue.longitude.toString());
      airport.getAirports();
      airport.onUpdate = function(airports){
        console.log("airports: ", airports);
        //flight.getFlights();
      };
     })
  };

  // flight.onUpdate = function (flights){
  //   console.log("flights: ", flights);
  // }; 
};

