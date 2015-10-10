// Mock/prototype behavior for control kinetic scroll.

// Called in app.js
var GarageControls = (function (self, $) {

  var controlsSettings = {
    container : $('.scrollable-options')
  }

  return {
    init : function () {
      var self = this;
      self.setControlsContainer();
    },
    setControlsContainer : function () {
      var container = controlsSettings.container,
          items = container.children('.option'),
          itemCount,
          itemWidth;
      $.each(items, function (i, v) {
        itemCount = i+1,
        itemWidth = $(v).outerWidth();
      });
      container.width(itemCount*itemWidth);
      // set width
      container.width();
    },
    setControlsState : function () {
    }
  }

}(this, $));
