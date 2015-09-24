var app = angular.module('parcMate', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures'
]);
app.run(function($transform) {
  window.$transform = $transform;
});

app.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl: '../../../home.html', reloadOnSearch: false});
  // $routeProvider.when('/scroll',        {templateUrl: 'scroll.html', reloadOnSearch: false});
  // $routeProvider.when('/toggle',        {templateUrl: 'toggle.html', reloadOnSearch: false});
  $routeProvider.when('/tabs',          {templateUrl: '../../../tabs.html', reloadOnSearch: false});
  // $routeProvider.when('/accordion',     {templateUrl: 'accordion.html', reloadOnSearch: false});
  // $routeProvider.when('/overlay',       {templateUrl: 'overlay.html', reloadOnSearch: false});
  // $routeProvider.when('/forms',         {templateUrl: 'forms.html', reloadOnSearch: false});
  // $routeProvider.when('/dropdown',      {templateUrl: 'dropdown.html', reloadOnSearch: false});
  // $routeProvider.when('/touch',         {templateUrl: 'touch.html', reloadOnSearch: false});
  // $routeProvider.when('/swipe',         {templateUrl: 'swipe.html', reloadOnSearch: false});
  // $routeProvider.when('/drag',          {templateUrl: 'drag.html', reloadOnSearch: false});
  // $routeProvider.when('/drag2',         {templateUrl: 'drag2.html', reloadOnSearch: false});
  // $routeProvider.when('/carousel',      {templateUrl: 'carousel.html', reloadOnSearch: false});
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
