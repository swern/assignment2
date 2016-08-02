var FestivalAnalysis = function(festival) {
  this.festival = festival;
  this.festivalTicketPrice = 0; 
};

FestivalAnalysis.prototype = {

  getFestivalTicketPrice: function(){
    var ticketPrice = this.festival.entryprice;
    var regex = /\d+/g;
    var stringTicketPrice = ticketPrice;
    var numberTicketPrice = stringTicketPrice.match(regex);
      if(numberTicketPrice !== null) {
         this.festivalTicketPrice = numberTicketPrice[0];
       } else {
       this.festivalTicketPrice = 0
      };
  }

};

module.exports = FestivalAnalysis;





























