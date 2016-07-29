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