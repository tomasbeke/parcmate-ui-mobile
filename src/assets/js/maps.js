// GMap Controls

var MapView = (function () {
  'use strict';

  var mapOptions = {
    zoom : 15,
    center : {lat: 40.748817, lng: -73.985428},
    disableDefaultUI : true
  }
  // Function for pushing necessary
  // default values to map options object
  function setMapObject (obj) {
    for (var key in mapOptions) {
      if (obj) {
        for (var val in obj) {
          key = val;
          mapOptions[key] = obj[val];
        }
      }
    }
    return mapOptions;
  }

  return {
    init : function () {
      var self = this;

      self.pcMap = new google.maps.Map(document.getElementById('map'), mapOptions);

      // Render Custom Zoom Controls
      var zoomDiv = document.createElement('div');
      var renderZoomControls = self.setZoomControl(zoomDiv, self.pcMap);
      zoomDiv.index = 1;

      // Render Map Locate Control
      var locateDiv = document.createElement('div');
      var renderLocateDiv = self.setLocateControl(locateDiv, self.pcMap);
      locateDiv.index = 2;

      self.pcMap.controls[google.maps.ControlPosition.LEFT_CENTER].push(zoomDiv);
      self.pcMap.controls[google.maps.ControlPosition.RIGHT_CENTER].push(locateDiv);

    },
    setZoomControl : function (div, map) {
      var controlDiv = div;
      // Set CSS for the controls.
      controlDiv.style.margin = '-200px 0 0 15px';
      controlDiv.style.cursor = 'pointer';
      controlDiv.style.height = '26px';
      controlDiv.style.width = '54px';

      controlDiv.className = 'sprite sprite-check-in-out'

      var zoomin = document.createElement('div');
      zoomin.title = 'Click to zoom in';
      zoomin.style.display = "inline-block"
      zoomin.style.width = '50%';
      zoomin.style.height = '100%';

      controlDiv.appendChild(zoomin);

      var zoomout = document.createElement('div');
      zoomout.title = 'Click to zoom out';
      zoomout.style.display = "inline-block"
      zoomout.style.width = '50%';
      zoomout.style.height = '100%';

      controlDiv.appendChild(zoomout);

      // Setup the click event listeners for zoom-in, zoom-out:
      google.maps.event.addDomListener(zoomout, 'click', function() {
       var currentZoomLevel = map.getZoom();
       if(currentZoomLevel != 0){
         map.setZoom(currentZoomLevel - 1);}
      });

       google.maps.event.addDomListener(zoomin, 'click', function() {
       var currentZoomLevel = map.getZoom();
       if(currentZoomLevel != 21){
         map.setZoom(currentZoomLevel + 1);}
      });
    },
    handleLocationError : function (browserHasGeolocation, locationMarker, pos) {
      locationMarker.setPosition(pos);
      //locationMarker.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    },
    setLocateControl : function (div, map) {
      var controlDiv = div;
      // Set CSS for the controls.
      controlDiv.style.margin = '-200px 15px 0 0';
      controlDiv.style.cursor = 'pointer';
      controlDiv.style.backgroundRepeat = "no-repeat";
      controlDiv.style.height = '31px';
      controlDiv.style.width = '31px';
      // Sprite Class
      controlDiv.className = 'sprite sprite-locate-me'
      // Event Listener for getting current location
      google.maps.event.addDomListener(controlDiv, 'click', function (e) {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            map.setCenter(pos);
            // Create Marker
            var locationMarker = new google.maps.Marker({
              position : pos,
              map : map
            });
          }, function () {
            self.handleLocationError(true, locationMarker, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          self.handleLocationError(false, locationMarker, map.getCenter());
        }
      });
    }
  }
}());

function initGMap () {
  MapView.init();
}
