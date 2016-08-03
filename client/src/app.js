var async = require ('async');
var Festival = require('./models/festivals/festival');
var Airport = require('./models/airports/airport');
var Flight = require('./models/flights/flight');
var View = require ('./view/view');
var FlightAnalysis = require('./models/analysis/flight_analysis');
var FestivalAnalysis = require ('./models/analysis/festival_analysis');
var allFestivals = [];
var map = "";

window.onload = function(){
  getUserInput()
  var form = document.getElementById('form');
  form.onsubmit = function(e) {
    e.preventDefault();
    var depAirport = document.getElementById('departureAirports').value.split('/')[1];
    var deptDateInput = document.getElementById('departureDate').value;
    var retDateInput = document.getElementById('returnDate').value;

    initialize();
    main( deptDateInput, retDateInput, depAirport);
  }
}

function main(departureDate, returnDate, depAirport){
  var departureDate = dateFormat(departureDate);
  var returnDate = dateFormat(returnDate)
  var festival = new Festival(departureDate, returnDate); 
  var view = new View();  
  var airport = new Airport();
  var flight = new Flight(depAirport);

  airport.onUpdate = function(airports, fest){
    fest.airports = airports;
    flight.getFlights(airports, fest);
  }

  flight.onUpdate = function(flights, airport, fest){
    flightAnalysis = new FlightAnalysis(flights);
    flightAnalysis.populateFlightObj()
    airport.flights = flightAnalysis.flightObj;
    console.log(fest);
    // view.showFestivals(fest);
    console.log("map: ", map);
    addMarker(fest, map);

  }
  getFlightFestCombo(festival, view, airport, flight);
}

function getFlightFestCombo(festival, view, airport, flight){
  festival.onUpdate = function(festivals){
    airport.getAirports(festivals);
  };
  festival.getFestivals();
};


function dateFormat(date) {
  var d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function getUserInput(){
    
  var userInput = document.getElementById('departureAirports');
  // userInput.onchange = this.save;
  userInput.onkeyup = search;
}

function search(){

  var populateOptions = function(data){

    var datalist = document.getElementById('datalist');
    datalist.innerHTML = "";
    data.Places.forEach(function(place){

      var option = document.createElement('option')
      option.text = place.PlaceId;
      option.value = place.PlaceName + "/" + place.PlaceId;
      datalist.appendChild(option);
      this.departureAirport = option.text;
    })
  }

  var getLocations = function(query){

    var url = "http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/GB/GBP/en-GB?query=" + query + "&apiKey=fl366429978355658452366133652739";
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function(){
      if(request.status === 200){
        var jsonString = request.responseText;
        var locations = JSON.parse(jsonString);
        populateOptions(locations);
      }
    }
    request.send(null);
  }

  var queryTerm = document.getElementById('departureAirports').value;

  if(queryTerm.length > 0){
    getLocations(queryTerm);
  }
}

function initialize(){

   navigator.geolocation.getCurrentPosition(function(position){
    var center = { lat: position.coords.latitude, lng: position.coords.longitude }
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv,{
      center:center,
      zoom: 3
    });  
  })

}

function addMarker(festival, map) {

  var pos = { lat: festival.venue.latitude, lng: festival.venue.longitude }

  var marker = new google.maps.Marker({
    position: pos,
    map: map
  })

  marker.addListener('click',function(){
     var infoWindow = new google.maps.InfoWindow({
      content: festival.eventname
     })
     infoWindow.open(map, marker)
     showDetailedView(festival)
  })

}

function showDetailedView(festival) {

  var table = document.getElementById('table');

  var row1 = table.insertRow(0);
  // var row2 = table.insertRow(1);

  var cell1 = row1.insertCell(0);
  var cell2 = row1.insertCell(1);
  var cell3 = row1.insertCell(2);
  
  // var cell3 = row2.insertCell(0);
  // var cell4 = row2.insertCell(1);

  cell1.innerHTML = festival.eventname;
  cell2.innerHTML = festival.entryprice;
  cell3.innerHTML = festival.date;


  detailedView.appendChild(table);

}


