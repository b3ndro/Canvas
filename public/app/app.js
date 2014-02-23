angular.module('canvas', ['ngResource','ngRoute']);

angular.module('canvas').config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {templateUrl: '/partials/main', controller: 'mainCtrl'})
})

angular.module('canvas').controller('mainCtrl', function($scope){
    $scope.myVar = "Hello Angular";
});