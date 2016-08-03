var async = require ('async');
var Festival = require('./models/festivals/festival');
var Airport = require('./models/airports/airport');
var Flight = require('./models/flights/flight');
var View = require ('./view/view');
var FlightAnalysis = require('./models/analysis/flight_analysis');
var FestivalAnalysis = require ('./models/analysis/festival_analysis');
var arrAirports = [];

window.onload = function(){
  main();
}

function main(){
  var festival = new Festival(); 
  var view = new View();  
  var airport = new Airport();
  var flight = new Flight();

  airport.onUpdate = function(airports, fest){
    fest.airports = airports;
    console.log(fest);
    flight.getFlights(airports, fest);
  }

  flight.onUpdate = function(flights, airport, fest){
    
    console.log(flights);
  }


  getFlightFestCombo(festival, view, airport, flight);
}

function getFlightFestCombo(festival, view, airport, flight){

  festival.onUpdate = function(festivals){
    view.showFestivals(festivals);

    async.each(festivals.results, function(festival){

      var airport = new Airport(festival.venue.latitude.toString(), festival.venue.longitude.toString());
     
      airport.onUpdate = function(airports){
     
        async.each(airports, function(airport){
          var inboundDate = new Date(festival.date);
          inboundDate.setDate(inboundDate.getDate() + 5);
          returnDate = formatDate(inboundDate);

          var outboundDate = new Date(festival.date);
          outboundDate.setDate(outboundDate.getDate() - 2);
          departureDate = formatDate(outboundDate);

          var flight = new Flight(airport.code,departureDate,returnDate);

          flight.onUpdate = function(flight){
            if(flight.Quotes.length){
              var cheapestFlight = new FlightAnalysis(flight);
              cheapestFlight.populateFlightObj();
              airport.flight = cheapestFlight.flightObj;
              arrAirports.push(airport);
              festival.airport = arrAirports;
            }
       
          };
          flight.getFlights();
        })
      };
    })

    airport.getAirports(festivals);
  };


  festival.getFestivals();
};


function formatDate(date) {
  var d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

//function get

