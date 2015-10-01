// @codekit-prepend '../../../bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.min.js'
// @codekit-prepend '../../../bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.gestures.min.js'
// @codekit-prepend '../../../bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.core.min.js'

var app = angular.module('parcMate', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures'
]);
app.run(function($transform) {
  window.$transform = $transform;
});

app.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'landing.html', reloadOnSearch: false});
  $routeProvider.when('/login', {templateUrl: 'login.html', reloadOnSearch: false});
  $routeProvider.when('/style-guide', {templateUrl: 'style-guide.html', reloadOnSearch: false});
});

app.controller('parcMateController', function ($rootScope, $scope) {
  $scope.swiped = function(direction) {
    alert('Swiped ' + direction);
  };

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;

  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });

  // Fake text i used here and there.
  $scope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';

  //
  // 'Scroll' screen
  //
  var scrollItems = [];

  for (var i=1; i<=100; i++) {
    scrollItems.push('Item ' + i);
  }

  $scope.scrollItems = scrollItems;

  $scope.bottomReached = function() {
    /* global alert: false; */
    alert('Congrats you scrolled to the end of the list!');
  };
});
