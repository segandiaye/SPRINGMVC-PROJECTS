
	var module = angular.module('PlayerApp');

	module.controller('LoginController', function($scope, Auth) {
		//console.log('login.js LoginController Ligne 5');
		$scope.isLoggedIn = false;

		$scope.login = function() {
			// do login!
			//console.log('do login...');

			Auth.openLogin();
			// $scope.$emit('login');
		}
	});


