var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]

var View = function(){

  this.map = '';
  this.center = '';
  this.departureAirportQuery = '';
  this.departureDate = '';
  this.returnDate = '';
  this.budget = '';
  this.userLat = '';
  this.userLng = '';
  this.submitDates = null;
};

View.prototype = {

  initialize: function() {
   navigator.geolocation.getCurrentPosition(function(position){
    this.center = { lat: position.coords.latitude, lng: position.coords.longitude }
    var mapDiv = document.getElementById('map');
    this.map = new google.maps.Map(mapDiv,{
      center:this.center,
      zoom: 3,
      styles: styles
    });  
  })
 },

 showFestivals: function(festivals){

  navigator.geolocation.getCurrentPosition(function(position){
      this.center = { lat: position.coords.latitude, lng: position.coords.longitude }
      var mapDiv = document.getElementById('map');
      this.map = new google.maps.Map(mapDiv,{
        center:this.center,
        zoom: 10,
        styles: styles
      });

        festivals.results.forEach(function(festival){
        var pos = { lat: festival.venue.latitude, lng: festival.venue.longitude }

        var marker = new google.maps.Marker({
          position: pos,
          map: this.map,
          styles: styles
        })

        marker.addListener('click', function() {
          this.showDetailedView(festival);
          console.log("what is festival?: ", festival)

        }.bind(this))

      }.bind(this))

    }.bind(this))

  },

  showDetailedView: function(festival){

    var table = document.getElementById('table');

    var row1 = table.insertRow(0);
    // var row2 = table.insertRow(1);

    var cell1 = row1.insertCell(0);
    var cell2 = row1.insertCell(1);
    var cell3 = row1.insertCell(2);
    // var cell3 = row2.insertCell(0);
    // var cell4 = row2.insertCell(1);

    cell1.innerHTML = festival.eventname;
    cell2.innerHTML = festival.entryprice;
    cell3.innerHTML = festival.date;

    detailedView.appendChild(table);

  },

  showImageGrid: function(festivals){

    var grid = document.getElementById('imageGrid');

    festivals.forEach(function(festival){

      var figure = document.createElement('figure');

      var image = document.createElement('img').src = festival.largeimageurl;

      var figureImage = figure.appendChild(image);

      grid.appendChild(figureImage);

    })

  },

  showDepartureAirports: function(){

    var input = document.getElementById('departureAirports');

    var departureAirportQuery = input.value

  }

  // displayNearbyAirports: function(departureAirports) {

  //   var select = document.getElementById('departureAirports');

  //   for(var i = 0; i < this.departureAirports.length; i++) {

  //     var option = document.createElement('option');

  //     option.innerHTML = this.departureAirports[i];

  //     option.value = this.departureAirports[i];

  //     select.appendChild(option);

  //   }


  // }

};

module.exports = View;








