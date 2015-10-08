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
    // if (view === 'find-garage') {
    //   loadScripts('assets/js/maps.js');
    //   loadScripts('https://maps.googleapis.com/maps/api/js?key=AIzaSyAOqMgt-ZS0td_lWiQYD6cSMQ5V9ID6MRI&callback=initMap');
    // }
    $rootScope.loading = false;
    scrollableOptions();
    findItemInScroll();
  });
});

// Mock/prototype behavior for control scroll.

function scrollableOptions () {
  var itemsWidth = 0;
  $('.scrollable-options .option').map(function (i) {
    j = i;
    itemsWidth = itemsWidth + $(this).outerWidth(true);
  });
  $('.scrollable-options').css('width', (itemsWidth+15));
}

function findItemInScroll () {
  var html = '<div class="col-xs-1 toggle"><a href="#" class="toggle"><i class="fa fa-chevron-left"></i></a></div>';
  $('.scrollable-options .option').map(function (i) {
    if (i === 2) {
      $(this).after(html)
    }
  });
}

function loadScripts (src) {
  var script = document.createElement('script');
  script.src = src;
  document.body.appendChild(script);
}
