/* Vladimir Kosmala @ Deezer, Licence Apache */

var LOGNS = 'APP ::';
var APP_ID = '244002';
var CHANNEL_URL = 'http://localhost/DZ/channel.html';

var angapp = angular.module('app', ['ngRoute']);

angapp.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			action: "bienvenu"
		})
		.when("/playlists", {
			action: "playlists"
		})
		.when("/playlist/:id", {
			action: "playlist"
		})
		.when("/albums", {
			action: "albums"
		})
		.when("/album/:id", {
			action: "album"
		})
		.when("/artists", {
			action: "artists"
		})
		.when("/artist/:id", {
			action: "artist"
		})
		.when("/favorites", {
			action: "favorites"
		})
		.when("/search/:pattern", {
			action: "search"
		})
		.otherwise({
			redirectTo: "/"
		})
	;
});

angapp.filter('humain_time', function() {
	return function(time) {
		if (time && time > 0.0) {
			var sec = parseInt(time % 60);
			return parseInt(time / 60) + ':' + (sec < 10 ? '0'+sec : sec);
		} else {
			return '0:00';
		}
	};
});

angapp.directive('onKeyupSearch', function() {
	return function(scope, elm, attrs) {
		elm.bind("keyup", function(e) {
			//console.log(LOGNS, 'Champ de recherche: entrer pressé');
			scope.trigger_search();
			scope.$apply();
		});
	};
});

