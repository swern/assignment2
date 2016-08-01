var Analysis = function(festivals) {
  this.festivals = festivals;
  this.festivalTicketPrice = 0; 
  this.festivalPrices = [];  
};

Analysis.prototype = {

  getFestivalTicketPrice: function() {
    //console.log("festprice", this.festivals[1].entryprice) 
    //var festivals = this.festivalData[0].results;
    this.festivals.forEach(function(festival) {
      
      var ticketPrice = festival.entryprice;
      var regex = /\d+/g;
      var stringTicketPrice = ticketPrice;
      var numberTicketPrice = stringTicketPrice.match(regex);
      if(numberTicketPrice !== null) {
         this.festivalTicketPrice = numberTicketPrice[0];
       } else {
       this.festivalTicketPrice = 0
      };
      
      this.festivalPrices.push(this.festivalTicketPrice);
    }.bind(this));
  },

  checkFestivalTicketPriceInBudget: function(input) {
    var festivalTicketPrice = this.getFestivalTicketPrice();
    var userBudget = input;
    return festivalTicketPrice >= userBudget;
  },

  getFlightPrice: function() {

    var flights = this.flightData.Quotes
    var flightQuote = ""
    var flightPrices = [];

    flights.forEach(function(flight){

      if("InboundLeg" in flight){
        flightQuote = flight.MinPrice;
        flightPrices.push(flightQuote);
      };
    });

    var sorted = flightPrices.sort(function(a, b){
      return a - b
    });

    var minFlightQuote = sorted.shift;

    return minFlightQuote;
  },

  sumFestivalFlightPrice: function() {

    var totalPrice = "";

    if(this.checkFestivalTicketPriceInBudget()){
      totalPrice = this.getFestivalTicketPrice() + this.getFlightPrice();
    }

    return totalPrice;
  },

  checksumFestivalFlightPriceInBudget: function(input) {

    var totalPrice = this.sumFestivalFlightPrice();
    var budget = input;

    return (totalPrice <= budget);

  },

  addDays: function(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
  }

};

module.exports = Analysis;





























