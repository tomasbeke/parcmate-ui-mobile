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

      // Render Search Control
      var searchControlDiv = document.createElement('div');
      var renderSearchControlDiv = self.setSearchControl(searchControlDiv, self.pcMap);
      searchControlDiv.index = 2;

      // Render Map Locate Control
      var locateDiv = document.createElement('div');
      var renderLocateDiv = self.setLocateControl(locateDiv, self.pcMap);
      locateDiv.index = 3;


      // Render Filter Control
      var filterControlDiv = document.createElement('div');
      var renderFilterControlDiv = self.setFilterControl(filterControlDiv, self.pcMap);
      locateDiv.index = 4;

      self.pcMap.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomDiv);
      self.pcMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(locateDiv);
      self.pcMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(searchControlDiv);
      self.pcMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(filterControlDiv);

    },
    setZoomControl : function (div, map) {
      var controlDiv = div;
      // Set CSS for the controls.
      controlDiv.style.margin = '120px 0 0 15px';
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
      controlDiv.style.margin = '25px 15px 0 0';
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
    },
    setSearchControl : function (div, map) {
      var controlDiv = div;
      // Set CSS for search icon control
      controlDiv.style.margin = '75px 15px 0 0';
      controlDiv.style.cursor = 'pointer';
      controlDiv.style.backgroundRepeat = "no-repeat";
      controlDiv.style.height = '31px';
      controlDiv.style.width = '31px';
      // Sprite Class
      controlDiv.className = 'sprite sprite-search-glass';
      // Add events
      google.maps.event.addDomListener(controlDiv, 'click', function (e) {
        console.log(e)
        alert('Search Control')
      });
    },
    setFilterControl : function (div, map) {
      var controlDiv = div;
      // Set CSS for search icon control
      controlDiv.style.margin = '25px 15px 0 0';
      controlDiv.style.cursor = 'pointer';
      controlDiv.style.backgroundRepeat = "no-repeat";
      controlDiv.style.height = '31px';
      controlDiv.style.width = '27px';
      // Sprite Class
      controlDiv.className = 'sprite sprite-filter-big-blue';
      // Add events
      google.maps.event.addDomListener(controlDiv, 'click', function (e) {
        console.log(e)
        alert('Filter Control')
      });
    }
  }
}());
// Called in app.js loadScripts
function initGMap () {
  MapView.init();
}
