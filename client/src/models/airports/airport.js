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