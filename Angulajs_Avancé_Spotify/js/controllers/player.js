(function() {

	var module = angular.module('PlayerApp');

	module.controller('PlayerController', function($scope, $rootScope, Auth, API, PlayQueue, Playback, $location, $sce, $http, $timeout, $interval, $route ) {
		//////console..log('player.js PlayerController Ligne 6');
		$scope.view = 'Bienvenu';
		$scope.profileUsername = Auth.getUsername();
		$scope.playlists = [];
		$scope.tracks=[];
		$scope.playing = true;
		$scope.progress = 0;
		$scope.duration = 4000;
		$scope.trackdata = null;
		$scope.data = null;
		$scope.currenttrack = '';
		$scope.name = '';
		$scope.tracksList= [];
		$scope.copy= [];
		$scope.listpl=[];
		$scope.trackurisc=[];
		$scope.nc = 0;
		var count=0;
		var n=0;
		var nb=0;
		var t=0;
		var tc=0;
		var c=0;
		var baseUrl = 'https://api.spotify.com/v1';
		$scope.uri=[];
		$scope.uri2=[];
		$scope.suivrem=0;
		$scope.tracksupdate=[];
		var updateT=0;
		// var time=1000;
		// var f=new Date();
		// console.log("L\'heure est de ",(new Date()).getMinutes());
		
		
		$(document).ready(function(){
			$('#play').click(function() { 
				API.getMe().then(function(userInfo) {
					if(userInfo.product=='premium'){
						// API.getStartResume();
						$scope.playing=true;
					}else{
						Playback.resume();
					}
				}, function(err) {
					////console..log("Erreur ",err);
				});
			});
			$('#pause').click(function() { 
				API.getMe().then(function(userInfo) {
					if(userInfo.product=='premium'){
						API.getPause();
						$scope.playing=false;
					}else{
						Playback.pause();
					}
				}, function(err) {
					////console..log("Erreur ",err);
				});
			});
		});
		var m=0,k=0;
		var d = null;
		var d1 = null;
		function getProgress(){
			// m=0;
			k=0;
			d = null;
			$scope.uri2=[];
			$http.get
				(	baseUrl + '/me/player',
					{
						headers: {
							'Authorization': 'Bearer '  + Auth.getAccessToken()
						}
					}
				).then(function(response) {
					k++;
					$scope.playing = response.data.is_playing;
					if(k=1){
						d=new Date();
						// getSeconds
						$scope.uri2.push(d);
						// ////console.loglog("Attention d1 je démarre "+d.getMinutes());
					}
				},function(err){ 
					//console.loglog("Erreur ",err); 
				});
		};
		
		function getOnplayChanged(){
			$http.get
				(	baseUrl + '/me/player',
					{
						headers: {
							'Authorization': 'Bearer '  + Auth.getAccessToken()
						}
					}
				).then(function(response) {
					if(response.data.is_playing==true){
						$scope.progress = response.data.progress_ms;
						// if(
							// m>0&&
							// ($scope.currenttrack!=response.data.item.uri)||
							// (response.data.item.album.uri!=$scope.tracks[m].track.album.uri)){
								
								// $scope.$emit('lecture');
						// }
					}
					// else{
						// if(
						// m>0&&
						// $scope.duration>0&&$scope.duration>5000
						// &&($scope.progress+1)>$scope.duration){
							// //console.log("Problème de lecture");
							// $scope.$emit('lecture');
						// }else{
							// $scope.$emit('lecture');
						// }
					// }
				},function(err){ 
					////console..log("Erreur ",err); 
				});
		};
		
		$rootScope.$on('lecture', function() {
				API.getPause();
				$scope.playOnload($scope.tracks[m].track.uri);
		});
		
		//Suivre la valeur de m
		$scope.$watch("suivrem",function( newValue, oldValue ) { 
			//console.log("newValueMmm ",newValue);
			//console.log("oldValueMmm ",oldValue);
			if(m>0&&(newValue==oldValue)){
				//console.log("Une répétition se passe");
			}
			
		});
		
		$scope.$watch("progress",function( newValue, oldValue ) { 
			if(
				$scope.duration>0&&$scope.duration!=4000
				&&((newValue>=$scope.duration)||(oldValue>=$scope.duration))
			){
				//console.log("Condition OK");
				m++;
				if(m>=1){
					d1=new Date();
					$scope.uri2.push(d);
					player=0;
					if(d==null){
						m--;
						////console.loglog("Vous voulez sauter ou quoi ?",$scope.currenttrack);
						$scope.progress=0;
						newValue=0;
						oldValue=0;
						API.getPause();
						if(m>$scope.tracks.length-1){
							// //console.loglog("Condition 1");
							m=0;
							// API.getPause();
							$scope.playOnload($scope.tracks[m].track.uri);
						}else{
							// //console.loglog("Condition 2");
							// API.getPause();
							$scope.playOnload($scope.tracks[m].track.uri);
						}
						
					}else{
						var a=d.getMinutes();
						var b=d1.getMinutes();
						if((((b-a)*60)*1000)<5000){
							m--;
							$scope.progress=0;
							newValue=0;
							oldValue=0;
							API.getPause();
							if(m>$scope.tracks.length-1){
								// //console.loglog("Condition 3");
								m=0;
								// API.getPause();
								$scope.playOnload($scope.tracks[m].track.uri);
							}else{
								// //console.loglog("Condition 4");
								// API.getPause();
								$scope.playOnload($scope.tracks[m].track.uri);
							}
							////console.loglog("Vous voulez sauteer ou quoi2 ?",$scope.currenttrack);
						}else{
							////console.loglog("Success");
							API.getPause();
							if(m>$scope.tracks.length-1){
								// //console.loglog("Condition 5");
								m=0;
								// API.getPause();
								$scope.playOnload($scope.tracks[m].track.uri);
							}else{
								// //console.loglog("Condition 6");
								// API.getPause();
								$scope.playOnload($scope.tracks[m].track.uri);
							}
							// $scope.playOnload($scope.tracks[m].track.uri);
						}
					}
				}
			}
		});
		
		$timeout(function () {
			// API.getMe().then(function(userInfo) {
				// }, function(err) {
			// });
        }, 600000);
		
		$interval(function () {
			API.getMe().then(function(userInfo) {
					if(userInfo.product=='premium'){
						getOnplayChanged();
						$scope.$on('$viewContentLoaded', function(){
							$location.replace(); 
						});	
					}else{
						$scope.$on('$viewContentLoaded', function(){
							$location.replace(); 
						});	
					}
				}, function(err) {
					////console..log("Erreur ",err);
			});
		}, 1000);
		
		//Listes des tracks qui se trouvent dans la BD
		$scope.getAllBdTracks=function(){
			$http.get("server/List.php").then(function(response) {
				$scope.tracksList=response.data;
			},function(err){ 
				////console..error('Erreur', err); 
			});
		};
		$scope.getAllBdTracks();
		
		function allTracks(username,playlist){
			API.getPlaylistTracks(username, playlist).then(function(list) {
					count++;
					$scope.listpl.push(list.items);
					var tot = 0;
					list.items.forEach(function(track) {
						tot += track.track.duration_ms;
					});
					
					for(var i=0;i<list.items.length;i++){
						$scope.tracks.push(list.items[i]);
					}
					
					if(count==$scope.playlists.length){
						$scope.playOnload($scope.tracks[0].track.uri);
						//Insérer dans la base de données
						if($scope.tracksList.length==0){
							compter=0;
							for(var i=0;i<$scope.tracks.length;i++){
									$http.post('server/insert.php',{
										"trackArtiste":$scope.tracks[i].track.artists[0].name,
										"trackGenre":'',
										"trackTitre":$scope.tracks[i].track.name,
										"trackName":$scope.tracks[i].track.name,
										"trackDuree":$scope.tracks[i].track.duration_ms,
										"trackAlbum":$scope.tracks[i].track.album.name,
										"trackFormat":'mp3',
										"trackPhoto":$scope.tracks[i].track.album.images[0].url,
										"trackRang":0,
										"trackLecture":$scope.tracks[i].track.href,
										"trackNombrePlay":0,
										"trackNotation":'',
										"trackEtat":0,
										"trackPlay":0,
										"trackPoids":0,
										"trackSucces":0,
										"heurePlay":''+(new Date()),
										// "trackId":$scope.tracks[i].track.id,
										"libraryId":0,
										"trackPath":$scope.tracks[i].track.preview_url
									}).success(function(data){
										if (data == true) {
											//console.log("Inséré avec succès.");
										}
									},function(err){ 
										console.error('Erreur', err); 
									});
							}
						}else{
							for(var i=0;i<$scope.tracks.length;i++){
								count=0;
								for(var j=0;j<$scope.tracksList.length;j++){
									if($scope.tracksList[j].trackUri==$scope.tracks[i].track.uri){
										count++;
										break;
									}
								}
								if(count!=0){
									return '';
								}else{
										$http.post('server/insert.php',{
											"trackArtiste":$scope.tracks[i].track.artists[0].name,
											"trackGenre":'',
											"trackTitre":$scope.tracks[i].track.name,
											"trackName":$scope.tracks[i].track.name,
											"trackDuree":$scope.tracks[i].track.duration_ms,
											"trackAlbum":$scope.tracks[i].track.album.name,
											"trackFormat":'mp3',
											"trackPhoto":$scope.tracks[i].track.album.images[0].url,
											"trackRang":0,
											"trackLecture":$scope.tracks[i].track.href,
											"trackNombrePlay":0,
											"trackNotation":'',
											"trackEtat":0,
											"trackPlay":0,
											"trackPoids":0,
											"trackSucces":0,
											"heurePlay":''+(new Date()),
											// "trackId":$scope.tracks[i].track.id,
											"libraryId":0,
											"trackPath":$scope.tracks[i].track.preview_url
										}).success(function(data){
											if (data == true) {
												//console.log("Inséré avec succès.");
											}
										},function(err){ 
											console.error('Erreur', err); 
										});
								}
							}
						}
					}
					$scope.total_duration = tot;
			});
			
			API.getPlaylist(username, playlist).then(function(list) {
				$scope.name = list.name;
				$scope.data = list;
				$scope.playlistDescription = $sce.trustAsHtml(list.description);
			});
		}
		
		function updatePlaylists() {
			if ($scope.profileUsername != '') {
				API.getPlaylists(Auth.getUsername()).then(function(items) {
					$scope.playlists = items.map(function(pl) {
						return {
							id: pl.id,
							name: pl.name,
							uri: pl.uri,
							username: pl.owner.id,
							collaborative: pl.collaborative,
							'public': pl['public']
						};
					});
					for (var i=0; i < $scope.playlists.length; i++) {
							allTracks($scope.playlists[i].username,$scope.playlists[i].id);
					}
					
				});
			}
		}
		updatePlaylists();
		
		var n=0;
		var f=0;
		$interval(function () {
			if ($scope.profileUsername != '') {
				API.getPlaylists(Auth.getUsername()).then(function(items) {
					$scope.playlists = items.map(function(pl) {
						return {
							id: pl.id,
							name: pl.name,
							uri: pl.uri,
							username: pl.owner.id,
							collaborative: pl.collaborative,
							'public': pl['public']
						};
					});
					for (var i=0; i < $scope.playlists.length; i++) {
						API.getPlaylistTracks(Auth.getUsername(), $scope.playlists[i].id).then(function(list) {
								updateT++;
								var tot = 0;
								list.items.forEach(function(track) {
									tot += track.track.duration_ms;
								});
								
								for(var i=0;i<list.items.length;i++){
									$scope.tracksupdate.push(list.items[i]);
								}
						});
					}
					if(updateT==$scope.playlists.length){
						// if(!$scope.$$phase) {
						  // console.
						// }
						if($scope.tracksupdate.length!=$scope.tracks.length){
							f++;
							if(f==1){
								//console.log("Changement ");
								$scope.tracks=$scope.tracksupdate;
								$scope.tracksupdate=[];
								updateT=0;
								f=0;
								// $scope.$apply();
							}
						}
					}
					updateT=0;
					$scope.tracksupdate=[];
				});
			}
        }, 1000);
		
		
		// $rootScope.$on('playqueuechanged', function() {
			// $scope.currenttrack = PlayQueue.getCurrent();
			//////console..log('$scope.currenttrack  '+$scope.currenttrack);
		// });
		
		// subscribe to an event
		$rootScope.$on('playlistsubscriptionchange', function() {
			updatePlaylists();
		});
		
		function playPrenium(trackuri){
			var t1=0;
			var p1=0;
			API.getPause();
			API.getMe().then(function(userInfo) {
				if(userInfo.product=='premium'){
					for(var i=0;i<$scope.tracks.length;i++){
						if(trackuri==$scope.tracks[i].track.uri){
							t1++;
							p1=$scope.tracks[i].track.track_number;
							break;
						}
					}
					if(t1>0){
						getProgress();
						$scope.duration = $scope.tracks[m].track.duration_ms;
						$scope.currenttrack = $scope.tracks[m].track.uri;
						$scope.suivrem=m;
						position=$scope.tracks[m].track.track_number-1;
						API.getStartResume(''+$scope.tracks[m].track.album.uri,position);
					}else{
						//console.loglog("API.getPause");
						API.getPause();
						////console..log("Pas de correspondance");
					}
				}else{
					//console.loglog("Playback.startPlaying");
					Playback.startPlaying(trackuri);
				}
			}, function(err) {
				////console..log("Erreur ",err);
			});
		};
		
		$scope.playOnload=function(trackuri) {
			$scope.d=n;
			var p=0;
			$scope.uritrack=trackuri;
			var trackuris = $scope.tracks.map(function(track) {
				return track.track.uri;
			});
			$scope.trackurisc=trackuris;
			PlayQueue.clear();
			PlayQueue.enqueueList(trackuris);
			if(trackuri==''||trackuri==null){
			}
			$http.get("server/List.php").then(function(response) {
				$scope.copy = response.data;
				if($scope.copy!=0){
					for(var j=0;j<$scope.tracks.length;j++){
						for(var i=0;i<$scope.copy.length;i++){
							if($scope.copy[i].bool==1&&$scope.tracks[j].track.uri==$scope.copy[i].trackUri){
								trackuri=$scope.tracks[j].track.uri;
								nb++;
								break;
							}
						}
					}
					
					if(nb>0){
						c++;
						$scope.$watch("uritrack",function( newValue, oldValue ) {
							if(oldValue!=newValue){
								window.location.reload();
							}
						});
						// PlayQueue.playFrom(trackuris.indexOf(trackuri));
						playPrenium(trackuri);
						// n=0;
					}else{
						p++;
						// trackuri=$scope.tracks[nb].track.uri;
						// PlayQueue.playFrom(trackuris.indexOf(uritrack));
						// nb++;
						playPrenium($scope.uritrack);
						// Playback.startPlaying($scope.uritrack);
						
					}
				}else{
					updatePlaylists();
					$scope.getAllBdTracks();
					for(var j=0;j<$scope.tracks.length;j++){
						for(var i=0;i<$scope.copy.length;i++){
							if($scope.copy[i].bool==1&&$scope.tracks[j].track.uri==$scope.copy[i].trackUri){
								nb++;
								trackuri=$scope.tracks[j].track.uri;
								break;
							}
						}
					}
					
					// PlayQueue.playFrom(trackuris.indexOf(trackuri));
					if(nb>0){
						//c++;
						// PlayQueue.playFrom(trackuris.indexOf(trackuri));
						// Playback.startPlaying(trackuri);
						playPrenium(trackuri);
					}else{
						//p++;
						//////console..log("Cooooooooooooool "+c);
						// trackuri=$scope.tracks[nb].track.uri;
						// PlayQueue.playFrom(trackuris.indexOf(uritrack));
						// nb++;
						// Playback.startPlaying(uritrack);
						playPrenium($scope.uritrack);
					}
				}
			});
		};
		
		$scope.logout = function() {
			API.getMe().then(function(userInfo) {
					if(userInfo.product=='premium'){
						API.getPause();
						// localStorage.getItem('pa_token', '');
						// localStorage.setItem('pa_expires',0);
						// Auth.setAccessToken('',0);
						// Auth.setUserCountry('');
						// Auth.setUsername('');
						// $scope.showplayer = false;
						// $scope.showlogin = true;
						// $location.url('/');
						// window.location.reload();
						// window.history.go(-window.history.length);
						// window.location.href = url;
						// window.location.hash="no-back-button";
						// window.location.hash="Again-No-back-button";
						$scope.$emit('logout');
					}else{
						Playback.pause();
						// localStorage.getItem('pa_token', '');
						// localStorage.setItem('pa_expires',0);
						// Auth.setAccessToken('',0);
						// Auth.setUserCountry('');
						// Auth.setUsername('');
						// PlayQueue.clear();
						$scope.$emit('logout');
					}
				}, function(err) {
					////console..log("Erreur ",err);
			});
		};
		
		$scope.resume = function() {
			API.getMe().then(function(userInfo) {
					if(userInfo.product=='premium'){
						Playback.resume();
						API.getStartResume($scope.tracks[m].track.album.uri,$scope.tracks[m].track.track_number-1);
					}else{
						Playback.resume();
					}
				}, function(err) {
					////console..log("Erreur ",err);
			});
		};

		$scope.pause = function() {
			API.getMe().then(function(userInfo) {
					if(userInfo.product=='premium'){
						Playback.pause();
						API.getPause();
					}else{
						Playback.pause();
					}
				}, function(err) {
					////console..log("Erreur ",err);
			});
		};

		$scope.next = function() {
			API.getMe().then(function(userInfo) {
					if(userInfo.product=='premium'){
						m++;
						PlayQueue.next();
						// API.getNext();
						API.getStartResume($scope.tracks[m].track.album.uri,$scope.tracks[m].track.track_number-1);
					}else{
						PlayQueue.next();
						Playback.startPlaying(PlayQueue.getCurrent());
					}
				}, function(err) {
					////console..log("Erreur ",err);
			});
		};

		$scope.prev = function() {
			API.getMe().then(function(userInfo) {
					if(userInfo.product=='premium'){
						m--;
						PlayQueue.prev();
						// API.getPrevious();
						API.getStartResume($scope.tracks[m].track.album.uri,$scope.tracks[m].track.track_number-1);
					}else{
						PlayQueue.prev();
						Playback.startPlaying(PlayQueue.getCurrent());
					}
				}, function(err) {
					////console..log("Erreur ",err);
			});
		};

		$scope.queue = function(trackuri) {
			PlayQueue.enqueue(trackuri);
		};

		$scope.showhome = function() {
		};

		$scope.showplayqueue = function() {
		};

		$scope.showplaylist = function(playlisturi) {
		};

		$scope.query = '';

		$scope.loadsearch = function() {
			$location.path('/search').search({ q: $scope.query }).replace();
		};
		
		
		$scope.volume = Playback.getVolume();
		API.setVolume(100);
		

		$scope.changevolume = function() {
			API.getMe().then(function(userInfo) {
				if(userInfo.product=='premium'){
					API.setVolume($scope.volume);
					// //console.loglog("Je change ton volume");
				}else{
					Playback.setVolume($scope.volume);
				}
			}, function(err) {
					////console..log("Erreur ",err);
			});
		};

		$scope.changeprogress = function() {
			////console..log("Progress "+$scope.progress);
			API.getMe().then(function(userInfo) {
				if(userInfo.product=='premium'){
					//console.loglog("Tu veux aller plus vite que moi");
				}else{
					Playback.setProgress($scope.progress);
				}
			}, function(err) {
					////console..log("Erreur ",err);
			});
		};

		$rootScope.$on('c', function() {
			$scope.profileUsername = Auth.getUsername();
			updatePlaylists();
		});

		$rootScope.$on('playqueuechanged', function() {
			$scope.currenttrack = PlayQueue.getCurrent();
			//////console..log('PlayerController: play queue changed.');
			$scope.duration = Playback.getDuration();
		});

		$rootScope.$on('playerchanged', function() {
			////console..log('PlayerController: player changed. '+n);
			$scope.currenttrack = Playback.getTrack();
			$scope.playing = Playback.isPlaying();
			$scope.trackdata = Playback.getTrackData();
		});
	
		$rootScope.$on('endtrack', function() {
			$scope.nc=n;
			localStorage.getItem('compteur', '');
			localStorage.setItem('compteur', n);
			$scope.currenttrack = Playback.getTrack();
			$scope.trackdata = Playback.getTrackData();
			$scope.playing = Playback.isPlaying();
			PlayQueue.next();
			$scope.duration = Playback.getDuration();
			
			if(n>$scope.tracks.length-1&&n!=1){
				localStorage.setItem('compteur', 0);
				n=0;
				t=0;
				tc=0;
				$scope.uri=[];
				$scope.playOnload($scope.tracks[0].track.uri);
			}if(n==1){
				$scope.uri.push($scope.tracks[1].track.uri);
				$scope.playOnload($scope.tracks[1].track.uri);
			}else{
				$scope.uri.push($scope.tracks[n].track.uri);
				Playback.pause();
				PlayQueue.clear();
				$rootScope.$emit('prochain');
			}
		});
		
		$rootScope.$on('endtrackpr', function() {
			$scope.nc=n;
			localStorage.getItem('compteur', '');
			localStorage.setItem('compteur', n);
			PlayQueue.next();
			////console..log("Nnnnnnnnn "+n);
			if(n>$scope.tracks.length-1&&n!=1){
				localStorage.setItem('compteur', 0);
				n=0;
				t=0;
				tc=0;
				$scope.uri=[];
				$scope.playOnload($scope.tracks[0].track.uri);
			}if(n==1){
				$scope.uri.push($scope.tracks[1].track.uri);
				$scope.playOnload($scope.tracks[1].track.uri);
			}else{
				$scope.uri.push($scope.tracks[n].track.uri);
				API.getPause();
				$rootScope.$emit('prochainpr');
			}
		});
		
		$scope.$watch("uri.length",function( newValue, oldValue ) {
			tc++;
			t=0;
			n++;
        });
		
		$rootScope.$on('prochainpr', function() {
			t++;
			if(tc>1&&t==1){
				API.getPause();
				if(n>$scope.tracks.length-1){
					n=0;
					$scope.uri=[];
					$scope.playOnload($scope.tracks[0].track.uri);
				}else{
					$scope.playOnload($scope.tracks[n].track.uri);
				}
			}else{
				return;
			}
		});
		
		
		$rootScope.$on('prochain', function() {
			t++;
			if(tc>1&&t==1){
				Playback.pause();
				PlayQueue.clear();
				if(n>$scope.tracks.length-1){
					n=0;
					$scope.uri=[];
					$scope.playOnload($scope.tracks[0].track.uri);
				}else{
					$scope.playOnload($scope.tracks[n].track.uri);
				}
			}else{
				return;
			}
		});
		
		$rootScope.$on('trackprogress', function() {
			//////console..log('PlayerController: trackprogress.');
			$scope.progress = Playback.getProgress();
			$scope.duration = Playback.getDuration();
		});
		
		API.isFollowingPlaylist($scope.username, $scope.playlist).then(function(booleans) {
			//////console..log("Avoir le statut suivant pour la liste de lecture: " + booleans[0]);
			$scope.isFollowing = booleans[0];
		});

		$scope.follow = function(isFollowing) {
			if (isFollowing) {
				API.unfollowPlaylist($scope.username, $scope.playlist).then(function() {
					$scope.isFollowing = false;
					$rootScope.$emit('playlistsubscriptionchange');
				});
			} else {
				API.followPlaylist($scope.username, $scope.playlist).then(function() {
					$scope.isFollowing = true;
					$rootScope.$emit('playlistsubscriptionchange');
				});
			}
		};
		
		$scope.play = function(trackuri) {
			PlayQueue.clear();
			$scope.playOnload(trackuri);
		};
		
		$scope.playall = function() {
			var trackuris = $scope.tracks.map(function(track) {
				return track.track.uri;
			});
			PlayQueue.clear();
			PlayQueue.enqueueList(trackuris);
			PlayQueue.playFrom(0);
		};

		$scope.toggleFromYourMusic = function(index) {
			if ($scope.tracks[index].track.inYourMusic) {
				API.removeFromMyTracks([$scope.tracks[index].track.id]).then(function(response) {
					$scope.tracks[index].track.inYourMusic = false;
				});
			} else {
				API.addToMyTracks([$scope.tracks[index].track.id]).then(function(response) {
					$scope.tracks[index].track.inYourMusic = true;
				});
			}
		};

		$scope.menuOptionsPlaylistTrack = function() {
			if ($scope.profileUsername === Auth.getUsername()) {
				return [[
					'Supprimer',
					function ($itemScope) {
						var position = $itemScope.$index;
						API.removeTrackFromPlaylist(
							$scope.username,
							$scope.playlist,
							$itemScope.t.track, position).then(function() {
								$scope.tracks.splice(position, 1);
							});
					}]]
			} else {
				return null;
			}
		};
	});

})();
