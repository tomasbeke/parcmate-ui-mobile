// @codekit-prepend '../../../bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.min.js'
// @codekit-prepend '../../../bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.gestures.min.js'
// @codekit-prepend '../../../bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.core.min.js'
// @codekit-prepend '../../../bower_components/jquery/dist/jquery.min.js'

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
    'landing-signedin',
    'login',
    'login-error',
    'forgot-email',
    'forgot-password',
    'find-garage',
    'checkin',
    'checkout',
    'garage-info-window',
    'modal-filter',
    'style-guide',
    'sprite-guide'
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

  removeItem($scope);

  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(e, toState){
    $rootScope.loading = true;
  });
  $rootScope.$on('$routeChangeSuccess', function(e, toState){
    var view = toState.$$route.originalPath.replace(/\//g, '');

    var uri = {
      path : 'https://maps.googleapis.com/maps/api/js',
      key : 'AIzaSyAOqMgt-ZS0td_lWiQYD6cSMQ5V9ID6MRI',
      callback : 'initGMap',
      places : 'places'
    }

    $rootScope.state = view;
    // TODO: Come up with way to not load multiple times.
    if (view === 'find-garage') {
      loadScripts('assets/js/maps.js');
      loadScripts('assets/js/garage-controls.js');
      loadScripts(uri.path+'?key='+uri.key+'&libraries='+uri.places+'&callback='+uri.callback);
    }
    $rootScope.loading = false;
  });
});

function loadScripts (src) {
  var script = document.createElement('script');
  script.src = src;
  document.body.appendChild(script);
}

function removeItem ($scope) {
  $scope.$on('$viewContentLoaded', function () {
    var item = $('.reservation');
    $.each(item, function (i, v) {
      var self = $(this);
      self.find('.close').on('click', function () {
        self.remove();
        return false;
      })
    });
  })
}
