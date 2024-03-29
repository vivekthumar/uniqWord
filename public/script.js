var scotchApp = angular.module('imageGallery', ['ngRoute','ui.bootstrap','angularUtils.directives.dirPagination','ngDialog']);
scotchApp.config(function($routeProvider,$locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'homeController'
        })
        .when('/list', {
            templateUrl : 'pages/list.html',
            controller  : 'listController'
        })
        .when('/alphalist', {
            templateUrl : 'pages/alpha.html',
            controller  : 'aplhalistController'
        })
        .otherwise({
            templateUrl : 'pages/home.html',
            controller  : 'homeController'
        });
});

