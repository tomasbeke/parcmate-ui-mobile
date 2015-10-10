// Mock/prototype behavior for control kinetic scroll.
// Scroll based on Ariya Hidayat kinetic scroll algorithm
// http://ariya.ofilabs.com/2013/08/javascript-kinetic-scrolling-part-1.html

// TODO: jQuery Kinetic Plugin http://davetayls.me/jquery.kinetic/

// Called in app.js
var GarageControls = (function (self, $) {
  'use strict';

  var self,
      container,
      min,
      max,
      offset,
      reference,
      pressed,
      xtransform;

  var controlsSettings = {
    container : document.getElementById('scrollable-options')
  }

  return {
    init : function () {
      self = this;
      self.setControlsContainer();
      $(window).on('resize', function () {
        self.setControlsContainer();
      });
    },
    setControlsContainer : function () {
      var view = $('.scrollable-options');

      var items = view.children('.option'),
          itemCount,
          itemWidth;
      $.each(items, function (i, v) {
        itemCount = i+1,
        itemWidth = $(v).outerWidth();
      });
      view.width(itemCount*itemWidth);
      // set width
      view.width();
      self.setControlsState();
    },
    setControlsState : function () {
      self = this;
      container = controlsSettings.container;
      if (typeof window.ontouchstart !== undefined) {
        container.addEventListener('touchstart', self.tap);
        container.addEventListener('touchmove', self.drag);
        container.addEventListener('touchend', self.release);
      }
      container.addEventListener('mousedown', self.tap);
      container.addEventListener('mousemove', self.drag);
      container.addEventListener('mouseup', self.release);

      max = parseInt(getComputedStyle(container).width, 10) - innerWidth;
      offset = min = 0;
      pressed = false;
      // Adjust container postion with CSS3 transform
      xtransform = 'transform';
      ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
          var e = prefix + 'Transform';
          if (typeof container.style[e] !== 'undefined') {
              xtransform = e;
              return false;
          }
          return true;
      });
    },

    tap : function (e) {
      $('#map').html(e.type);
      pressed = true;
      reference = self.xPosition(e);
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    drag : function (e) {
      var x, delta;
      if (pressed) {
          x = self.xPosition(e);
          delta = reference - x;
          if (delta > 2 || delta < -2) {
              reference = x;
              self.xScroll(offset + delta);
          }
      }
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    release : function (e) {
      $('#map').html(e.type);
      pressed = false;
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    xPosition : function (e) {
      if (e.targetTouches && (e.targetTouches.length >= 1)) {
        return e.targetTouches[0].clientX;
      }
    },
    xScroll : function (x) {
      offset = (x > max) ? max : (x < min) ? min : x;
      container.style[xtransform] = 'translateX(' + (-offset) + 'px)';
      $('#map').html(x)
    }
  }

}(this, $));
