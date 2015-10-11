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
      xtransform,
      velocity,
      frame,
      timestamp,
      ticker,
      amplitude,
      target,
      timeConstant,
      count,
      snap;


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
      // Add third item as toggle column
      // TODO: Come up with better way; temp.
      // var html = '<div class="col-xs-1 option toggle"><a href="#"><i class="fa fa-chevron-left"></i></a></div>';
      // $('.scrollable-options .option').map(function (i) {
      //   if (i === 2) {
      //     $(this).after(html)
      //   }
      // });

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
      timeConstant = 325;

      // Get snap point
      snap = parseInt(getComputedStyle(document.getElementsByClassName('option')[0]).width, 10);
      count = 143;
      max = (count - 5) * snap;

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
      self.togglePosition();
    },

    tap : function (e) {
      pressed = true;
      reference = self.xPosition(e);

      velocity = amplitude = 0;
      frame = offset;
      timestamp = Date.now();
      clearInterval(ticker);
      ticker = setInterval(self.track, 100);

      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    track : function () {
      var now,
          elapsed,
          delta,
          v;
      now = Date.now();
      elapsed = now - timestamp;
      timestamp = now;
      delta = offset - frame;
      frame = offset;

      v = 1000 * delta / (1 + elapsed);
      velocity = 0.8 * v + 0.2 * velocity;
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
      pressed = false;
      clearInterval(ticker);
      target = offset;
      if (velocity > 10 || velocity < -10) {
        amplitude = 0.8 * velocity;
        target = offset + amplitude;
      }
      target = Math.round(target / snap) * snap;
      amplitude = target - offset;
      timestamp = Date.now();
      requestAnimationFrame(self.autoScroll);
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
    },
    autoScroll : function () {
      var elapsed,
          delta;
      if (amplitude) {
        elapsed = Date.now() - timestamp;
        delta = -amplitude * Math.exp(-elapsed / timeConstant);
        if (delta > 0.5 || delta < -0.5) {
            self.xScroll(target + delta);
            requestAnimationFrame(self.autoScroll);
        } else {
            self.xScroll(target);
        }
      }
    },
    // Set toggle position
    togglePosition : function () {
      $('.options').on('scroll', function (e) {
        console.log(e)
      });
    }
  }

}(this, $));
