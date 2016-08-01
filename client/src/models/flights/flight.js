var Flight = function(destination){
  this.flights = "";
  this.onUpdate= null;
  //this.origin = origin;
  this.destination = destination
}

Flight.prototype = {
  getFlights: function(){
    var url = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/EDI/"+this.destination+"/2016-08-03/2016-08-05?apiKey=fl366429978355658452366133652739"
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
