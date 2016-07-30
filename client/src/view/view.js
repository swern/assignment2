var View = function(){
  this.map = '';
  this.center = '';
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
  }
}

module.exports = View;

