// Game Resource Controller

(function() {
   angular.module('app.controllers')
		.controller('GameController', function($interval,$scope,$localStorage){
			var self = this;
			self.countCheck = 0;
			self.programminglvl2 = true;
			self.newslog = "You are managing your scientists well.";
			self.testValue = 6;
			self.charSet = function(input){
				self.currentChar = input;
			};
			
			self.Resource = function(name, amount, cost, costname, desc, modname, mod, order){
				  this.name = name;
				  this.amount = amount;
				  this.cost = cost;
				  this.costName = costname;
				  this.description = desc;
				  this.modifierName = modname;
				  this.modifier = mod;
				  this.order = order;
			  };
				
			  self.Character = function(name, research, time, happiness, productivity, economy, color1, color2){
				  this.firstName = name;
				  this.research = research;
				  this.freeTime = time;
				  this.happinessBuff = happiness;
				  this.productivityBuff = productivity;
				  this.economyBuff = economy;
				  this.mainColor = color1;
				  this.secondColor = color2;
				  this.programs = new self.Resource("programs", 0, 5, "research", "Computer programs generate research for you.", "none", 0, 1);
				  this.papers = new self.Resource("papers", 0, 10, "research", "Publishing papers will bring you prestige and funding.", "none", 0, 2);
				  this.money = new self.Resource("money", 5, 5, "papers", "Money can buy...stuff.", "inflation", 1, 3);
				  this.cabinets = new self.Resource("cabinets", 1, 10, "money", "Cabinets are where you store your research.", "capacity", 100, 4);
				  
				  this.functTest = function(input){
					  console.log(input + ", test complete");					  
				  };
			  };
			  
			
			  
			self.clickResearch = function(num,char) {
				  if (self["resources"][char]["research"] < (self["resources"][char]["cabinets"]["amount"] * self["resources"][char]["cabinets"]["modifier"])){
					  self["resources"][char]["research"] += num;
				  };
			};
			   
			self.buyResource = function(resname,resamount,char){
				var costRes = self["resources"][char][resname]["costName"];
				if (costRes === "research"){
					if (self["resources"][char][costRes] >= (self["resources"][char][resname]["cost"] * resamount)){
						self["resources"][char][costRes] -= (self["resources"][char][resname]["cost"] * resamount);
						self["resources"][char][resname]["amount"] += resamount;	
					} else if (self["resources"][char][costRes] < (self["resources"][char][resname]["cost"] * resamount)){
						alert("Need more " + costRes + "!");
					} else {
						alert("Something went wrong!");
					};
				} else {
				   if (self["resources"][char][costRes]["amount"] >= (self["resources"][char][resname]["cost"] * resamount)){
						self["resources"][char][costRes]["amount"] -= (self["resources"][char][resname]["cost"] * resamount);
						self["resources"][char][resname]["amount"] += resamount;	
					} else if (self["resources"][char][costRes]["amount"] < (self["resources"][char][resname]["cost"] * resamount)){
						alert("Need more " + costRes + "!");
					} else {
						alert("Something went wrong!");
					}; 
				};
				
			};
			
			self.resources = $localStorage.$default({ //name, research, time, happiness, productivity, economy, color1, color2
				research: 0,
				logoPristine: true,
				tutorial: new self.Character("Tutorial",0,0,0,0,0),
				ani: new self.Character("Ani",0,0,5,8,7,"#8aa2ce","#aebbd2"),
				koko: new self.Character("Koko",0,0,8,3,5,"#ce8a8a","#d2aeae"),
				meina: new self.Character("Meina",0,0,8,4,2,"#ce8ac7","#d2aecf"),
				sirin: new self.Character("Sirin",0,0,4,8,5,"#94b08a","#b3d2ae"),
				tourik: new self.Character("Tourik",0,0,3,5,8,"#83b8b9","#aecfd2")
	
			});
			
			self.upgradeResource = function(resource,level,char){
				switch(resource){
					case "programs":
						self.resources.tutorial.programs.cost = Math.floor(self.resources.tutorial.programs.cost / level);
						self.programminglvl2 = false;
						self.newslog = "The group attended a programming conference together! Programs now cost half (rounded down). \n \n " + self.newslog;
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
	
			self.timer = $interval(function(){
				if (self.resources.tutorial.research + self.resources.tutorial.programs.amount > self.resources.tutorial.cabinets.amount * self.resources.tutorial.cabinets.modifier) {
					self.resources.tutorial.research = self.resources.tutorial.cabinets.amount * self.resources.tutorial.cabinets.modifier;
				} else if (self.resources.tutorial.programs.amount > 0 && self.resources.tutorial.research < (self.resources.tutorial.cabinets.amount * self.resources.tutorial.cabinets.modifier)){
					self.resources.tutorial.research += self.resources.tutorial.programs.amount;
				};
			}, 1000);
	
			self.resetGame = function() {
				$localStorage.$reset({
					research: 0,
					logoPristine: true,
					tutorial: new self.Character("Tutorial",0,0,0,0,0),
					ani: new self.Character("Ani",0,0,5,8,7,"#8aa2ce","#aebbd2"),
					koko: new self.Character("Koko",0,0,8,3,5,"#ce8a8a","#d2aeae"),
					meina: new self.Character("Meina",0,0,8,4,2,"#ce8ac7","#d2aecf"),
					sirin: new self.Character("Sirin",0,0,4,8,5,"#9cce8a","#b3d2ae"),
					tourik: new self.Character("Tourik",0,0,3,5,8,"#8ac8ce","#aecfd2")
					
				});
			};
			
		});	

}());