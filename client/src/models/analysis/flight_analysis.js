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