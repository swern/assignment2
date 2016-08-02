var FlightAnalysis = function(flight){
  this.flight = flight;
  //console.log(this.flight)
  this.flightObj = {
    departureDate: this.flight.Dates.OutboundDates[0].PartialDate,
    arrivalDate:this.flight.Dates.InboundDates[0].PartialDate,
    departureAirport:{name: this.flight.Places[1].Name, iata: this.flight.Places[1].IataCode},
    arrivalAirport: {name: this.flight.Places[0].Name, iata:this.flight.Places[0].IataCode} 
  }
  this.newQuotes=[];
}


FlightAnalysis.prototype = {

  createNewQuotesArray: function(){
    var quotes = this.flight.Quotes;
    for (quote of quotes){
      if (quote.OutboundLeg != undefined && quote.InboundLeg != undefined){
         this.newQuotes.push(quote)
      console.log(quote.OutboundLeg)
      }
    }
    console.log(this.newQuotes)
  }

}

module.exports = FlightAnalysis;