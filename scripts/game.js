// Main Game Scripts

(function() {
	var app = angular.module('game',[]);
	
	//Resources
	var initValues = {
		research: 0,
		programs: {
			amount: 0,
			cost: 5
		}
	};
	
	app.controller('GameController', function($interval){
		var self = this;
		self.resources = initValues;
		
		self.clickResearch = function(num) {
			self.resources.research += num;
		};
		
		self.buyProgram = function(num) {
			if (self.resources.programs.cost <= self.resources.research){
				self.resources.research -= self.resources.programs.cost;
				self.resources.programs.amount += num;
			};	
		};
		
		self.timer = $interval(function(){
			if (self.resources.programs.amount > 0){
				self.resources.research += self.resources.programs.amount;
			};
		}, 1000);

	});	
	
	app.controller('TabController', function(){
		var self = this;
		self.tab = 1;
			
		self.selectTab = function(setTab) {
			self.tab = setTab;
		};
		
		self.isSelected = function(checkTab){
			return self.tab === checkTab;
		};
		
	});
	
	
})();