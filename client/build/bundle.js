/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Festival = __webpack_require__(1);
	var Airport = __webpack_require__(2);
	var Flight = __webpack_require__(3);
	var View = __webpack_require__ (4);
	
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
	


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Festival = function(){
	  this.festivals = ''
	  this.minDate = '2016-09-01'
	  this.maxDate = '2016-09-10'
	  this.onUpdate = null
	}
	
	Festival.prototype = {
	
	  getFestivals: function(){
	    var url = "http://www.skiddle.com/api/v1/events?api_key=b44ecae0f03d13e3fcf192e4235aef2b&eventcode=FEST&minDate="+this.minDate+"&maxDate="+this.maxDate+"&limit=100";
	    var request = new XMLHttpRequest();
	    request.open("GET",url);
	    request.setRequestHeader("Content-Type", "application/json")
	    request.onload = function(){
	      if (request.status === 200){
	        var jsonString = request.responseText;
	        this.festivals = JSON.parse(jsonString)
	        this.onUpdate(this.festivals);
	      }
	    }.bind(this);
	    request.send(null)
	  }
	}
	
	module.exports = Festival;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var Airport = function(airLat,airLng) {
	
	  this.airports = "";
	  this.airLat = airLat;
	  this.airLng = airLng;
	  this.onUpdate = null;
	};
	
	Airport.prototype = {
	
	  getAirports: function() {
	    var url = "https://iatacodes.org/api/v6/nearby?api_key=0150cf1d-e183-4384-ad90-d4685a0c3454&lat="+this.airLat+"&lng="+this.airLng+" &distance=100";
	    // var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=55.9486,-3.1999&radius=50000&type=airport&name=airport&key=AIzaSyB13OL9FrPlWcd8p3rZ_ASQy0nNK77R-ow"
	    var request = new XMLHttpRequest();
	    request.open("GET",url);
	    request.setRequestHeader("Content-Type", "application/json")
	    request.onload = function(){
	      if (request.status === 200){
	        var jsonString = request.responseText;
	        this.airports = JSON.parse(jsonString)
	        this.onUpdate(this.airports)
	      }
	    }.bind(this)
	    request.send(null)
	
	  }
	
	};
	
	module.exports = Airport;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var Flight = function(){
	  this.flights = "";
	  this.onUpdate= null;
	
	}
	
	Flight.prototype = {
	  getFlights: function(){
	    var url = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/LON/JFK/2016-08-03/2016-08-05?apiKey=fl366429978355658452366133652739"
	    var request = new XMLHttpRequest();
	    request.open("GET",url);
	    request.onload = function(){
	      if (request.status === 200){
	        var jsonString = request.responseText;
	        this.flights = JSON.parse(jsonString)
	        this.onUpdate(this.flights)
	      }
	    }.bind(this)
	    request.send(null)
	  }
	};
	module.exports = Flight;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var View = function(){
	  this.map = ''
	  this.center = ''
	}
	
	View.prototype = {
	
	  initialize: function(){
	
	    navigator.geolocation.getCurrentPosition(function(position){
	      this.center = { lat: position.coords.latitude, lng: position.coords.longitude }
	      var mapDiv = document.getElementById('map');
	      this.map = new google.maps.Map(mapDiv,{
	        center:this.center,
	        zoom: 6
	      });    
	    })
	  },
	
	  showFestivals: function(festivals){
	
	    navigator.geolocation.getCurrentPosition(function(position){
	      this.center = { lat: position.coords.latitude, lng: position.coords.longitude }
	      var mapDiv = document.getElementById('map');
	      this.map = new google.maps.Map(mapDiv,{
	        center:this.center,
	        zoom: 6
	      });
	
	      for (festival of festivals.results){
	        var pos = { lat: festival.venue.latitude, lng: festival.venue.longitude }
	        var marker = new google.maps.Marker({
	           position: pos,
	           map: this.map,
	        })
	      }          
	    })
	  }
	}
	
	module.exports = View;
	


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map