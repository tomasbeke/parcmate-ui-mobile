// Gmap Controls
var map = (function () {
  var mapOptions = {
    zoom : 15,
    center : {lat: 40.748817, lng: -73.985428}
  }
  function initMap (obj) {
    for (var key in mapOptions) {
      if (obj) {
        for (var val in obj) {
          key = val;
          mapOptions[key] = obj[val];
        }
      }
    }
    console.log(mapOptions)
    return mapOptions;
  }
  return {
    init : function () {
      map.setZoom();
      map.setStreetView();
      map.setMapType();
      // Load Map
      var pcMap = new google.maps.Map(document.getElementById('map'), mapOptions);
    },
    setZoom : function () {
      var zoomObj = {
        zoomControl : true,
        zoomControlOptions : {
          position : google.maps.ControlPosition.LEFT_CENTER
        }
      }
      initMap(zoomObj);
    },
    setStreetView : function () {
      var streetView = {
        streetViewControl : true,
        streetViewControlOptions : {
          position : google.maps.ControlPosition.LEFT_CENTER
        }
      }
      initMap(streetView);
    },
    setMapType : function () {
      var mapTypeControl = {
        mapTypeControl : true,
        mapTypeControlOptions : {
          position : google.maps.ControlPosition.LEFT_CENTER
        }
      }
      initMap(mapTypeControl);
    }
  }
}());

function initGMap () {
  map.init();
}
