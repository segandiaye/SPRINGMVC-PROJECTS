(function() {

	var module = angular.module('PlayerApp');

	module.factory('Auth', function() {
		//console.log('Auth.js  Auth factory Ligne 6');
		var CLIENT_ID = '';
		var REDIRECT_URI = '';
		var count=0;

		if (location.host != '') {
			CLIENT_ID =	'ea3ebc3bba604a10b5d851d858253889';
			REDIRECT_URI = 'http://localhost/SAIZIK_AVEC_SPOTIFY/callback.html';
		} else {
			CLIENT_ID = 'ea3ebc3bba604a10b5d851d858253889';
			REDIRECT_URI = 'http://localhost/SAIZIK_AVEC_SPOTIFY/callback.html';
		}

		function getLoginURL(scopes) {
			return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID
				+ '&redirect_uri=' + encodeURIComponent(REDIRECT_URI)
				+ '&scope=' + encodeURIComponent(scopes.join(' '))
				+ '&response_type=token';
		}

		return {
			openLogin: function() {
				var url = getLoginURL([
					'user-read-private',
					'playlist-read-private',
					'playlist-modify-public',
					'playlist-modify-private',
					'user-library-read',
					'user-library-modify',
					'user-follow-read',
					'user-follow-modify',
					'user-read-birthdate',
					'user-read-email',
					'user-modify-playback-state',
					'user-read-currently-playing',
					'user-read-playback-state'
				]);

				var width = 450,
					height = 730,
					left = (screen.width / 2) - (width / 2),
					top = (screen.height / 2) - (height / 2);
					count++;
				var w = window.open(url,
						'Spotify',
						'menubar=no,location=no,resizable=no,scrollbars=no,copyhistory=no,status=no, width=' + width + 
						', height=' + height + ', top=' + top + ', left=' + left
				);
			},
			getAccessToken: function() {
				var expires = 0 + localStorage.getItem('pa_expires', 0);
				// console.log('NEWDATE '+(new Date()).getTime());
				// console.log('EXPRESS2 '+localStorage.getItem('pa_expires', 0));
				if ((new Date()).getTime() > expires) {
					return '';
				}
				var token = localStorage.getItem('pa_token', '');
				return token;
			},
			setAccessToken: function(token, expires_in) {
				localStorage.setItem('pa_token', token);
				localStorage.setItem('pa_expires', (new Date()).getTime() + expires_in);
				// _token = token;
				// _expires = expires_in;
			},
			getUsername: function() {
				var username = localStorage.getItem('pa_username', '');
				return username;
			},
			setUsername: function(username) {
				//console.log('Username '+username);
				localStorage.setItem('pa_username', username);
			},
			getUserCountry: function() {
				var userCountry = localStorage.getItem('pa_usercountry', 'US');
				return userCountry;
			},
			setUserCountry: function(userCountry) {
				localStorage.setItem('pa_usercountry', userCountry);
			}
		}
	});

})();
