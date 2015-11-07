var tabs = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom : function () {
    this.$elTrigger = $('.tab a');
  },
  bindEvents : function () {
    this.$elTrigger.on('click', this.elTab);
  },
  elTab : function (e) {
    e.preventDefault();

    var $el = $(this),
        $elClass = $el.attr('class'),
        $elParent = $el.parents('.tab'),
        $elSiblings = $elParent.siblings(),
        $tabsContainer = $('.tabs-container'),
        $elSprite = $el.siblings('.sprite');

    $elSiblings.removeClass('active')
    $elParent.addClass('active')

    $tabsContainer.find('.'+$elClass)
                  .addClass('active')
                  .siblings()
                  .removeClass('active');

  }
};
