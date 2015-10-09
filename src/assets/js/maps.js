// Gmap Controls
var MapView = (function () {
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

      self.pcMap.controls[google.maps.ControlPosition.LEFT_CENTER].push(zoomDiv);

    },
    setZoomControl : function (div, map) {
      var controlDiv = div;
      // Set CSS for the controls.
      controlDiv.style.margin = '-200px 0 0 15px';
      controlDiv.style.cursor = 'pointer';
      controlDiv.style.border = "1px solid #000"
      controlDiv.style.opacity = "0.9";
      controlDiv.style.backgroundColor = "transparent";
      controlDiv.style.height = '100px';
      controlDiv.style.width = '100px';

      var zoomout = document.createElement('div');
      zoomout.title = 'Click to zoom out';
      zoomout.style.display = "inline-block"
      zoomout.style.borderRight = "1px solid #000"
      zoomout.style.width = '50%';
      zoomout.style.height = '100%';
      controlDiv.appendChild(zoomout);

      var zoomoutText = document.createElement('div');
      zoomoutText.innerHTML = '<strong>-</strong>';
      zoomoutText.style.fontSize = '30px';
      zoomoutText.style.marginTop = '3px';
      zoomoutText.style.textAlign = 'center';
      zoomoutText.style.color = "#9e9e9e"
      zoomout.appendChild(zoomoutText);

      var zoomin = document.createElement('div');
      zoomin.title = 'Click to zoom in';
      zoomin.style.display = "inline-block"
      zoomin.style.width = '50%';
      zoomin.style.height = '100%';
      controlDiv.appendChild(zoomin);

      var zoominText = document.createElement('div');
      zoominText.innerHTML = '<strong>+</strong>';
      zoominText.style.fontSize = '30px';
      zoominText.style.textAlign = 'center';
      zoominText.style.color = "#9e9e9e"
      zoomin.appendChild(zoominText);

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
    }
  }
}());

function initGMap () {
  MapView.init();
}
