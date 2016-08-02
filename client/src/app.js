var Festival = require('./models/festivals/festival');
var Airport = require('./models/airports/airport');
var Flight = require('./models/flights/flight');
var View = require ('./view/view');
var FlightAnalysis = require('./models/analysis/flight_analysis')
var FestivalAnalysis = require ('./models/analysis/festival_analysis')

window.onload = function(){
  main();
}

function main(){
  var festival = new Festival(); 
  var view = new View();
  getFlightFestCombo(festival, view);
}

function getFlightFestCombo(festival, view){
  // var dep= view.getDep() 
  festival.getFestivals();

  festival.onUpdate = function(festivals){
    view.showFestivals(festivals);

    festivals.results.forEach(function(festival){

      var airport = new Airport(festival.venue.latitude.toString(), festival.venue.longitude.toString());
      airport.getAirports();

      airport.onUpdate = function(airports){
        var arrAirports = [];

        airports.forEach(function(airport){
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
              console.log(arrAirports)
            }
          }; 
          flight.getFlights();
        })
      };
    })
  };
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

