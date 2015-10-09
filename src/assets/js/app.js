// @codekit-prepend '../../../bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.min.js'
// @codekit-prepend '../../../bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.gestures.min.js'
// @codekit-prepend '../../../bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.core.min.js'
// @codekit-prepend '../../../bower_components/jquery/dist/jquery.js'

var app = angular.module('parcMate', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures'
]);

app.run(function($transform) {
  window.$transform = $transform;
});

app.config(function($routeProvider) {
  var arr = [
    'landing',
    'login',
    'forgot-email',
    'forgot-password',
    'find-garage',
    'style-guide'
  ]

  arr.forEach(function (el, i, array) {
    var root = '/';
    root = (el === 'landing') ? root : root + el;
    $routeProvider.when(root, {templateUrl: el+'.html', reloadOnSearch: false});
  });

});

app.controller('parcMateController', function ($rootScope, $scope) {

  $scope.swiped = function(direction) {
    alert('Swiped ' + direction);
  };
  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;

  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(e, toState){
    $rootScope.loading = true;
  });
  $rootScope.$on('$routeChangeSuccess', function(e, toState){
    var view = toState.$$route.originalPath.replace(/\//g, '');
    $rootScope.state = view;
    if (view === 'find-garage') {
      loadScripts('assets/js/maps.js');
      loadScripts('https://maps.googleapis.com/maps/api/js?key=AIzaSyAOqMgt-ZS0td_lWiQYD6cSMQ5V9ID6MRI&callback=initGMap');
    }
    $rootScope.loading = false;
    initHelpers();
  });
});

// Mock/prototype behavior for control scroll.

function initHelpers() {
  scrollableOptions();
  findItemInScroll();
  registerScroll();
}

function scrollableOptions () {
  var itemsWidth = 0;
  $('.scrollable-options .option').map(function (i) {
    itemsWidth = itemsWidth + $(this).outerWidth(true);
  });
  $('.scrollable-options').css('width', (itemsWidth+15));
}

function findItemInScroll () {
  var html = '<div class="col-xs-1 toggle"><a href="#"><i class="fa fa-chevron-left"></i></a></div>';
  $('.scrollable-options .option').map(function (i) {
    if (i === 2) {
      $(this).after(html)
    }
  });
}

function registerScroll () {
  $('.options').on('scroll', function (a, b) {
    var containerLPos = $('.options').position().left,
        containerRPos = containerLPos+$('.options').outerWidth(),
        toggleLPos = $('.toggle').position().left;

    var item3 = $('.options').find('.option').eq(2);

    var item = $('.options').find('.option').length,
        itemW = containerRPos/item,
        thirdItem = itemW*5,
        containerRelPos = containerRPos-itemW
        resetPos = containerRelPos + item3.position().left

    //console.log(item3.position().left, containerLPos)

    if (toggleLPos <= containerLPos) {

      $('.toggle')
        .addClass('fixed')
        .find('.fa')
        .removeClass('fa-chevron-left')
        .addClass('fa-chevron-right');

      containerLPos = thirdItem;

      console.log(
        'item width: ' + itemW,
        '3rd item: '+ thirdItem,
        'container left pos: ' + containerLPos,
        'container right pos ' + containerRPos,
        'toggle pos: ' + toggleLPos,
        'container relative pos: ' + containerRelPos
      )
      console.log(containerLPos, resetPos, ' IF')

    }

    if (resetPos >= containerLPos) {

      $('.toggle')
        .removeClass('fixed')
        .find('.fa')
        .removeClass('fa-chevron-right')
        .addClass('fa-chevron-left');

      console.log(
        'item width: '+containerRPos/item,
        '3rd item: '+ (containerRPos/item)*3,
        'container left pos: '+containerLPos,
        'container right pos '+containerRPos,
        'toggle pos: ' + toggleLPos,
        'container relative pos: '+ (containerRPos-toggleLPos)
      )
      console.log(item3.position().left, containerLPos, ' ELSE')
    }
  });
}

function loadScripts (src) {
  var script = document.createElement('script');
  script.src = src;
  document.body.appendChild(script);
}
