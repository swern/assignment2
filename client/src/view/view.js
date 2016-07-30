var View = function(){
  this.map = ''
  this.center = ''
}

View.prototype = {

  initialize: function(){

    navigator.geolocation.getCurrentPosition(function(position){
      this.center = { lat: position.coords.latitude, lng: position.coords.longitude }
      var mapDiv = document.getElementById('map');
      this.map = new google.maps.Map(mapDiv,{
        center:this.center,
        zoom: 6
      });    
    })
  },

  showFestivals: function(festivals){

    navigator.geolocation.getCurrentPosition(function(position){
      this.center = { lat: position.coords.latitude, lng: position.coords.longitude }
      var mapDiv = document.getElementById('map');
      this.map = new google.maps.Map(mapDiv,{
        center:this.center,
        zoom: 6
      });

      for (festival of festivals.results){
        var pos = { lat: festival.venue.latitude, lng: festival.venue.longitude }
        var marker = new google.maps.Marker({
           position: pos,
           map: this.map,
        })
      }          
    })
  }
}

module.exports = View;

