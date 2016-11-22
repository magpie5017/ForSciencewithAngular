// Tab Controllers

(function() {
   angular.module('app.controllers')
		.controller('TabController', function(){
			var self = this;
			self.tab = 1;
			self.indivStudy = "*Unlock this character with the Individual Study upgrade.";
				
			self.selectTab = function(setTab) {
				self.tab = setTab;
			};
			
			self.isSelected = function(checkTab){
				return self.tab === checkTab;
			};
			
		})
	
		.controller('RtTabController', function(){
			var self = this;
			self.tab = 1;
				
			self.selectTab = function(setTab) {
				self.tab = setTab;
			};
			
			self.isSelected = function(checkTab){
				return self.tab === checkTab;
			};
			
		})
}());