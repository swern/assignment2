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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var Festival = __webpack_require__(1);
	var Airport = __webpack_require__(2);
	var Flight = __webpack_require__(3);
	var View = __webpack_require__ (4);
	var FlightAnalysis = __webpack_require__(143)
	var FestivalAnalysis = __webpack_require__ (144)
	
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
	


/***/ },

/***/ 1:
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

/***/ 2:
/***/ function(module, exports) {

	var Airport = function(airLat,airLng) {
	
	  this.airports = "";
	  this.airLat = airLat;
	  this.airLng = airLng;
	  this.onUpdate = null;
	};
	
	Airport.prototype = {
	
	  getAirports: function() {
	
	    var url = "http://localhost:3000/airports/"+this.airLat+"/"+this.airLng+"";
	    var request = new XMLHttpRequest();
	    request.open("GET",url);
	    request.setRequestHeader("Content-Type", "application/json")
	    request.onload = function(){
	       if (request.status === 200){
	         var jsonString = request.responseText;
	         this.airports = JSON.parse(jsonString);
	         this.onUpdate(this.airports)
	       }
	     }.bind(this)
	     request.send(null)
	  }
	};
	
	module.exports = Airport;

/***/ },

/***/ 3:
/***/ function(module, exports) {

	var Flight = function(destination,inbound, outbound){
	  this.flights = "";
	  this.onUpdate= null;
	  //this.origin = origin;
	  this.destination = destination;
	  this.inbound = inbound;
	  this.outbound = outbound;
	}
	
	Flight.prototype = {
	  getFlights: function(){
	
	    var url = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/EDI/"+ this.destination + "/" + this.inbound + "/"+this.outbound+"?apiKey=fl366429978355658452366133652739";
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

/***/ 4:
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
	


/***/ },

/***/ 143:
/***/ function(module, exports) {

	var FlightAnalysis = function(flight){
	  this.flight = flight;
	  this.flightObj = {
	    departureDate: this.flight.Dates.OutboundDates[0].PartialDate,
	    arrivalDate: this.flight.Dates.InboundDates[0].PartialDate,
	    departureCarriers: [],
	    arrivalCarriers: [],
	    departureAirport: {name: this.flight.Places[1].Name, iata: this.flight.Places[1].IataCode},
	    arrivalAirport: {name: this.flight.Places[0].Name, iata:this.flight.Places[0].IataCode},
	  }
	  this.newQuotes=[];
	}
	
	
	FlightAnalysis.prototype = {
	
	  createNewQuotesArray: function(){
	    var onlyDep = [];
	    var onlyArr = [];
	    var quotes = this.flight.Quotes;
	    for (quote of quotes){
	      if (quote.OutboundLeg && quote.InboundLeg){
	         this.newQuotes.push(quote)
	      } else if (!quote.InboundLeg){
	        onlyDep.push(quote)
	      } else if (!quote.OutboundLeg){
	        onlyArr.push(quote)
	      }
	    }
	
	    for (depQuote of onlyDep){
	      for (arrQuote of onlyArr){
	        depQuote.InboundLeg = arrQuote.InboundLeg;
	        depQuote.MinPrice = depQuote.MinPrice + arrQuote.MinPrice
	        //console.log(depQuote)
	        this.newQuotes.push(depQuote) 
	      }
	    }    
	  },
	
	  sortQuotes: function(){
	    this.newQuotes.sort(function(a, b) {
	        return parseFloat(a.MinPrice) - parseFloat(b.MinPrice);
	    });
	  },
	
	  findMinimumQuote: function(){
	    this.createNewQuotesArray()
	    this.sortQuotes()
	    this.flightObj.quote=this.newQuotes[0]
	  },
	
	  populateFlightObj: function(){
	    this.findMinimumQuote();
	    for (carrier of this.flight.Carriers){
	
	      for(quoteCarrierID of this.flightObj.quote.OutboundLeg.CarrierIds){
	
	        if (quoteCarrierID === carrier.CarrierId){
	          this.flightObj.departureCarriers.push(carrier.Name)
	          //console.log(carrier.Name)
	        }
	      }
	
	      for(quoteCarrierID of this.flightObj.quote.InboundLeg.CarrierIds){
	
	        if (quoteCarrierID === carrier.CarrierId){
	          this.flightObj.arrivalCarriers.push(carrier.Name)
	          //console.log(carrier.Name)
	        }
	      } 
	    }
	
	  }
	}
	
	module.exports = FlightAnalysis;

/***/ },

/***/ 144:
/***/ function(module, exports) {

	var FestivalAnalysis = function(festival) {
	  this.festival = festival;
	  this.festivalTicketPrice = 0; 
	};
	
	FestivalAnalysis.prototype = {
	
	  getFestivalTicketPrice: function(){
	    var ticketPrice = this.festival.entryprice;
	    var regex = /\d+/g;
	    var stringTicketPrice = ticketPrice;
	    var numberTicketPrice = stringTicketPrice.match(regex);
	      if(numberTicketPrice !== null) {
	         this.festivalTicketPrice = numberTicketPrice[0];
	       } else {
	       this.festivalTicketPrice = 0
	      };
	  }
	
	};
	
	module.exports = FestivalAnalysis;
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	


/***/ }

/******/ });
//# sourceMappingURL=bundle.js.map