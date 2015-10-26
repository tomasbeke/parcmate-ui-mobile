var accordion = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom : function () {
    this.$elTrigger = $('.js-trigger');
  },
  bindEvents : function () {
    this.$elTrigger.on('click', this.elExpand);
  },
  elExpand : function (e) {
    e.preventDefault();
    var $el = $(this),
        $elArrow = $el.children('.icon'),
        $elContent = $el.parent().next('.section-body'),
        $elParent = $el.parents('.info-section'),
        $elSiblings = $elParent.siblings();

    if (!$elParent.hasClass('is-expanded')) {
      $elParent.addClass('is-expanded');
      $elSiblings.removeClass('is-expanded');
      $elArrow.removeClass('icon-angle-down').addClass('icon-angle-up');
    } else {
      $elParent.removeClass('is-expanded');
      $elArrow.removeClass('icon-angle-up').addClass('icon-angle-down');
    }
  }
};
