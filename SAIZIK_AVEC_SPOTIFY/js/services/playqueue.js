(function() {

	var module = angular.module('PlayerApp');

	module.factory('PlayQueue', function(Playback, $rootScope, $http, $timeout) {
		//console.log('PlayQueu.js  Factory Ligne 6');
		var _queue = [];
		var _position = 0;
		var tracks=[];
		var url='';
		
		return {
			play: function(trackuri) {
				//console.log('Effacer la file d\'attente et la piste de lecture', trackuri);
				_queue = [];
				_queue.push(trackuri);
				_position = 0;
				$rootScope.$emit('playqueuechanged');
				Playback.startPlaying(trackuri);
			},
			enqueue: function(trackuri) {
				//console.log('Enqueue track', trackuri);
				_queue.push(trackuri);
				$rootScope.$emit('playqueuechanged');
			},
			enqueueList: function(trackuris) {
				//console.log('Enqueue tracks', trackuris);
				trackuris.forEach(function(trackuri) {
					_queue.push(trackuri);
				});
				$rootScope.$emit('playqueuechanged');
			},
			playFrom: function(index) {
				_position = index;
				$rootScope.$emit('playqueuechanged');
				Playback.startPlaying(_queue[_position]);
			},
			getQueue: function() {
				return _queue;
			},
			getPosition: function() {
				return _position;
			},
			getCurrent: function() {
				// //console.log('_position '+_position);
				// $timeout(function () {	
				// }, 2000);
				if (_queue.length > 0) {
					return _queue[_position];
				}
				return '';
			},
			clear: function() {
				_queue = [];
				_position = 0;
				$rootScope.$emit('playqueuechanged');
			},
			next: function() {
				console.log('PlayQueue: next '+_position);
				// loadData = function () {
					// $http.get("server/List.php").then(function(response) {
						// tracks = response.data;
						// for(var i=0;i<tracks.length;i++){
							// if(tracks[i].bool==1){
								// count=i;
								// break;
							// }
						// }
						// _position=count;
						// if (_position > _queue.length){
							// _position = 0;
						// }
					// },function(err){ 
						// console.error('Erreur', err); 
					// });
				// };
				// loadData();
				_position++;
				if (_position > _queue.length){
					_position = 0;
				}
				$rootScope.$emit('playqueuechanged');
			},
			prev: function() {
				//console.log('PlayQueue: prev');
				_position --;
				if (_position < 0) {
					_position =  _queue.length - 1;
				}
				$rootScope.$emit('playqueuechanged');
			}
		}
	});

})();
