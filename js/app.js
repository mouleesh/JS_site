
'use strict';

// angular.js main app initialization
var app = angular.module('example359', []).
    config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider ) {
    $locationProvider.html5Mode(true);
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

    $scope.scrollToTop = function($var) {
        // 'html, body' denotes the html element, to go to any other custom element, use '#elementID'
        $('html, body').animate({
            scrollTop: 0
        }, 3000); // 'fast' is for fast animation
    };
    $('.navbar-toggle').click(function(){
        $('#navbar').toggle("slow");
    });
        $('.nav').click(function(){
            if (window.matchMedia('(max-width: 767px)').matches) {
                $('#navbar').hide();
            }else{
                $('#navbar').show();
            }
        });

  }]);

app.config(['$locationProvider', function($location) {
    $location.hashPrefix('!');
}]);

app.controller("HomeCtrl", function ($scope) {

});

app.controller("CareerCtrl",['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {

    $(".nav li a").not(".activeSmall").blur()
}]);

app.controller("ServicesCtrl", ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) { 
     $scope.pageName = 'page-service';
     $('.emptyDiv').addClass("page-contact");
     $(".nav li a").not(".activeSmall").blur()
    var url = $location.hash();
    $location.hash('scroll-to-service');
    $anchorScroll();
    $location.hash(url);
}]);

app.controller("AboutCtrl", ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
    var url = $location.hash();
    $location.hash('scroll-to-about');
    $anchorScroll();
    $location.hash(url);



    $scope.scrollToTop = function($var) {
        // 'html, body' denotes the html element, to go to any other custom element, use '#elementID'
        $('html, body').animate({
            scrollTop: 0
        }, 3000); // 'fast' is for fast animation
    };
}]);

app.controller("WorksCtrl",  ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {

    $(".nav li a").not(".activeSmall").blur()

    $scope.hoverProjectEdit = true;
    $scope.hoverClientEdit = true;

    $scope.scrollToTop = function($var) {
        // 'html, body' denotes the html element, to go to any other custom element, use '#elementID'
        $('html, body').animate({
            scrollTop: 0
        }, 3000); // 'fast' is for fast animation
    };

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
