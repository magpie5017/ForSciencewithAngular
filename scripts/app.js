// Game App

(function() {
    angular.module('app',['app.controllers', 'app.filters', 'app.directives', 'ngStorage','ngAnimate']);
	angular.module('d3', []);
    angular.module('app.controllers', []);
	angular.module('app.filters', []);
	angular.module('app.directives', ['d3']);
}());