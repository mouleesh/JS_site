
'use strict';

// angular.js main app initialization
var app = angular.module('example359', []).
    config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
        when('/', { 
      	  templateUrl: 'main.html', 
      	  activetab: 'projects', 
      	  controller: 'HomeCtrl' 
      	}).
        when('/career', {
          templateUrl: 'career.html',
          controller: 'CareerCtrl',
          activetab: 'career'
        }).
        when('/services', {
          templateUrl: 'services.html',
          controller: 'ServicesCtrl',
          activetab: 'services'
        }).
	      when('/works', {
          templateUrl: 'works.html',
          controller: 'WorksCtrl',
          activetab: 'works'
        }).
        when('/about', {
          templateUrl: 'about.html',
          controller: 'AboutCtrl',
          activetab: 'about'
        }).
        otherwise({ redirectTo: '/' });
    }]).run(['$rootScope', '$http', '$browser', '$timeout', "$route", function ($scope, $http, $browser, $timeout, $route) {

        $scope.$on("$routeChangeSuccess", function (scope, next, current) {
          $scope.part = $route.current.activetab;
        });

        // onclick event handlers
        $scope.showForm = function () {
          $('.contactRow').slideToggle();
        };
        $scope.closeForm = function () {
          $('.contactRow').slideUp();
        };

        // save the 'Contact Us' form
        $scope.save = function () {
          $scope.loaded = true;
          $scope.process = true;
          $http.post('sendemail.php', $scope.message).success(function () {
              $scope.success = true;
              $scope.process = false;
          });
        };
  }]);

app.config(['$locationProvider', function($location) {
    $location.hashPrefix('!');
}]);

app.controller("HomeCtrl", function ($scope) {

});

app.controller("CareerCtrl",['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
    $scope.$on('$viewContentLoaded', function() {
       $location.hash('scroll-to-career');
       $anchorScroll();
    });
    $(".nav li a").not(".activeSmall").blur()
}]);

app.controller("ServicesCtrl", ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) { 
     $scope.pageName = 'page-service';
     $('.emptyDiv').addClass("page-contact");
     $scope.$on('$viewContentLoaded', function() {
        $location.hash('scroll-to-service');
        $anchorScroll();
     });
     $(".nav li a").not(".activeSmall").blur()
}]);

app.controller("AboutCtrl", ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
     $scope.$on('$viewContentLoaded', function() {
        $location.hash('scroll-to-about');
        $anchorScroll();
     });
      $('.emptyDiv').addClass("page-about");
      $(".nav li a").not(".activeSmall").blur()
}]);

app.controller("WorksCtrl",  ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
    
    $scope.$on('$viewContentLoaded', function() {
        $location.hash('scroll-to-work');
        $anchorScroll();
    });

    $(".nav li a").not(".activeSmall").blur()

    $scope.hoverProjectEdit = true;
    $scope.hoverClientEdit = true;

    $scope.hoverInProject = function(){

	      $( ".left-image" ).toggle( "slide", { direction: "left" } );
    };

    $scope.hoverOutProject = function(){
        $( ".left-image" ).toggle("slide" , {direction: "left"}, 100).delay(2000);
    };

    $scope.hoverInClient = function(){
        $( ".right-image" ).toggle( "slide", { direction: "right" } );
    };

    $scope.hoverOutClient = function(){
        $( ".right-image" ).toggle( "slide", { direction: "right" }, 100).delay(1000);
    };
}]);
