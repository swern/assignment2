var Festival = require('./models/festivals/festival');
var Airport = require('./models/airports/airport');
var Flight = require('./models/flights/flight');
var View = require ('./view/view');

window.onload= function(){

  main()

}

function main(){

  var festival = new Festival(); 
  var view = new View();
  getFlightFestCombo(festival,view)
}

function getFlightFestCombo(festival,view){
  // var dep= view.getDep() 
  festival.getFestivals();

  festival.onUpdate = function(festivals){
    //console.log("festivals: ", festivals);
    view.showFestivals(festivals);

    festivals.results.forEach(function(festival){

      var airport = new Airport(festival.venue.latitude.toString(), festival.venue.longitude.toString());
      airport.getAirports();

      airport.onUpdate = function(airports){
        var arrAirports = [];

        airports.forEach(function(airport){
          console.log("airport: ", airport);
          var inboundDate = new Date(festival.date)
          inboundDate.setDate(inboundDate.getDate() - 2)
          inboundDate = formatDate(inboundDate);

          var outboundDate = new Date(festival.date)
          outboundDate.setDate(outboundDate.getDate() + 5)
          outboundDate = formatDate(outboundDate);

          // console.log ("inbounddate",inboundDate)
          var flight = new Flight(airport.code,inboundDate,outboundDate);
          flight.onUpdate = function (flight){
             airport.flight = flight;
             arrAirports.push(airport);
             console.log("Airports: ", arrAirports);
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


