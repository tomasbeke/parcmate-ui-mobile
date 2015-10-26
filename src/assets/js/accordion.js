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
        $elContent = $el.parent().next('.section-body'),
        $elParent = $el.parents('.info-section'),
        $elSiblings = $elParent.siblings();

    if (!$elParent.hasClass('is-expanded')) {
      $elParent.addClass('is-expanded');
      $elSiblings.removeClass('is-expanded');
    } else {
      $elParent.removeClass('is-expanded');
    }
  }
};
