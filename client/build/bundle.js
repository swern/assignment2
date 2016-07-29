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

	// var View = require('./view/view.js');
	var Festival = __webpack_require__(1);
	var Airport = __webpack_require__(2);
	
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
	
	  var airport = new Airport();
	  airport.onUpdate = function(airports){
	    console.log("airports: ", airports);
	  }
	
	  var fest = new Festival();
	  fest.onUpdate = function(festivals){
	    console.log(festivals);
	    airport.getAirports("festivals: ", festivals);
	  }
	  
	  fest.getFestivals();
	 
	
	
	
	  //fest.onUpdate = function(festivals){
	    // do some DOM view stuf
	    //list out the festivals on a page
	    //do some data cleaning
	    //festivalView.showFestivals(festivals);
	    //get all the airports for the festival
	}
	


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Festival = function(){
	  this.festivals= ''
	  //getting festivals
	  this.onUpdate = null
	}
	
	Festival.prototype = {
	
	  getFestivals: function(){
	    var url = "http://www.skiddle.com/api/v1/events?api_key=b44ecae0f03d13e3fcf192e4235aef2b&eventcode=FEST&minDate=2016-09-01&maxDate=2016-09-10&limit=100";
	    var request = new XMLHttpRequest();
	    request.open("GET",url);
	    request.setRequestHeader("Content-Type", "application/json")
	    request.onload = function(){
	      if (request.status === 200){
	        var jsonString = request.responseText;
	        this.festivals = JSON.parse(jsonString)
	        //console.log(this.festivals);
	        this.onUpdate(this.festivals);
	      }
	    }.bind(this);
	
	    request.send(null)
	    //when it's got the data - call onUpdate(data);
	  }
	
	}
	
	module.exports = Festival;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var Airport = function() {
	
	  this.airports = "";
	
	};
	
	Airport.prototype = {
	
	  getAirports: function() {
	    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=55.9486,-3.1999&radius=50000&type=airport&name=airport&key=AIzaSyB13OL9FrPlWcd8p3rZ_ASQy0nNK77R-ow"
	    var request = new XMLHttpRequest();
	    request.open("GET",url);
	    request.setRequestHeader("Content-Type", "application/json")
	    request.onload = function(){
	      if (request.status === 200){
	        var jsonString = request.responseText;
	        this.airports = JSON.parse(jsonString)
	        console.log(this.airports)
	      }
	    }
	    request.send(null)
	    //when it's got the data - call onUpdate(data);
	
	  }
	
	};
	
	module.exports = Airport;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map