// Game Filters

(function() {
   angular.module('app.filters')
		.filter('capitalize', function() {
			return function(input) {
			  return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
			}
		})
		
		.filter("toArray", function() {
			return function(input) {
				if(!input) return;
	
				if (input instanceof Array) {
					return input;
				}
	
				return $.map(input, function(val) {
					return val;
				});
			};
		})
   
}());