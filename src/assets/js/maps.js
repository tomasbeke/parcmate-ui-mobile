var map;

function initMap () {
  var mapOptions = {
    zoom : 8,
    center : {lat: -34.397, lng: 150.644},
    mapTypeControl : false,
    streetViewControl : true,
    styleOptions : {
      style : google.maps
    },
    rotateControl : true
    //disableDefaultUI : true
  }
  console.log(mapOptions)
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