angapp.controller("AppController", function($scope, $routeParams, $location, $rootScope,$http,$interval,$route) {
	// Init config
	$rootScope.title = 'BIENVENU SUR SAIZIK AVEC DEEZER';
	$scope.logger = false;

	$scope.view = 'loading';
	$scope.accueil = '';
	$scope.albums = [];
	$scope.artists = [];
	$scope.favorites = [];

	$scope.playing = false;
	$scope.time_current = 0.0;
	$scope.time_total = 0.0
	$scope.current_track = null;
	$scope.playing_artist = 'Vous êtes sur SAIZIK AVEC DEEZER';
	$scope.playing_artist_link = 'http://www.deezer.com';
	$scope.playing_title = null;
	$scope.playing_album_link = null;
	$scope.playing_cover_src = null;
	var copy=[];
	$scope.tracksBdList=[];
	var count=0;
	var nb=0;
	$scope.tracks=[];
	var copypl=[];
	var copyupdate=[];
	var copyplupdate=[];
	var updatePlTrack=null;
	var updatePlTrackBd=null;
	$scope.suivreLecture=null;
	$scope.index=0;
	var tacksIdprochain=[];
	var compter=0;
	var revenir=0;
	$scope.tracksclick=[];
	$scope.newValue=0.0;
	$scope.oldValue=0.0;

	rootScope = $rootScope;
	scope = $scope;
	
	$(document).ready(function(){
		$('#play').click(function() { 
			// console.log("Play Cliqué");
			DZ.player.play();
		});
		$('#pause').click(function() { 
			// console.log("Pause Cliqué");
			DZ.player.pause();
		});
		// $('#previous').click(function() { 
			// DZ.player.prev();
		// });
		// $('#next').click(function() { 
			// //console.log("Next me ");
			// DZ.player.next();
		// });
	});
	
	function getListTrackBd(){
		$http.get("server/List.php").then(function(response) {
				$scope.tracksBdList=response.data;
				// console.log(JSON.stringify(response.data));
			},function(err){ 
					////console..error('Erreur', err); 
		});
	};
	getListTrackBd();
	
	function preventBack(){
		window.history.forward();
		history.pushState(null, null, document.URL);
			window.addEventListener('popstate', function () {
			history.pushState(null, null, document.URL);
		});
	};
	
	DZ.init({
		appId: APP_ID,
		channelUrl: CHANNEL_URL,
		player: {

		}
	});

	// --------------------------------------------------- Methods

	$scope.login = function() {
		//console.log(LOGNS, 'login cliqué');

		DZ.login(function(response) {
			if (response.authResponse) {
				//console.log(LOGNS, 'Connecté');
				$scope.logged();
			} else {
				//console.log(LOGNS, 'Pas connecter');
			}
		}, {scope: 'manage_library,basic_access'});
	};

	$scope.logged = function() {
		$scope.logger = true;
		//console.log(LOGNS, 'Player chargé');
		$('#controls').css('opacity', 1);
		$scope.handleRoute();
		$location.path('/')
	};
	
	$scope.logout = function() {
		DZ.getLoginStatus(function(e) {
			//console.log("getLoginStatus "+JSON.stringify(e));
			return true;
		});
		DZ.logout(function(e,t) {
			var url = window.location.href;
			//console.log("logout "+JSON.stringify(e));
			//console.log("logout2 "+t);
			$interval.cancel(updatePlTrack);
			$interval.cancel(updatePlTrackBd);
			$scope.logger = false;
			$scope.view = 'loading';
			$rootScope.title = 'Bienvenu sur SAIZIK AVEC DEEZER';
			$scope.$apply();
			$location.path('/')
			window.location.reload();
			window.location.href = url;
			window.location.hash="no-back-button";
			window.location.hash="Again-No-back-button";
			window.onunload=function(){null};
			setTimeout("preventBack()", 0);
			window.onunload=function(){null};
		});
		
	};
	
	$scope.trigger_search = function(){
		var search_value = $scope.search_value;
		//console.log(LOGNS, 'Recherche de ', search_value);

		if (search_value) {
			$location.path("/search/"+search_value);
		} else {
			if ($scope.last_path) {
				$location.path($scope.last_path);
			} else {
				$location.path('/');
			}
		}
	};

	$scope.play_track = function(index) {
		$scope.tracksclick=[];
		$scope.tracksclick.push($scope.tracks[index].id);
		DZ.player.playTracks($scope.tracksclick, index, function(response){
			//console.log(LOGNS, "Liste des pistes", response.tracks);
		});
	};

	$scope.play_track_id = function(id) {
		DZ.player.playTracks([id], 0, function(response){
			//console.log(LOGNS, "Liste des pistes", response.tracks);
		});
	};

	$scope.play = function() {
		//console.log(LOGNS, 'play cliqué');
		DZ.player.play();
	};

	$scope.pause = function() {
		//console.log(LOGNS, 'pause cliqué');
		DZ.player.pause();
	};

	$scope.previous = function() {
		//console.log(LOGNS, 'précédent cliqué');
		DZ.player.prev();
	};

	$scope.next = function() {
		//console.log(LOGNS, 'suivant cliqué');
		DZ.player.next();
	};

	// --------------------------------------------------- Angular events

	$scope.$watch('search_value', function(search_value, oldValue) {
		if (search_value !== oldValue) {
			//console.log(LOGNS, 'suivre une valeur ', search_value, oldValue);
			$scope.trigger_search();
		}
	});

	$scope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
		if ($scope.logged) {
			if ($route.current.action !== 'search') {
				$scope.last_path = $location.path(); // quand c'est vide allez y ici
			}

			$scope.handleRoute();
		}
	});

	$scope.sliderClicked = function(e) {
		// console.log("Je suis sega "+e);
		var slider = $(e.delegateTarget);
		var x = e.clientX - slider.offset().left;
		var xMax = slider.width();
		//console.log(LOGNS, e.clientX, slider.offset().left, e);
		// console.log(LOGNS, x / xMax * 100);
		DZ.player.seek(x / xMax * 100);
	};

	// --------------------------------------------------- DZ events

	DZ.Event.subscribe('player_loaded', function(){
		//console.log(LOGNS, 'vérification login...');

		DZ.getLoginStatus(function(response) {
			if (response.authResponse) {
				//console.log(LOGNS, 'vérification login: connecté');
				$scope.logged();
			} else {
				//console.log(LOGNS, 'vérification login: non connecté');
				$scope.view = 'login';
				preventBack();
				$location.path('/')
			}
			$scope.$apply();
		}, {scope: 'manage_library,basic_access'});
	});

	DZ.Event.subscribe('player_play', function(e){
		// console.log(LOGNS, "player_play");
		$scope.playing = true;
		$scope.$apply();
	});

	DZ.Event.subscribe('player_paused', function(e){
		// console.log(LOGNS, "player_paused");
		$scope.playing = false;
		$scope.$apply();
	});

	DZ.Event.subscribe('player_position', function(e){
		// console.log(LOGNS, "Player position", e);
		$scope.suivreLecture=$scope.time_current;
		$scope.time_current = e[0];
		if (e[1]) $scope.time_total = +e[1];
		$scope.$apply();
	});
	
	
	DZ.Event.subscribe('current_track', function(e){
		// console.log(LOGNS, "current_track", e.index);
		if(e.index==0){
			compter++;
			// console.log(compter);
			if(
				compter>1&&
				!($scope.newValue==0
				&&$scope.oldValue>0
				&&$scope.oldValue<$scope.time_total)){
				// console.log("Condition OK ",$scope.newValue==0&&$scope.oldValue>0&&$scope.oldValue<$scope.time_total);
				window.location.reload();
				// console.log("1p",$scope.newValue);
				// console.log("2p",$scope.oldValue);
				// tacksIdprochain=[];
				// tacksIdprochain.push(e.track.id);
				// $scope.current_track=e;
					
				// $scope.playing_artist = e.track.artist.name;
				// $scope.playing_artist_link = '#/artist/'+e.track.artist.id;
				// $scope.playing_title = e.track.title;
				// $scope.playing_album_link = '#/album/'+e.track.album.id;
				// $scope.$apply();

				// DZ.api('/track/' + e.track.id, function(response){
					//console.log(LOGNS, response.album.cover);
					// $scope.playing_cover_src = response.album.cover;
					// $scope.$apply();
				// });
			}
		}
		// tacksIdprochain=[];
		tacksIdprochain.push(e.track.id);
		$scope.current_track=e;
			
		$scope.playing_artist = e.track.artist.name;
		$scope.playing_artist_link = '#/artist/'+e.track.artist.id;
		$scope.playing_title = e.track.title;
		$scope.playing_album_link = '#/album/'+e.track.album.id;
		$scope.$apply();

		DZ.api('/track/' + e.track.id, function(response){
			////console.log(LOGNS, response.album.cover);
			$scope.playing_cover_src = response.album.cover;
			$scope.$apply();
		});
		
	});
	
	//----------------------------------------------------Get ALL tracks
	var m=0;
	var k=0;
	function update(){
		copyupdate=[];
		copyplupdate=[];
		DZ.api('/user/me/playlists', function(response){
					//console.log(LOGNS, 'bienvenu', response.data);
			if(response.data==null){
			}else{
				for(var i=0;i<response.data.length;i++){
					var l=response.data.length;
					DZ.api('/playlist/' + encodeURIComponent(response.data[i].id), function(response){

						var tracks = response.tracks.data;
						var tracks_ids = [];
						for (var prop in tracks) {
							tracks_ids.push(tracks[prop].id);
							copyupdate.push(tracks[prop]);
						}
						copyplupdate.push(response);
						
						k++;
						if(k==l){
							if($scope.tracks.length!=copyupdate.length&&copyupdate.length!=0){
								m++;
								if(m==1){
									$scope.tracks=copyupdate;
									m=0;
									$scope.$apply();
								}
							}
							if(copypl.length!=copyplupdate.length&&copyplupdate.length!=0){
								m++;
								if(m==1){
									$scope.playlists=copyplupdate;
									m=0;
									$scope.$apply();
								}
							}
							copyplupdate=[];
							copyupdate=[];
							k=0;
						}
					});
				}
			}		
		});
	};

	// --------------------------------------------------- Handle routes

	$scope.handleRoute = function() {
		var renderAction = $route.current.action;
		// console.log(LOGNS, 'handleRoute', renderAction);
		// console.log(LOGNS, 'width params', $routeParams);
		var k1=0;

		switch (renderAction) {
			case 'bienvenu':
				$scope.accueil = 'accueil';
				$scope.view = '';
				DZ.api('/user/me/playlists', function(response){
					if(response.data==null){
					}else{
						for(var i=0;i<response.data.length;i++){
							var l=response.data.length;
							DZ.api('/playlist/' + encodeURIComponent(response.data[i].id), function(response){
								var tracks = response.tracks.data;
								// trackscopy.push(response.tracks);
								var tracks_ids = [];
								
								for (var prop in tracks) {
									tracks_ids.push(tracks[prop].id);
									copy.push(tracks[prop]);
								}
								$scope.tracks_ids = tracks_ids;
								// console.log("IDs ",$scope.tracks_ids);
								
								copypl.push(response);
								// $scope.playlist = response;
								k1++;
								if(k1==l){
									$scope.tracks=copy;
									// trackall=trackscopy;
									$scope.$emit('lecture');
									$scope.$emit('insertionBd');
									$scope.$emit('update');
									$scope.$emit('updateBd');
									k1=0;
								}
								
								$scope.view = renderAction;
								$rootScope.title = response.title;
								$scope.$apply();
							});
						}
					}
					$scope.playlists = response.data;
					$scope.view = renderAction;
					$rootScope.title = 'Bienvenu sur SAIZIK AVEC DEEZER';
					$scope.$apply();
					
					$('img').on('load', function(){
						//console.log(LOGNS, this);
						$(this).css('opacity', 1);
					});
				});
				break;
			case 'playlists':
				DZ.api('/user/me/playlists', function(response){
					//console.log(LOGNS, 'playlists', response.data);
					$scope.playlists = response.data;
					$scope.view = renderAction;
					$rootScope.title = 'Playlists';
					$scope.$apply();

					$('img').on('load', function(){
						//console.log(LOGNS, this);
						$(this).css('opacity', 1);
					});
				});
				break;
			case 'playlist':
				DZ.api('/playlist/' + encodeURIComponent($routeParams.id), function(response){
					//console.log(LOGNS, 'playlist', $routeParams.id, response);

					var tracks = response.tracks.data;
					var tracks_ids = [];
					for (var prop in tracks) {
						tracks_ids.push(tracks[prop].id);
					}
					$scope.tracks_ids = tracks_ids;

					$scope.playlist = response;
					$scope.view = renderAction;
					$rootScope.title = response.title;
					$scope.$apply();
				});
				break;

			case 'albums':
				DZ.api('/user/me/albums', function(response){
					//console.log(LOGNS, 'albums', response.data);
					$scope.albums = response.data;
					$scope.view = renderAction;
					$rootScope.title = 'Albums';
					$scope.$apply();

					$('img').on('load', function(){
						//console.log(LOGNS, this);
						$(this).css('opacity', 1);
					});
				});
				break;
			case 'album':
				DZ.api('/album/' + encodeURIComponent($routeParams.id), function(response){
					//console.log(LOGNS, 'album', $routeParams.id, response);
					var tracks = response.tracks.data;
					var tracks_ids = [];
					for (var prop in tracks) {
						tracks_ids.push(tracks[prop].id);
					}
					$scope.tracks_ids = tracks_ids;
					$scope.album = response;
					$scope.view = renderAction;
					$rootScope.title = response.title;
					$scope.$apply();
				});
				break;

			case 'artists':
				DZ.api('/user/me/artists', function(response){
					//console.log(LOGNS, 'artists', response.data);
					$scope.artists = response.data;
					$scope.view = renderAction;
					$rootScope.title = 'Artists';
					$scope.$apply();

					$('img').on('load', function(){
						//console.log(LOGNS, this);
						$(this).css('opacity', 1);
					});
				});
				break;
			case 'artist':
				DZ.api('/artist/' + encodeURIComponent($routeParams.id), function(response){
					//console.log(LOGNS, 'artist', $routeParams.id, response);
					$scope.artist = response;
					$scope.view = renderAction;
					$rootScope.title = response.name;
					$scope.$apply();

					DZ.api('/artist/' + $routeParams.id + '/albums', function(response){
						//console.log(LOGNS, 'artist albums', response.data);
						$scope.albums = response.data;
						$scope.view = renderAction;
						$scope.$apply();

						$('img').on('load', function(){
							//console.log(LOGNS, this);
							$(this).css('opacity', 1);
						});
					});
				});
				break;

			case 'favorites':
				DZ.api('/user/me/tracks', function(response){
					//console.log(LOGNS, 'favorites', response.data);
					var tracks_ids = [];
					for (var i=0, track; track=response.data[i]; i++) {
						tracks_ids.push(track.id);
					}
					$scope.favorites = response.data;
					$scope.tracks_ids = tracks_ids;
					$scope.view = renderAction;
					$rootScope.title = 'Favorites';
					$scope.$apply();
				});
				break;

			case 'search':
				var search_value = $scope.search_value = $routeParams.pattern;

				DZ.api('/search?q=' + encodeURIComponent(search_value), function(response){
					//console.log(LOGNS, 'recherche de pistes', response.data);
					$scope.search_tracks = response.data.slice(0, 10);
					$scope.view = 'search';
					$scope.$apply();
				});

				DZ.api('/search/album?q=' + encodeURIComponent(search_value), function(response){
					//console.log(LOGNS, 'recherche d\'albums', response.data);
					$scope.search_albums = response.data.slice(0, 10);
					$scope.view = 'search';
					$scope.$apply();
				});

				DZ.api('/search/artist?q=' + encodeURIComponent(search_value), function(response){
					//console.log(LOGNS, 'recherche d\'artists', response.data);
					$scope.search_artists = response.data.slice(0, 10);
					$scope.view = 'search';
					$scope.$apply();
				});

				$scope.view = 'loading';
				$rootScope.title = 'Search: ' + search_value;
				$scope.$apply();
				break;

			default:
				return;
		}

		$scope.view = 'loading';
	};
	
	$scope.$watch("suivreLecture",function( newValue, oldValue ) { 
		// $scope.time_total
		// console.log("$scope.time_total ",$scope.time_total);
		// console.log("newValue ",newValue);
		// console.log("oldValue ",oldValue);
		$scope.newValue = newValue;
		$scope.oldValue = oldValue;
		if(oldValue>0&&newValue==0){
			if($scope.current_track.index==$scope.tracks.length-1){
				window.location.reload();
			}
			$scope.$emit('prochain');
		}
	});
	
	$scope.play_tracks = function(ids,index) {
		DZ.player.playTracks(ids, index, function(response){
		});
	};
	
	// Lire le prochain chanson;
	$rootScope.$on('prochain', function() {
			var position=0;
			// var id=0;
			// for(var i=0;i<$scope.playlists.length;i++){
				// tacksIdprochain.push($scope.playlists[i].id);
			// }
			
			for(var k=0;k<$scope.tracks.length;k++){
				for(var z=0;z<$scope.tracksBdList.length;z++){
					if($scope.tracksBdList[z].bool==1&&$scope.tracks[k].id==$scope.tracksBdList[z].trackId){
						nb++;
						tacksIdprochain=[];
						break;
					}
				}
			}
			if(nb!=0){
				window.location.reload();
				nb=0;
			}
	});
	
	// Update changements;
	$rootScope.$on('updateBd', function() {
		updatePlTrackBd = $interval(function () {
			// update();
			getListTrackBd();
		}, 1000);
	});
	
	$rootScope.$on('update', function() {
		updatePlTrack = $interval(function () {
			update();
		}, 5000);
	});
	
	
						$rootScope.$on('insertionBd', function() {
							if($scope.tracksBdList==0){
									for(var i=0;i<$scope.tracks.length;i++){
										$http.post('server/insert.php',
										{
											"id":$scope.tracks[i].id,
											"title":$scope.tracks[i].title
										}).success(function(data){
											if (data == true) {
												// ////console..log("Inséré avec succès. ");
											}
										},function(err){ 
												////console..error('Erreur', err); 
										});
									}
								}else{
									for(var i=0;i<$scope.tracks.length;i++){
										count=0;
										for(var j=0;j<$scope.tracksBdList.length;j++){
											if($scope.tracksBdList[j].trackId==$scope.tracks[i].id){
												count++;
												break;
											}
										}
										if(count!=0){
											return '';
										}else{
											$http.post('server/insert.php',
											{
												"id":$scope.tracks[i].id,
												"title":$scope.tracks[i].title
											}).success(function(data){
												if (data == true) {
													// console.log("Inséré avec succès. ");
												}
											},function(err){ 
													// console.error('Erreur', err); 
											});
										}
									}
								}
							});
	
	$rootScope.$on('lecture', function() {
			var position=0;
			var id=0;
			var tacksId=[];
			for(var k=0;k<$scope.tracks.length;k++){
				tacksId.push($scope.tracks[k].id);
			}
			
			// for(var i=0;i<copypl.length;i++){	
			// }
			
			for(var k=0;k<$scope.tracks.length;k++){
				for(var z=0;z<$scope.tracksBdList.length;z++){
					if($scope.tracksBdList[z].bool==1&&$scope.tracks[k].id==$scope.tracksBdList[z].trackId){
						tacksId=[];
						position=k;
						tacksId.push($scope.tracks[k].id);
						nb++;
						break;
					}
				}
			}
			if(nb!=0){
				$scope.play_tracks(tacksId,position);
				position=0;
				nb=0;
			}else{
				$scope.play_tracks(tacksId,0);
			}
	});
});
