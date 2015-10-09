var map;

function initMap () {
  var mapOptions = {
    zoom : 15,
    center : {lat: 40.748817, lng: -73.985428},
    // Street View
    streetViewControl : true,
    streetViewControlOptions : {},
    // Zoom Control
    zoomControl: true,
    zoomControlOptions : {},
    // Map Type Control
    mapTypeControl: true,
    mapTypeControlOptions : {},
    // scaleControl: true,
    // streetViewControl: true,
    // rotateControl : true
    //disableDefaultUI : true
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
