(function() {

	var module = angular.module('PlayerApp');

	module.factory('API', function(Auth, $q, $http) {
		////console..log('API.js API Factory Ligne 6');
		var baseUrl = 'https://api.spotify.com/v1';

		return {

			getMe: function() {
				////console..log('TOKEN OK '+Auth.getAccessToken());
				var ret = $q.defer();
				$http.get(baseUrl + '/me', {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('got userinfo', r);
					ret.resolve(r);
				}).error(function(err) {
					////console..log('N\'a pas pu obtenir de l\'information utilisateur', err);
					ret.reject(err);
				});
				return ret.promise;
			},

			getMyUsername: function() {
				var ret = $q.defer();
				$http.get(baseUrl + '/me', {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('obtenir information utilisateur', r);
					//ret.resolve(r.id);
					ret.resolve('test_1');
				}).error(function(err) {
					////console..log('N\'a pas pu obtenir de l\'information utilisateur', err);
					//ret.reject(err);
					//
					ret.resolve('test_1');
				});
				return ret.promise;
			},

			getMyTracks: function() {
				var ret = $q.defer();
				$http.get(baseUrl + '/me/tracks', {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('A eu des pistes d\'utilisateurs', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			containsUserTracks: function(ids) {
				var ret = $q.defer();
				$http.get(baseUrl + '/me/tracks/contains?ids=' + encodeURIComponent(ids.join(',')), {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('Contient des pistes d\'utilisateur', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			addToMyTracks: function(ids) {
				var ret = $q.defer();
				$http.put(baseUrl + '/me/tracks?ids=' + encodeURIComponent(ids.join(',')), {}, {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('La réponse a été ajoutée à mes albums', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			removeFromMyTracks: function(ids) {
				var ret = $q.defer();
				$http.delete(baseUrl + '/me/tracks?ids=' + encodeURIComponent(ids.join(',')), {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('J\'ai répondu de la suppression de mes morceaux', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getPlaylists: function(username) {
				var limit = 50;
				var ret = $q.defer();
				var playlists = [];

				$http.get(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists', {
					params: {
						limit: limit
					},
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					playlists = playlists.concat(r.items);

					var promises = [],
							total = r.total,
							offset = r.offset;

					while (total > limit + offset) {
						promises.push(
							$http.get(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists', {
								params: {
									limit: limit,
									offset: offset + limit
								},
								headers: {
									'Authorization': 'Bearer ' + Auth.getAccessToken()
								}
							})
						);
						offset += limit;
					};

					$q.all(promises).then(function(results) {
						results.forEach(function(result) {
							playlists = playlists.concat(result.data.items);
						})
						////console..log('A eu des listes de lecture', playlists);
						ret.resolve(playlists);
					});

				}).error(function(data, status, headers, config) {
					ret.reject(status);
				});
				return ret.promise;
			},

			getPlaylist: function(username, playlist) {
				var ret = $q.defer();
				$http.get(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists/' + encodeURIComponent(playlist), {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('A eu des listes de lecture', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getPlaylistTracks: function(username, playlist) {
				var ret = $q.defer();
				$http.get(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists/' + encodeURIComponent(playlist) + '/tracks', {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					// console.log('J\'ai des morceaux de playlist', r);
					ret.resolve(r);
				});
				
				return ret.promise;
			},

			changePlaylistDetails: function(username, playlist, options) {
				var ret = $q.defer();
				$http.put(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists/' + encodeURIComponent(playlist), options, {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('Obtenu une réponse après avoir changé les détails de la playlist', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			removeTrackFromPlaylist: function(username, playlist, track, position) {
				var ret = $q.defer();
				$http.delete(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists/' + encodeURIComponent(playlist) + '/tracks',
					{
						data: {
							tracks: [{
								uri: track.uri,
								position: position
							}]
						},
						headers: {
							'Authorization': 'Bearer ' + Auth.getAccessToken()
						}
				}).success(function(r) {
					////console..log('Supprimer la piste de la liste de lecture', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getTrack: function(trackid) {
				var ret = $q.defer();
				$http.get(baseUrl + '/tracks/' + encodeURIComponent(trackid), {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('got track', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getTracks: function(trackids) {
				var ret = $q.defer();
				$http.get(baseUrl + '/tracks/?ids=' + encodeURIComponent(trackids.join(',')), {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('got tracks', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getAlbum: function(albumid) {
				var ret = $q.defer();
				$http.get(baseUrl + '/albums/' + encodeURIComponent(albumid), {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('obenir album', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getAlbumTracks: function(albumid) {
				var ret = $q.defer();
				$http.get(baseUrl + '/albums/' + encodeURIComponent(albumid) + '/tracks', {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('J\'ai des morceaux d\'album', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getArtist: function(artistid) {
				var ret = $q.defer();
				$http.get(baseUrl + '/artists/' + encodeURIComponent(artistid), {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('Artiste obtenu', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getArtistAlbums: function(artistid, country) {
				var ret = $q.defer();
				$http.get(baseUrl + '/artists/' + encodeURIComponent(artistid) + '/albums?country=' + encodeURIComponent(country), {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('A obtenu des albums d\'artistes', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getArtistTopTracks: function(artistid, country) {
				var ret = $q.defer();
				$http.get(baseUrl + '/artists/' + encodeURIComponent(artistid) + '/top-tracks?country=' + encodeURIComponent(country), {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('A obtenu les meilleurs titres de l\'artiste', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getSearchResults: function(query) {
				var ret = $q.defer();
				$http.get(baseUrl + '/search?type=track,playlist&q=' + encodeURIComponent(query) + '&market=from_token', {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('Obtenu des résultats de recherche', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getNewReleases: function(country) {
				var ret = $q.defer();
				$http.get(baseUrl + '/browse/new-releases?country=' + encodeURIComponent(country), {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('Obtenu de nouveaux résultats', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getFeaturedPlaylists: function(country, timestamp) {
				var ret = $q.defer();
				$http.get(baseUrl + '/browse/featured-playlists?country=' +
					encodeURIComponent(country) +
					'&timestamp=' + encodeURIComponent(timestamp), {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('Obtenu les résultats des listes de lecture en vedette', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getUser: function(username) {
				var ret = $q.defer();
				$http.get(baseUrl + '/users/' +
					encodeURIComponent(username),
				{
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					console.log('A obtenu l\'information utilisateur', r);
					ret.resolve(r);
				}).error(function(err) {
					////console..log('N\'a pas pu obtenir de l\'information utilisateur', err);
					ret.reject(err);
				});
				return ret.promise;
			},

			isFollowing: function(id, type) {
				var ret = $q.defer();
				$http.get(baseUrl + '/me/following/contains?' +
					'type=' + encodeURIComponent(type) +
					'&ids=' + encodeURIComponent(id),
				{
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('A suivi', r);
					ret.resolve(r);
				}).error(function(err) {
					////console..log('N\'a pas réussi à suivre', err);
					ret.reject(err);
				});

				return ret.promise;
			},

			follow: function(id, type) {
				var ret = $q.defer();
				$http.put(baseUrl + '/me/following?' +
					'type=' + encodeURIComponent(type),
				{ ids : [ id ] },
				{ headers: { 'Authorization': 'Bearer ' + Auth.getAccessToken() }
				}).success(function(r) {
					////console..log('Suivi', r);
					ret.resolve(r);
				}).error(function(err) {
					////console..log('Ne pas suivre', err);
					ret.reject(err);
				});

				return ret.promise;
			},

			unfollow: function(id, type) {
				var ret = $q.defer();
				$http.delete(baseUrl + '/me/following?' +
					'type=' + encodeURIComponent(type),
				{ data: {
						ids: [ id ]
				},
				headers: {
					'Authorization': 'Bearer ' + Auth.getAccessToken()
				}
				}).success(function(r) {
					////console..log('Non suivi', r);
					ret.resolve(r);
				}).error(function(err) {
					////console..log('N\'a pas cessé de suivre', err);
					ret.reject(err);
				});

				return ret.promise;
			},

			followPlaylist: function(username, playlist) {
				var ret = $q.defer();
				$http.put(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists/' +
					encodeURIComponent(playlist) + '/followers',
				{},
				{ headers: { 'Authorization': 'Bearer ' + Auth.getAccessToken() }
				}).success(function(r) {
					////console..log('Suivi de la liste de lecture', r);
					ret.resolve(r);
				}).error(function(err) {
					////console..log('Échec de suivre la liste de lecture', err);
					ret.reject(err);
				});

				return ret.promise;
			},

			unfollowPlaylist: function(username, playlist) {
				var ret = $q.defer();
				$http.delete(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists/' +
					encodeURIComponent(playlist) + '/followers',
				{ headers: { 'Authorization': 'Bearer ' + Auth.getAccessToken() }
				}).success(function(r) {
					////console..log('unfollowed playlist', r);
					ret.resolve(r);
				}).error(function(err) {
					////console..log('A échoué à ne pas suivre la liste de lecture', err);
					ret.reject(err);
				});

				return ret.promise;
			},

			isFollowingPlaylist: function(username, playlist) {
				var ret = $q.defer();
				$http.get(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists/' +
					encodeURIComponent(playlist) + '/followers/contains', {
						params: {
							ids: [Auth.getUsername()]
						},
						headers: { 'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					////console..log('Vérifiez si la liste de lecture est suivie', r);
					ret.resolve(r);
				}).error(function(err) {
					////console..log('Échec de vérifier si la liste de lecture est suivie', err);
					ret.reject(err);
				});

				return ret.promise;
			},

			getBrowseCategories: function() {
				var ret = $q.defer();
				$http.get(baseUrl + '/browse/categories', {
					headers: { 'Authorization': 'Bearer ' + Auth.getAccessToken() }
				}).success(function(r) {
					////console..log('got browse categories', r);
					ret.resolve(r);
				}).error(function(err) {
					////console..log('Échec d\'obtenir des catégories de navigation', err);
					ret.reject(err);
				});
				return ret.promise;
			},

			getBrowseCategory: function(categoryId) {
				var ret = $q.defer();
				$http.get(baseUrl + '/browse/categories/' + categoryId, {
					headers: { 'Authorization': 'Bearer ' + Auth.getAccessToken() }
				}).success(function(r) {
					////console..log('got browse category', r);
					ret.resolve(r);
				}).error(function(err) {
					////console..log('Échec de la catégorie de navigation', err);
					ret.reject(err);
				});
				return ret.promise;
			},

			getBrowseCategoryPlaylists: function(categoryId, country) {
				var ret = $q.defer();
				$http.get(baseUrl + '/browse/categories/' + categoryId + '/playlists?country=' + encodeURIComponent(country), {
					headers: { 'Authorization': 'Bearer ' + Auth.getAccessToken() }
				}).success(function(r) {
					////console..log('Avoir des listes de lecture de catégories de navigation', r);
					ret.resolve(r);
				}).error(function(err) {
					////console..log('Échec d\'obtenir des listes de lecture de catégorie', err);
					ret.reject(err);
				});
				return ret.promise;
			},
			
			
			getDeviceId: function() {
				var ret = $q.defer();
				$http.get(baseUrl + '/me/player/devices' , {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					ret.resolve(r);
				});
				return ret.promise;
			},
			
			getStartResume: function(albumUri,position) {
				$http.put
				(	baseUrl + '/me/player/play',
					{
					  "context_uri": ""+albumUri, 
					  "offset": {
						"position": position
					  } 
					},
					{
						headers: {
							'Authorization': 'Bearer '  + Auth.getAccessToken()
						}
					}
				).then(function(response) {
					//console..log("Démarrer ",response);
				},function(err){ 
					//console..error('Erreur ', err); 
				});
			},
			getPause: function() {
				$http.put
				(	baseUrl + '/me/player/pause',
					{},
					{
						headers: {
							'Authorization': 'Bearer '  + Auth.getAccessToken()
						}
					}
				).then(function(response) {
					// //console..log("Pause ",response);
				},function(err){ 
					//console..error('Erreur ', JSON.stringify(err)); 
				});
			},
			getNext: function() {
				$http.post
				(	baseUrl + '/me/player/next',
					{},
					{
						headers: {
							'Authorization': 'Bearer '  + Auth.getAccessToken()
						}
					}
				).then(function(response) {
					//console..log("Next ",JSON.stringify(response));
				},function(err){ 
					//console..error('Erreur ', err); 
				});
			},
			getPrevious: function() {
				$http.post
				(	baseUrl + '/me/player/previous',
					{},
					{
						headers: {
							'Authorization': 'Bearer '  + Auth.getAccessToken()
						}
					}
				).then(function(response) {
					//console..log("Précécdent ",response);
				},function(err){ 
					//console..error('Erreur ', err); 
				});
			},
			getCurentTrack: function() {
				$http.get
				(	baseUrl + '/me/player/currently-playing',
					{
						headers: {
							'Authorization': 'Bearer '  + Auth.getAccessToken()
						}
					}
				).then(function(response) {
					//console..log("Current Track ",response);
				},function(err){ 
					//console..error('Erreur ', err); 
				});
			},
			setVolume: function(taille) {
				$http.put
				(baseUrl + '/me/player/volume?volume_percent='+taille,
					{}
					,
					{
						headers: {
							'Authorization': 'Bearer '  + Auth.getAccessToken()
						}
					}
				).then(function(response) {
					// console.log("Volume ",response);
				},function(err){ 
					// console.error('Erreur ', err); 
				});
			},
			getProgress: function() {
				$http.get
				(	baseUrl + '/me/player/currently-playing',
					{
						headers: {
							'Authorization': 'Bearer '  + Auth.getAccessToken()
						}
					}
				).then(function(response) {
				},function(err){ 
					//console..log("hoErr ",err); 
				});
			}
		};
	});

})();
