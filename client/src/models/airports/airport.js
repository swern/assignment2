var Airport = function() {
  this.airports = "";
  this.onUpdate = null;
};

Airport.prototype = {

  getAirports: function(festivals) {
    console.log("Festivals: ", festivals.results.length);
    var counter = 0;

    // for (var i = 0; i < festivals.results.length; i++) {
    //   console.log(festivals.results[i].venue.latitude);
    //   console.log(festivals.results[i].venue.longitude);
    // }

    var thisFest = festivals.results[0];

    var recursiveAjax = function(thisFest){
      
      console.log("recursiveAjax");

      var url = "http://localhost:3000/airports/"+thisFest.venue.latitude+"/"+thisFest.venue.longitude;
      var request = new XMLHttpRequest();
      request.open("GET",url);
      request.setRequestHeader("Content-Type", "application/json")
      
      request.onload = function(){
         if (request.status === 200){
            thisFest = festivals.results[counter];
            var jsonString = request.responseText;
            this.airports = JSON.parse(jsonString);
            
            console.log("counter: ", counter, "festivals.results.length: ", festivals.results.length)

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

  }

};

module.exports = Airport;