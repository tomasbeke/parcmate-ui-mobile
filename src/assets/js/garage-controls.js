// Mock/prototype behavior for control kinetic scroll.

// Called in app.js
var GarageControls = (function (self, $) {
  'use strict';

  var self,
      container,
      min,
      max,
      offset,
      reference,
      pressed;

  var controlsSettings = {
    container : $('.scrollable-options')
  }

  return {
    init : function () {
      self = this;
      self.setControlsContainer();
    },
    setControlsContainer : function () {
      container = controlsSettings.container;
      var items = container.children('.option'),
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
      self = this;
      container = controlsSettings.container;
      if (typeof window.ontouchstart !== undefined) {
        alert('true')
        container.on('touchstart', self.tap);
        container.on('touchmove', self.drag);
        container.on('touchend', self.release);
      }
      container.on('mousedown', self.tap);
      container.on('mousemove', self.drag);
      container.on('mouseup', self.release);
    },

    tap : function () {},
    drag : function () {},
    release : function () {},

    xPosition : function (e) {
      if (e.targetTouches && (e.targetTouches.length >= 1)) {
        return e.targetTouches[0].clientX;
      }
    },
    xScroll : function (x) {
      offest = (x > max) ? (x < min) ? min : x;
      container.style[xform] = 'translateX(' + (-offset) + 'px)';
    }
  }

}(this, $));
