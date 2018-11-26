(function() {

	var module = angular.module('PlayerApp');

	module.factory('servicebd', function($q, $http) {
		var listUrl = 'server/List.php';
		var insertUrl = 'server/insert.php';
		var donnees=[];
		
		return {

			getList: function() {
				var ret = $q.defer();
				$http.get(listUrl).then(function(response) {
					for(var i=0;i<response.data.length;i++){
						donnees.push(response.data[i]);
					}
				},function(err){ 
					console.error('Erreur', err); 
				});
				
				// return donnees;
			},
			
			getList2: function() {
				console.log("Codeeeeeeeer "+donnees.length);
				return donnees;
			}
			
		};
	});

})();
