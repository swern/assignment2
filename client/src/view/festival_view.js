addMarker: function(center){
  var marker = new google.maps.Marker({
    position: center,
    map: this.map,
  })
}


showFestivals: function(festivals){
  navigator.geolocation.getCurrentPosition(function(position){
    this.center = { lat: position.coords.latitude, lng: position.coords.longitude }
    var mapDiv = document.getElementById('map');
    this.map = new google.maps.Map(mapDiv,{
      center:this.center,
      zoom: 6
    });
    festivals.forEach(function(festival){      
      var pos = { lat: festival.venue.latitude, lng: festival.venue.longitude }
      var marker = new google.maps.Marker({
        position: center,
        map: this.map,
      })
    })
  })
}

