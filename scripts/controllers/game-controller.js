// Game Resource Controller
"use strict";
(function () {
    angular.module("app.controllers")
        .controller("GameController", function ($interval, $localStorage) {
            var self = this;
            self.programminglvl2 = true;
			self.buyCounts = [1, 5, 20, 100];
			
			// PROTOS

            self.Resource = function (name, amount, cost, costname, desc, modname, mod, order) {
                this.name = name;
                this.amount = amount;
                this.cost = cost;
                this.costName = costname;
                this.description = desc;
                this.modifierName = modname;
                this.modifier = mod;
                this.order = order;
            };

            self.Event = function (visible, name, description, news, cost, costname, activate) {
                this.visible = visible;
                this.name = name;
                this.desc = description;
                this.news = news;
                this.cost = cost;
                this.costName = costname;
                this.activate = activate;
            };
			
			// SAVED OBJECTS
			
			self.saved = $localStorage.$default({ //name, research, time, happiness, productivity, economy, color1, color2
                logoPristine: true,
				studyTableShow: false,
				newslog: "You are managing your scientists well.",
				tutorial: {
					firstName: "tutorial",
                	research: 0,
					programs: new self.Resource("programs", 0, 5, "research", "Computer programs generate research for you.", "none", 0, 1),
					papers: new self.Resource("papers", 0, 10, "research", "Publishing papers will bring you prestige and funding.", "none", 0, 2),
					money: new self.Resource("money", 5, 5, "papers", "Money can buy...stuff.", "inflation", 1, 3),
					cabinets: new self.Resource("cabinets", 5, 5, "money", "Cabinets are where you store your research.", "capacity", 100, 4)
				},
				ani: {
					firstName: "ani",
					research: 0,
					freeTime: 0,
					happinessBuff: 5,
					productivityBuff: 8,
					economyBuff: 7,
					mainColor: "#8aa2ce",
					secondColor: "#aebbd2",
					programs: new self.Resource("programs", 0, 5, "research", "Computer programs generate research for you.", "none", 0, 1),
					papers: new self.Resource("papers", 0, 10, "research", "Publishing papers will bring you prestige and funding.", "none", 0, 2),
					money: new self.Resource("money", 0, 5, "papers", "Money can buy...stuff.", "inflation", 1, 3),
					cabinets: new self.Resource("cabinets", 0, 5, "money", "Cabinets are where you store your research.", "capacity", 100, 4)
				},
				koko: {
					firstName: "koko",
					research: 0,
					freeTime: 0,
					happinessBuff: 8,
					productivityBuff: 3,
					economyBuff: 5,
					mainColor: "#ce8a8a",
					secondColor: "#d2aeae",
					programs: new self.Resource("programs", 0, 5, "research", "Computer programs generate research for you.", "none", 0, 1),
					papers: new self.Resource("papers", 0, 10, "research", "Publishing papers will bring you prestige and funding.", "none", 0, 2),
					money: new self.Resource("money", 0, 5, "papers", "Money can buy...stuff.", "inflation", 1, 3),
					cabinets: new self.Resource("cabinets", 0, 5, "money", "Cabinets are where you store your research.", "capacity", 100, 4)
				},
				meina: {
					firstName: "meina",
					research: 0,
					freeTime: 0,
					happinessBuff: 8,
					productivityBuff: 4,
					economyBuff: 2,
					mainColor: "#ce8ac7",
					secondColor: "#d2aecf",
					programs: new self.Resource("programs", 0, 5, "research", "Computer programs generate research for you.", "none", 0, 1),
					papers: new self.Resource("papers", 0, 10, "research", "Publishing papers will bring you prestige and funding.", "none", 0, 2),
					money: new self.Resource("money", 0, 5, "papers", "Money can buy...stuff.", "inflation", 1, 3),
					cabinets: new self.Resource("cabinets", 0, 5, "money", "Cabinets are where you store your research.", "capacity", 100, 4)
				},
				sirin: {
					firstName: "sirin",
					research: 0,
					freeTime: 0,
					happinessBuff: 4,
					productivityBuff: 8,
					economyBuff: 5,
					mainColor: "#94b08a",
					secondColor: "#b3d2ae",
					programs: new self.Resource("programs", 0, 5, "research", "Computer programs generate research for you.", "none", 0, 1),
					papers: new self.Resource("papers", 0, 10, "research", "Publishing papers will bring you prestige and funding.", "none", 0, 2),
					money: new self.Resource("money", 0, 5, "papers", "Money can buy...stuff.", "inflation", 1, 3),
					cabinets: new self.Resource("cabinets", 0, 5, "money", "Cabinets are where you store your research.", "capacity", 100, 4)
				},
				tourik: {
					firstName: "tourik",
					research: 0,
					freeTime: 0,
					happinessBuff: 3,
					productivityBuff: 5,
					economyBuff: 8,
					mainColor: "#83b8b9",
					secondColor: "#aecfd2",
					programs: new self.Resource("programs", 0, 5, "research", "Computer programs generate research for you.", "none", 0, 1),
					papers: new self.Resource("papers", 0, 10, "research", "Publishing papers will bring you prestige and funding.", "none", 0, 2),
					money: new self.Resource("money", 0, 5, "papers", "Money can buy...stuff.", "inflation", 1, 3),
					cabinets: new self.Resource("cabinets", 0, 5, "money", "Cabinets are where you store your research.", "capacity", 100, 4)
				},
				indivStudyEvent: new self.Event(
					true,
					"Individual Study",
					"The group is itching break off and do their own research.",
					"Every man for himself! Individual research has begun.",
					5,
					"cabinets"
				),
				programsLvl1Event: new self.Event(
					true,
					"Attend Programming Conference",
					"Programs cost halved (rounded down).",
					"The group attended a programming conference together! Programs now cost half (rounded down).",
					5,
					"money"
				)
            });
			
			// RESOURCE FUNCTIONS

            self.clickResearch = function (num, char) {
                if (self["saved"][char]["research"] < (self["saved"][char]["cabinets"]["amount"] * self["saved"][char]["cabinets"]["modifier"])) {
                    self["saved"][char]["research"] += num;
                }
            };

            self.buyResource = function (resname, resamount, char) {
                var costRes = self["saved"][char][resname]["costName"];
                if (costRes === "research") {
                    if (self["saved"][char][costRes] >= (self["saved"][char][resname]["cost"] * resamount)) {
                        self["saved"][char][costRes] -= (self["saved"][char][resname]["cost"] * resamount);
                        self["saved"][char][resname]["amount"] += resamount;
                    } else if (self["saved"][char][costRes] < (self["saved"][char][resname]["cost"] * resamount)) {
                        alert("Need more " + costRes + "!");
                    } else {
                        alert("Something went wrong!");
                    }
                } else {
                    if (self["saved"][char][costRes]["amount"] >= (self["saved"][char][resname]["cost"] * resamount)) {
                        self["saved"][char][costRes]["amount"] -= (self["saved"][char][resname]["cost"] * resamount);
                        self["saved"][char][resname]["amount"] += resamount;
                    } else if (self["saved"][char][costRes]["amount"] < (self["saved"][char][resname]["cost"] * resamount)) {
                        alert("Need more " + costRes + "!");
                    } else {
                        alert("Something went wrong!");
                    }
                }
            };

            self.upgradeResource = function (resource, level) {
                switch (resource) {
                    case "programs":
                        self.saved.tutorial.programs.cost = Math.floor(self.saved.tutorial.programs.cost / level);
                        self.programminglvl2 = false;
                        self.saved.newslog = "The group attended a programming conference together! Programs now cost half (rounded down). \n \n " + self.saved.newslog;
                        break;
                    default:
                        alert("Something went wrong with your purchase.");
                        break;
                }
            };
			
			// INDIVIDUAL STUDY FUNCTIONS
			
			self.indivStudyInit = function() {
				if (self.saved.indivStudyEvent.cost <= self.saved.tutorial.cabinets.amount){
					self.studyTableShow = true;
				} else {
					alert("Not enough cabinets! Remember: you must have at least one for each person to distribute.")
				}
			};
			
			self.indivStudyActivate = function(){
				self.saved.indivStudyEvent.visible = false;
				self.saved.newslog = self.saved.indivStudyEvent.news + "\n \n" + self.saved.newslog;
				self.saved.tutorial.cabinets.amount -= 5;
				self.saved.ani.cabinets.amount = 1;
				self.saved.koko.cabinets.amount = 1;
				self.saved.meina.cabinets.amount = 1;
				self.saved.sirin.cabinets.amount = 1;
				self.saved.tourik.cabinets.amount = 1;
			};
			
			self.indivStudyPlus = function(resrs,char){
				if(resrs == "research" && self.saved.tutorial.research > 0){
					self.saved.tutorial.research--;
					self["saved"][char]["research"]++;
				} else if (self["saved"]["tutorial"][resrs]["amount"] > 0){
					self["saved"]["tutorial"][resrs]["amount"]--;
					self["saved"][char][resrs]["amount"]++;
				} else if (self.saved.tutorial.research <= 0 || self["saved"]["tutorial"][resrs]["amount"] <= 0){
					alert("No more " + resrs + " left in the pot!");
				} else {
					alert("something went wrong!");	
				}
			};
			
			self.indivStudyMinus = function(resrs,char){
				if(resrs == "research" && self["saved"][char]["research"] > 0){
					self["saved"][char]["research"]--;
					self.saved.tutorial.research++;
				} else if(resrs == "cabinets" && self["saved"][char]["cabinets"]["amount"] == 1){
					alert("Each person must have at least 1 cabinet!");
				} else if(self["saved"][char][resrs]["amount"] > 0){
					self["saved"][char][resrs]["amount"]--;
					self["saved"]["tutorial"][resrs]["amount"]++;
				} else if(self["saved"][char]["research"] <= 0 || self["saved"][char][resrs]["amount"] <= 0){
					alert("No more " + resrs + " left here!");
				} else {
					alert("something went wrong!");	
				}
			};
			
			self.autoResSplit = function(resrs){
				self.remainder = 0;
				self.evenSplit = 0;
				if (resrs === "research"){
					if (self.saved.tutorial.research < 5){
						alert("Not enough to split evenly!");
					} else {
						self.remainder = self.saved.tutorial.research % 5;
						self.eachSplit = (self.saved.tutorial.research - self.remainder) / 5;
						self.saved.ani.research += self.eachSplit;
						self.saved.koko.research += self.eachSplit;
						self.saved.meina.research += self.eachSplit;
						self.saved.sirin.research += self.eachSplit;
						self.saved.tourik.research += self.eachSplit;
						self.saved.tutorial.research = self.remainder;
					}
				} else if (resrs !== "research"){
					if (self["saved"]["tutorial"][resrs]["amount"] < 5){
						alert("Not enough to split evenly!");
					} else {
						self.remainder = self["saved"]["tutorial"][resrs]["amount"] % 5;
						self.eachSplit = (self["saved"]["tutorial"][resrs]["amount"] - self.remainder) / 5;
						self["saved"]["ani"][resrs]["amount"] += self.eachSplit;
						self["saved"]["koko"][resrs]["amount"] += self.eachSplit;
						self["saved"]["meina"][resrs]["amount"] += self.eachSplit;
						self["saved"]["sirin"][resrs]["amount"] += self.eachSplit;
						self["saved"]["tourik"][resrs]["amount"] += self.eachSplit;
						self["saved"]["tutorial"][resrs]["amount"] = self.remainder;
					}
				} else {
					console.log("something went wrong with splitting");
				}
			};
			
			// EVENT FUNCTIONS

            self.programsLvl1Activate = function () {
				if (self.saved.indivStudyEvent.visible === true){
					if (self.saved.programsLvl1Event.cost <= self.saved.tutorial.money.amount) {
						self.saved.tutorial.money.amount -= self.saved.programsLvl1Event.cost;
						self.saved.tutorial.programs.cost = Math.floor(self.saved.tutorial.programs.cost / 2);
						self.saved.newslog = self.saved.programsLvl1Event.news + "\n \n" + self.saved.newslog;
						self.saved.programsLvl1Event.visible = false;
					} else {
						alert("not enough money!");
					}
				} else if (self.saved.indivStudyEvent.visible === false){
					self.indivCost = self.saved.programsLvl1Event.cost / 5;
					if (self.indivCost <= self.saved.ani.money.amount && self.indivCost <= self.saved.koko.money.amount && self.indivCost <= self.saved.meina.money.amount && self.indivCost <= self.saved.sirin.money.amount && self.indivCost <= self.saved.tourik.money.amount) {
						self.saved.ani.money.amount -= self.indivCost;
						self.saved.koko.money.amount -= self.indivCost;
						self.saved.meina.money.amount -= self.indivCost;
						self.saved.sirin.money.amount -= self.indivCost;
						self.saved.tourik.money.amount -= self.indivCost;
						self.saved.ani.programs.cost = Math.floor(self.saved.ani.programs.cost / 2);
						self.saved.koko.programs.cost = Math.floor(self.saved.koko.programs.cost / 2);
						self.saved.meina.programs.cost = Math.floor(self.saved.meina.programs.cost / 2);
						self.saved.sirin.programs.cost = Math.floor(self.saved.sirin.programs.cost / 2);
						self.saved.tourik.programs.cost = Math.floor(self.saved.tourik.programs.cost / 2);
						self.saved.newslog = self.saved.programsLvl1Event.news + "\n \n" + self.saved.newslog;
						self.saved.programsLvl1Event.visible = false;
					} else {
						alert("someone doesn't have enough money! pull your weight, people!");
					}
				}
            };
			
			// STATE MGMT FUNCTIONS

            self.hoverCost = function (element, state, count) {
				self.countCheck = 0;
                if (state === "visible") {
                    self[element + "cost"] = true;
					self.countCheck = count;
                }
                if (state === "hidden") {
                    self[element + "cost"] = false;
                }
            };

            self.hoverDesc = function (element, state) {
                if (state === "visible") {
                    self[element + "maindesc"] = true;
                }
                if (state === "hidden") {
                    self[element + "maindesc"] = false;
                }
            };
			
			self.resourceTotal = function(resrs){
				self.total = 0;
				if(resrs === "research"){
					self.total = self["saved"]["ani"][resrs] + self["saved"]["koko"][resrs] + self["saved"]["meina"][resrs] + self["saved"]["sirin"][resrs] + self["saved"]["tourik"][resrs];
				} else {
					self.total = self["saved"]["ani"][resrs]["amount"] + self["saved"]["koko"][resrs]["amount"] + self["saved"]["meina"][resrs]["amount"] +self["saved"]["sirin"][resrs]["amount"] + self["saved"]["tourik"][resrs]["amount"];
				}
				return self.total;
			};
			
			self.togglefade = false;
            self.autosaveNote = $interval(function () {
                self.togglefade = !self.togglefade;
            }, 7000);
			
			// AUTOCLICKER TIMER

            self.timer = $interval(function () {
				if (self.saved.indivStudyEvent.visible === true && self.saved.tutorial.programs.amount > 0){
					if (self.saved.tutorial.research + self.saved.tutorial.programs.amount > self.saved.tutorial.cabinets.amount * self.saved.tutorial.cabinets.modifier) {
						self.saved.tutorial.research = self.saved.tutorial.cabinets.amount * self.saved.tutorial.cabinets.modifier;
					} else if (self.saved.tutorial.research < (self.saved.tutorial.cabinets.amount * self.saved.tutorial.cabinets.modifier)) {
						self.saved.tutorial.research += self.saved.tutorial.programs.amount;
					}
				} 
				if (self.saved.ani.programs.amount > 0){ // ani
					if (self.saved.ani.research + self.saved.ani.programs.amount > self.saved.ani.cabinets.amount * self.saved.ani.cabinets.modifier) {
						self.saved.ani.research = self.saved.ani.cabinets.amount * self.saved.ani.cabinets.modifier;
					} else if (self.saved.ani.research < (self.saved.ani.cabinets.amount * self.saved.ani.cabinets.modifier)) {
						self.saved.ani.research += self.saved.ani.programs.amount;
					}
				}
				if (self.saved.koko.programs.amount > 0){ // koko
					if (self.saved.koko.research + self.saved.koko.programs.amount > self.saved.koko.cabinets.amount * self.saved.koko.cabinets.modifier) {
						self.saved.koko.research = self.saved.koko.cabinets.amount * self.saved.koko.cabinets.modifier;
					} else if (self.saved.koko.research < (self.saved.koko.cabinets.amount * self.saved.koko.cabinets.modifier)) {
						self.saved.koko.research += self.saved.koko.programs.amount;
					}
				}
				if (self.saved.meina.programs.amount > 0){ // meina
					if (self.saved.meina.research + self.saved.meina.programs.amount > self.saved.meina.cabinets.amount * self.saved.meina.cabinets.modifier) {
						self.saved.meina.research = self.saved.meina.cabinets.amount * self.saved.meina.cabinets.modifier;
					} else if (self.saved.meina.research < (self.saved.meina.cabinets.amount * self.saved.meina.cabinets.modifier)) {
						self.saved.meina.research += self.saved.meina.programs.amount;
					}
				}
				if (self.saved.sirin.programs.amount > 0){ // sirin
					if (self.saved.sirin.research + self.saved.sirin.programs.amount > self.saved.sirin.cabinets.amount * self.saved.sirin.cabinets.modifier) {
						self.saved.sirin.research = self.saved.sirin.cabinets.amount * self.saved.sirin.cabinets.modifier;
					} else if (self.saved.sirin.research < (self.saved.sirin.cabinets.amount * self.saved.sirin.cabinets.modifier)) {
						self.saved.sirin.research += self.saved.sirin.programs.amount;
					}
				}
				if (self.saved.tourik.programs.amount > 0){ // tourik
					if (self.saved.tourik.research + self.saved.tourik.programs.amount > self.saved.tourik.cabinets.amount * self.saved.tourik.cabinets.modifier) {
						self.saved.tourik.research = self.saved.tourik.cabinets.amount * self.saved.tourik.cabinets.modifier;
					} else if (self.saved.tourik.research < (self.saved.tourik.cabinets.amount * self.saved.tourik.cabinets.modifier)) {
						self.saved.tourik.research += self.saved.tourik.programs.amount;
					}
				}
            }, 1000);
			
			// ACHIEVEMENTS
			
			self.achieveDesc = "";
			self.setAchieveDesc = function(desc) {
				self.achieveDesc = desc;
			};
			
			// RESET OBJECTS

            self.resetGame = function () {
                $localStorage.$reset({
                    logoPristine: true,
					studyTableShow: false,
					newslog: "You are managing your scientists well.",
                    tutorial: {
						firstName: "tutorial",
						research: 0,
						programs: new self.Resource("programs", 0, 5, "research", "Computer programs generate research for you.", "none", 0, 1),
						papers: new self.Resource("papers", 0, 10, "research", "Publishing papers will bring you prestige and funding.", "none", 0, 2),
						money: new self.Resource("money", 5, 5, "papers", "Money can buy...stuff.", "inflation", 1, 3),
						cabinets: new self.Resource("cabinets", 5, 5, "money", "Cabinets are where you store your research.", "capacity", 100, 4)
					},
					ani: {
						firstName: "ani",
						research: 0,
						freeTime: 0,
						happinessBuff: 5,
						productivityBuff: 8,
						economyBuff: 7,
						mainColor: "#8aa2ce",
						secondColor: "#aebbd2",
						programs: new self.Resource("programs", 0, 5, "research", "Computer programs generate research for you.", "none", 0, 1),
						papers: new self.Resource("papers", 0, 10, "research", "Publishing papers will bring you prestige and funding.", "none", 0, 2),
						money: new self.Resource("money", 0, 5, "papers", "Money can buy...stuff.", "inflation", 1, 3),
						cabinets: new self.Resource("cabinets", 0, 5, "money", "Cabinets are where you store your research.", "capacity", 100, 4)
					},
					koko: {
						firstName: "koko",
						research: 0,
						freeTime: 0,
						happinessBuff: 8,
						productivityBuff: 3,
						economyBuff: 5,
						mainColor: "#ce8a8a",
						secondColor: "#d2aeae",
						programs: new self.Resource("programs", 0, 5, "research", "Computer programs generate research for you.", "none", 0, 1),
						papers: new self.Resource("papers", 0, 10, "research", "Publishing papers will bring you prestige and funding.", "none", 0, 2),
						money: new self.Resource("money", 0, 5, "papers", "Money can buy...stuff.", "inflation", 1, 3),
						cabinets: new self.Resource("cabinets", 0, 5, "money", "Cabinets are where you store your research.", "capacity", 100, 4)
					},
					meina: {
						firstName: "meina",
						research: 0,
						freeTime: 0,
						happinessBuff: 8,
						productivityBuff: 4,
						economyBuff: 2,
						mainColor: "#ce8ac7",
						secondColor: "#d2aecf",
						programs: new self.Resource("programs", 0, 5, "research", "Computer programs generate research for you.", "none", 0, 1),
						papers: new self.Resource("papers", 0, 10, "research", "Publishing papers will bring you prestige and funding.", "none", 0, 2),
						money: new self.Resource("money", 0, 5, "papers", "Money can buy...stuff.", "inflation", 1, 3),
						cabinets: new self.Resource("cabinets", 0, 5, "money", "Cabinets are where you store your research.", "capacity", 100, 4)
					},
					sirin: {
						firstName: "sirin",
						research: 0,
						freeTime: 0,
						happinessBuff: 4,
						productivityBuff: 8,
						economyBuff: 5,
						mainColor: "#94b08a",
						secondColor: "#b3d2ae",
						programs: new self.Resource("programs", 0, 5, "research", "Computer programs generate research for you.", "none", 0, 1),
						papers: new self.Resource("papers", 0, 10, "research", "Publishing papers will bring you prestige and funding.", "none", 0, 2),
						money: new self.Resource("money", 0, 5, "papers", "Money can buy...stuff.", "inflation", 1, 3),
						cabinets: new self.Resource("cabinets", 0, 5, "money", "Cabinets are where you store your research.", "capacity", 100, 4)
					},
					tourik: {
						firstName: "tourik",
						research: 0,
						freeTime: 0,
						happinessBuff: 3,
						productivityBuff: 5,
						economyBuff: 8,
						mainColor: "#83b8b9",
						secondColor: "#aecfd2",
						programs: new self.Resource("programs", 0, 5, "research", "Computer programs generate research for you.", "none", 0, 1),
						papers: new self.Resource("papers", 0, 10, "research", "Publishing papers will bring you prestige and funding.", "none", 0, 2),
						money: new self.Resource("money", 0, 5, "papers", "Money can buy...stuff.", "inflation", 1, 3),
						cabinets: new self.Resource("cabinets", 0, 5, "money", "Cabinets are where you store your research.", "capacity", 100, 4)
					},
					indivStudyEvent: new self.Event(
						true,
						"Individual Study",
						"The group is itching break off and do their own research.",
						"Every man for himself! Individual research has begun.",
						5,
						"cabinets"
					),
					programsLvl1Event: new self.Event(
						true,
						"Attend Programming Conference",
						"Programs cost halved (rounded down).",
						"The group attended a programming conference together! Programs now cost half (rounded down).",
						5,
						"money"
					)
                });
            };
        });
}());