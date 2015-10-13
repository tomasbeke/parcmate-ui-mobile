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

      // Push DOM
      self.pcMap.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomDiv);
      self.pcMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(locateDiv);
      self.pcMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(searchControlDiv);
      self.pcMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(filterControlDiv);

      // Add markers to map
      self.setMarkers(self.pcMap);

    },
    // Set Markers
    setMarkers : function (map) {

    // TODO: Unfortunately, there is no way to set
    // dynamic text content in the marker object
    // so an overlay needs to be used (with lat/long props)
    // to mimic marker functionality

      var self = this,
          iconsPath = 'assets/images/map-icons/';

      // ALL OPTIONS FOR EXISTING MARKERS
      // var icons = {
      //   current : iconsPath + 'pin-current-location.png',
      //   best : iconsPath + 'pin-best-orange.png',
      //   closest : iconsPath + 'pin-closet-baby-blue.png',
      //   cheapest : iconsPath + 'pin-cheapest-green.png',
      //   other : iconsPath + 'pin-other-gray.png',
      //   parked : iconsPath + 'pin-parked-blue.png',
      //   findGarage : iconsPath + 'pin-find-garage-blue.png'
      // }

      var icons = {
        current : {
          position : mapOptions.center,
          icon : iconsPath + 'pin-current-location.png',
          opacity : 1,
          clickable : true,
          draggable : true
        },
        best : {
          position : new google.maps.LatLng(40.7528,-73.9765),
          icon : iconsPath + 'pin-best-orange.png',
          opacity : 1,
          clickable : false,
          draggable : false
        },
        closest : {
          position : new google.maps.LatLng(40.7567,-73.9911),
          icon : iconsPath + 'pin-closet-baby-blue.png',
          opacity : 1,
          clickable : false,
          draggable : false
        },
        cheapest : {
          position : new google.maps.LatLng(40.7577,-73.97911),
          icon : iconsPath + 'pin-cheapest-green.png',
          opacity : 1,
          clickable : false,
          draggable : false
        },
        other : {
          position : new google.maps.LatLng(40.7497,-73.9831),
          icon : iconsPath + 'pin-other-gray.png',
          opacity : 0.8,
          clickable : false,
          draggable : false
        },
        other_0 : {
          position : new google.maps.LatLng(40.7567,-73.9831),
          icon : iconsPath + 'pin-other-gray.png',
          opacity : 0.5,
          clickable : false,
          draggable : false
        }
      };

      for (var feature in icons) {
        var prop = icons[feature];
        var marker = new google.maps.Marker({
          title : 'test title',
          position : prop.position,
          icon : prop.icon,
          opacity : prop.opacity,
          clickable : prop.clickable,
          draggable : prop.draggable,
          map : map
        });
        // Add listener on marker itself
        google.maps.event.addDomListener(marker, 'click', (function (marker, prop) {
          return function () {
            // do something on click
            console.log(marker, prop);
            // Temp content for info window
            var infowindow = new google.maps.InfoWindow({
              content : 'This is a test info window. This marker is draggable.'
            });
            infowindow.open(map, marker)
          }
        })(marker, prop));
      }


    },
    addMarkers : function (map) {
      var self = this;
      // Pass to Garage Controls to add new markers on click
      console.debug('addMarkers called');
      // self.setMarkers(self.pcMap);
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
