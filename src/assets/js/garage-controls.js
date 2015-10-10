// Mock/prototype behavior for control scroll.

// Called in app.js
var GarageControls = (function (self, $) {

  var controlsObj = {}

  return {
    init : function () {
      var self = this;
      self.setControlsContainer();
    },
    setControlsContainer : function () {
      var itemsContainer = $('.scrollable-options'),
          items = itemsContainer.children('.option'),
          itemCount,
          itemWidth;
      $.each(items, function (i, v) {
        itemCount = i+1,
        itemWidth = $(v).outerWidth();
      });
      itemsContainer.width(itemCount*itemWidth);
      // set width
      itemsContainer.width();
    }
  }

}(this, $));
