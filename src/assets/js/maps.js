var map;

function initMap () {
  var mapOptions = {
    zoom : 15,
    center : {lat: 40.748817, lng: -73.985428},
    mapTypeControl : false,
    streetViewControl : true,
    styleOptions : {
      style : google.maps
    },
    rotateControl : true
    //disableDefaultUI : true
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
