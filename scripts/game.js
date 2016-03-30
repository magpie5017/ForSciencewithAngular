// Main Game Scripts

(function() {
	var app = angular.module('game',["ngStorage"]);
	
	app.filter('capitalize', function() {
		return function(input) {
		  return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
		}
	});
	
	//Resources
	var initValues = {
		research: 0,
		programs: {
			name: "programs",
			amount: 0,
			cost: 5,
			costName: "research",
			description: "Computer programs generate research for you."
		},
		papers:{
			name: "papers",
			amount: 0,
			cost: 10,
			costName: "research",
			description: "Publishing papers will bring you prestige and renown."
		},
		money: {
			name: "money",
			amount: 0,
			cost: 5	,
			costName: "papers",
			description: "Money can buy...stuff."
		},
		cabinets: {
			name: "cabinets",
			amount: 1,
			cost: 10,	
			limit: 1000,
			costName: "money",
			description: "Cabinets are where you store your research."
		}
	};
	
	
	
	app.controller('GameController', function($interval,$scope,$localStorage){
		var self = this;
		self.resources = initValues;
		self.logoPristine = true;
		self.countCheck = 0;
		self.programminglvl2 = true;
		self.newslog = "You are managing your scientists well.";
		
		self.upgradeResource = function(resource,level){
			switch(resource){
				case "programs":
					self.resources.programs.cost = Math.floor(self.resources.programs.cost / level);
					self.programminglvl2 = false;
					self.newslog = "The group attended a programming conference together! Programs now cost half (rounded down). \n \n " + self.newslog;
					break;
					
				case "papers":
					if (self.resources.research >= (self.resources.papers.cost * amount)){
						self.resources.research -= self.resources.papers.cost * amount;
						self.resources.papers.amount += amount;
					} else {
						alert("Need more Research!");
					};
					break;
					
				case "money":
					if (self.resources.papers.amount >= (self.resources.money.cost * amount)){
						self.resources.papers.amount -= self.resources.money.cost * amount;
						self.resources.money.amount += amount;
					} else {
						alert("Need more Papers!");
					};
					break;
					
				case "cabinets":
					if (self.resources.money.amount >= (self.resources.cabinets.cost * amount)){
						self.resources.money.amount -= self.resources.cabinets.cost * amount;
						self.resources.cabinets.amount += amount;
					} else {
						alert("Need more Research!");
					};
					break;
				
				default:
					alert("Something went wrong with your purchase.");
					break;
			};
		};
		
		self.hoverCost = function(element,state,count) {
			if (state === "visible"){
				self[element + 'cost'] = true;
				self.countCheck = count;
			} if (state === "hidden"){
				self[element + 'cost'] = false;
			};
		};
		
		self.hoverDesc = function(element,state) {
			if (state === "visible"){
				self[element + 'maindesc'] = true;
			} if (state === "hidden"){
				self[element + 'maindesc'] = false;
			};
		};
		
		self.buyCounts = [1,5,20,100];
		
		self.buyResources = function(amount,resource) {
			switch(resource){
				case "programs":
					if (self.resources.research >= (self.resources.programs.cost * amount)){
						self.resources.research -= self.resources.programs.cost * amount;
						self.resources.programs.amount += amount;
					} else {
						alert("Need more Research!");
					};
					break;
					
				case "papers":
					if (self.resources.research >= (self.resources.papers.cost * amount)){
						self.resources.research -= self.resources.papers.cost * amount;
						self.resources.papers.amount += amount;
					} else {
						alert("Need more Research!");
					};
					break;
					
				case "money":
					if (self.resources.papers.amount >= (self.resources.money.cost * amount)){
						self.resources.papers.amount -= self.resources.money.cost * amount;
						self.resources.money.amount += amount;
					} else {
						alert("Need more Papers!");
					};
					break;
					
				case "cabinets":
					if (self.resources.money.amount >= (self.resources.cabinets.cost * amount)){
						self.resources.money.amount -= self.resources.cabinets.cost * amount;
						self.resources.cabinets.amount += amount;
					} else {
						alert("Need more Research!");
					};
					break;
				
				default:
					alert("Something went wrong with your purchase.");
					break;
			};
		};
		
		self.clickResearch = function(num) {
			if (self.resources.research < (self.resources.cabinets.amount * self.resources.cabinets.limit)){
				self.resources.research += num;
			};
		};

		
		self.timer = $interval(function(){
			if (self.resources.programs.amount > 0 && self.resources.research < (self.resources.cabinets.amount * self.resources.cabinets.limit)){
				self.resources.research += self.resources.programs.amount;
			} if (self.resources.research + self.resources.programs.amount > self.resources.cabinets.amount * self.resources.cabinets.limit) {
				self.resources.research = self.resources.cabinets.amount * self.resources.cabinets.limit;
			};
		}, 1000);
		
		$scope.$storage = $localStorage.$default({
			research: 0,
			programs: {
				amount: 0,
				cost: 5
			}
        });
		
		self.resetGame = function() {
			$storage.$reset({
      			research: 0,
				programs: {
					amount: 0,
					cost: 5
				}
    		});
		};
	});	
	
	app.controller('TabController', function(){
		var self = this;
		self.tab = 1;
		self.indivStudy = "*Unlock this character with the Individual Study upgrade.";
			
		self.selectTab = function(setTab) {
			self.tab = setTab;
		};
		
		self.isSelected = function(checkTab){
			return self.tab === checkTab;
		};
		
	});
	
	app.controller('LwrTabController', function(){
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