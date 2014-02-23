angular.module('canvas', ['ngResource','ngRoute']);

angular.module('canvas').config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
})