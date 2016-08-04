var Airport = function() {
  this.airports = "";
  this.onUpdate = null;
};

Airport.prototype = {

  getAirports: function(festivals) {
    // console.log("Festivals: ", festivals.results.length);
    var counter = 0;

    var thisFest = festivals.results[0];

    var recursiveAjax = function(thisFest){
      
      var url = "http://localhost:3000/airports/"+thisFest.venue.latitude+"/"+thisFest.venue.longitude;

      var request = new XMLHttpRequest();
      request.open("GET",url);
      request.setRequestHeader("Content-Type", "application/json")
      
      request.onload = function(){
         if (request.status === 200){
            thisFest = festivals.results[counter];
            var jsonString = request.responseText;
            //console.log(jsonString)
            this.airports = JSON.parse(jsonString);
            //console.log(thisFest.venue.latitude, this.airports)
            // console.log("venuelatitude",thisFest.venue.latitude,this.airports )
            //console.log("counter: ", counter, "festivals.results.length: ", festivals.results.length)
           this.airports = this.airportFilter(thisFest);

            if(counter < festivals.results.length){
              this.onUpdate(this.airports, thisFest);
              counter++;
              recursiveAjax(thisFest);
            }

         }
       }.bind(this)
       request.send(null);

    }.bind(this)

    recursiveAjax(thisFest);

  },

  airportFilter: function(thisFest){
    var interimArray = []
    var finalArray = []
    this.airports.forEach(function(airport){
      if(thisFest.venue.latitude + 1 > airport.lat && thisFest.venue.latitude - 1 < airport.lat){interimArray.push(airport)}
    })
    interimArray.forEach(function(airport){
      if(thisFest.venue.longitude + 1 > airport.lng && thisFest.venue.longitude - 1 < airport.lng){finalArray.push(airport)}
    })
    return finalArray
    // console.log("venuelatitude",thisFest.venue.latitude,finalArray)
  }

};

module.exports = Airport;