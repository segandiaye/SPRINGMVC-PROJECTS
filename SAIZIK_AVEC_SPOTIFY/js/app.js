(function() {

	var app = angular.module('PlayerApp', ['ionic','ngRoute']);
	
	// app.run(['$http', '$cookies', function($http, $cookies) {
	  // $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
	// }]);

	app.config(function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'templates/partials/accueil.html',
				controller: 'BrowseController'
			}).
			when('/playqueue', {
				templateUrl: 'templates/partials/playqueue.html',
				controller: 'PlayQueueController'
			}).
			when('/users/:username', {
				templateUrl: 'templates/partials/user.html',
				controller: 'UserController'
			}).
			when('/users/:username/tracks', {
				templateUrl: 'templates/partials/usertracks.html',
				controller: 'UserTracksController'
			}).
			when('/users/:username/playlists/:playlist/track/:current', {
				templateUrl: 'templates/partials/playlist.html',
				controller: 'PlaylistController'
			}).
			when('/artists/:artist', {
				templateUrl: 'templates/partials/artist.html',
				controller: 'ArtistController'
			}).
			when('/albums/:album', {
				templateUrl: 'templates/partials/album.html',
				controller: 'AlbumController'
			}).
			when('/search', {
				templateUrl: 'templates/partials/searchresults.html',
				controller: 'SearchResultsController'
			}).
			when('/category/:categoryid', {
				templateUrl: 'templates/partials/browsecategory.html',
				controller: 'BrowseCategoryController'
			}).
			otherwise({
				redirectTo: '/'
			});
	});

	app.controller('AppController', function($scope, Auth, Playback, PlayQueue, API, $location) {
		////console..log('in AppController');

		////console..log(location);

		function checkUser(redirectToLogin) {
			API.getMe().then(function(userInfo) {
				Auth.setUsername(userInfo.id);
				Auth.setUserCountry(userInfo.country);
				if (redirectToLogin) {
					$scope.$emit('login');
					$location.replace();
				}
			}, function(err) {
				$scope.showplayer = false;
				$scope.showlogin = true;
				$location.replace();
			});
		};

		window.addEventListener("message", function(event) {
			var hash = JSON.parse(event.data);
			if (hash.type == 'access_token') {
				Auth.setAccessToken(hash.access_token, hash.expires_in || 60);
				checkUser(true);
			}
  		}, false);
		
		$scope.isLoggedIn = (Auth.getAccessToken() != '');
		$scope.showplayer = $scope.isLoggedIn;
		$scope.showlogin = !$scope.isLoggedIn;

		$scope.$on('login', function($route) {
			$scope.showplayer = true;
			$scope.showlogin = false;
			// $location.path('/').replace().reload();
			$location.url('/');
			window.location.reload();
		});
		
		$scope.$on('logout', function() {
				var url = window.location.href;	
						// Playback.pause();
						// localStorage.getItem('pa_token', '');
						// localStorage.setItem('pa_expires',0);
						// Auth.setAccessToken('',0);
						// Auth.setUserCountry('');
						// Auth.setUsername('');
						// $scope.showplayer = false;
						// $scope.showlogin = true;
						// window.history.go(-window.history.length);
						// window.location.href = url;
						// window.location.hash="no-back-button";
						// window.location.hash="Again-No-back-button";
						// PlayQueue.clear();
			API.getMe().then(function(userInfo) {
					if(userInfo.product=='premium'){
						API.getPause();
						localStorage.getItem('pa_token', '');
						localStorage.setItem('pa_expires',0);
						Auth.setAccessToken('',0);
						Auth.setUserCountry('');
						Auth.setUsername('');
						$scope.showplayer = false;
						$scope.showlogin = true;
						$location.url('/');
						window.location.reload();
						window.history.go(-window.history.length);
						window.location.href = url;
						window.location.hash="no-back-button";
						window.location.hash="Again-No-back-button";
					}else{
						Playback.pause();
						localStorage.getItem('pa_token', '');
						localStorage.setItem('pa_expires',0);
						Auth.setAccessToken('',0);
						Auth.setUserCountry('');
						Auth.setUsername('');
						$scope.showplayer = false;
						$scope.showlogin = true;
						window.history.go(-window.history.length);
						window.location.href = url;
						window.location.hash="no-back-button";
						window.location.hash="Again-No-back-button";
						PlayQueue.clear();
					}
				}, function(err) {
					//console..log("Erreur ",err);
			});
		});

		$scope.getClass = function(path) {
			if ($location.path().substr(0, path.length) == path) {
				return 'active';
			} else {
				return '';
			}
		};

		$scope.focusInput = false;
		$scope.menuOptions = function(playlist) {

			var visibilityEntry = [playlist.public ? 'Rendre secret' : 'Rendre public', function ($itemScope) {
				API.changePlaylistDetails(playlist.username, playlist.id, {public: !playlist.public})
					.then(function() {
						playlist.public = !playlist.public;
					});
			}];

			var own = playlist.username === Auth.getUsername();
			if (own) {
				return [
					visibilityEntry,
					null,
					['Renommer', function ($itemScope) {
						playlist.editing = true;
						$scope.focusInput = true;
				}]
				];
			} else {
				return [ visibilityEntry ];
			}
		};

		$scope.playlistNameKeyUp = function(event, playlist) {
			if (event.which === 13) {
				// enter
				var newName = event.target.value;
				API.changePlaylistDetails(playlist.username, playlist.id, {name: newName})
					.then(function() {
						playlist.name = newName;
						playlist.editing = false;
						$scope.focusInput = false;
					});
			}

			if (event.which === 27) {
				// escape
				playlist.editing = false;
				$scope.focusInput = false;
			}
		};

		$scope.playlistNameBlur = function(playlist) {
			playlist.editing = false;
			$scope.focusInput = false;
		};

		checkUser();
	});

})();
