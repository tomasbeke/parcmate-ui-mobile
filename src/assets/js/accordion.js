var accordion = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
    console.log(this)
  },
  cacheDom : function () {
    this.$elTrigger = $('.js-accordion-trigger');
  },
  bindEvents : function () {
    this.$elTrigger.on('click', this.elExpand);
  },
  elExpand : function (e) {}
};
