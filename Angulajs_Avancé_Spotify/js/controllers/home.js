(function() {

	var module = angular.module('PlayerApp');

	module.controller('HomeController', function($scope, $routeParams) {
		//console.log('home.js  Ligne 6');
		$scope.id = $routeParams.id;
	});

})();
