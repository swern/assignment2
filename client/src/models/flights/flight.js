var Flight = function(depAirport){
  this.flights = "";
  this.onUpdate= null;
  this.depAirport = depAirport;
}
//git test
Flight.prototype = {

  getFlights: function(airports, fest){
    var counter = 0;
    var thisAirport = airports[0]
    var outboundDate = new Date(fest.date)
    outboundDate.setDate(outboundDate.getDate() - 2)
    outboundDate = this.formatDate(outboundDate);
    var inboundDate = new Date(fest.date)
    inboundDate.setDate(inboundDate.getDate() +5)
    inboundDate = this.formatDate(inboundDate);

    var recursiveAjax = function(thisAirport){
      var url = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/"+this.depAirport+"/"+ thisAirport.code + "/" + outboundDate + "/"+ inboundDate +"?apiKey=fl366429978355658452366133652739";
      var request = new XMLHttpRequest();
      request.open("GET",url);
      request.onload = function(){
        if (request.status === 200){
          var jsonString = request.responseText;
          this.flights = JSON.parse(jsonString)
          if(counter < airports.length){
            this.onUpdate(this.flights, thisAirport, fest)
            counter++;
            recursiveAjax(thisAirport)
          }
        }

      }.bind(this)
      request.send(null)
    }.bind(this)
    recursiveAjax(thisAirport)
  },

  formatDate: function(date) {
  var d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
  }

};
module.exports = Flight;
