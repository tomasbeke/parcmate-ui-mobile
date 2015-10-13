// GMap Controls

var MapView = (function () {
  'use strict';

  var initPosition = {lat: 40.748817, lng: -73.985428}

  var mapOptions = {
    zoom : 15,
    center : initPosition,
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

      setMapObject({
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

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

      self.setMarkers(self.pcMap);

    },
    // Markers
    setMarkers : function (map) {
      var self = this;
      var iconsPath = 'assets/images/map-icons/';
      // Set multiple markers
      var icons = {
        current : iconsPath + 'pin-current-location.png',
        best : iconsPath + 'pin-best-orange.png',
        closest : iconsPath + 'pin-closet-baby-blue.png',
        cheapest : iconsPath + 'pin-cheapest-green.png',
        other : iconsPath + 'pin-other-gray.png',
        parked : iconsPath + 'pin-parked-blue.png',
        findGarage : iconsPath + 'pin-find-garage-blue.png'
      }

      // TODO: Multiple Featured Markers

      var markerCurrentLocation = new google.maps.Marker({
        position: mapOptions.center,
        map: map,
        icon: iconsPath + 'pin-current-location.png'
      });

      markerCurrentLocation.setMap(map)
    },
    addMarkers : function (feature, icons) {
      var marker = new google.maps.Marker({
        position: feature.position,
        icon: icons[feature.type].icon,
        map: map
      });
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
              map : map,
              icon : 'assets/images/map-icons/pin-current-location.png'
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
      var self = this;
      var controlDiv = div;
      // Set CSS for search icon control
      controlDiv.style.margin = '75px 15px 0 0';
      controlDiv.style.cursor = 'pointer';
      controlDiv.style.backgroundRepeat = "no-repeat";
      controlDiv.style.height = '31px';
      controlDiv.style.width = '31px';
      // Sprite Class
      controlDiv.className = 'sprite sprite-search-glass';
      // Set Search
      var container = $('.search-container');
      var input = document.getElementById('search-box'),
          searchBox = new google.maps.places.SearchBox(input);

      self.setPlacesSearchBox(searchBox, self.pcMap, input);
      // Add events
      google.maps.event.addDomListener(controlDiv, 'click', function (e) {
        // Render Search
        container.show();
        e.stopPropagation()
        e.preventDefault();
        return false;
      });
      self.stopEvent($('.close', container), 'click touchend', function () {
        $(input).val('');
      });
      self.stopEvent($(input), 'click tochend');
      // TODO: FIND EVENT THAT CLOSES SEARCH DROPDOWN
      // self.stopEvent($('.pac-item'), 'mouseout');
      self.stopEvent($('.pac-container').find('*'), 'mouseout');
      $('html').on('click', function (e) {
        container.hide();
      });
    },
    setPlacesSearchBox : function (el, map, input) {
      var markers = [];
      var bounds = new google.maps.LatLngBounds();

      map.addListener('bounds_changed', function() {
        el.setBounds(map.getBounds());
      });

      el.addListener('places_changed', function () {
        var places = el.getPlaces();

        if (places.length == 0) {
          return;
        }
        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        places.forEach(function(place) {
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);

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
    },
    stopEvent : function (el, e, callback) {
      el.on(e, function (event) {
        if (typeof callback === 'function' && callback !== undefined) {
          callback();
        }
        event.stopPropagation()
        event.preventDefault();
        return false;
      });
    }
  }
}());
// Called in app.js loadScripts
function initGMap () {
  MapView.init();
}
