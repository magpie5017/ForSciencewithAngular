// D3 Directive

(function() {
  angular.module('app.directives')
			.directive('d3Lines',['d3', function(d3) {
			   return {
				   restrict : 'EA',
				   replace: false,
				   scope: false,
				   link: function (scope, element, attrs) {
					   var setChar = attrs.char;
					   var setDiv = "#" + attrs.char + "chartwrapper";
					   var setColor = scope["gameCtrl"]["saved"][setChar]["mainColor"];
					   var setHover = scope["gameCtrl"]["saved"][setChar]["secondColor"];						

						var width = 80,
							height = 80,
							radius = Math.min(width, height) / 2,
							innerRadius = 0.2 * radius;
							
						var charData = [
							{name: "Happiness", amount: scope["gameCtrl"]["saved"][setChar]["happinessBuff"]},
							{name: "Productivity", amount: scope["gameCtrl"]["saved"][setChar]["productivityBuff"]},
							{name: "Economy", amount: scope["gameCtrl"]["saved"][setChar]["economyBuff"]}
						];
						
						var pie = d3.layout.pie()
							.value(function(d) { return d.amount; })
							.sort(null);
						
						var arc = d3.svg.arc()
						  .innerRadius(innerRadius)
						  .outerRadius(function (d) { 
							return (radius - innerRadius) * (d.data.amount / 10.0) + innerRadius; 
						  });
						
						var outlineArc = d3.svg.arc()
							.innerRadius(innerRadius)
							.outerRadius(radius);
						
						var svg = d3.select(setDiv).append("svg")
							.attr("width", width)
							.attr("height", height)
							.append("g")
							.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
							
						var tooltip = d3.select("body")
							.append("div")
							.classed("tooltips", true)
							.style("position", "absolute")
							.style("z-index", "10")
							.style("display", "none")
							.style("font-family", "Helvetica Neue")
							.style("font-size", "12px")
							.style("text-align", "center")
							.html("tooltip");
						
						  var path = svg.selectAll(".solidArc")
							  .data(pie(charData))
							  .enter()
							  .append("path")
							  .attr("fill", setColor)
							  .attr("class", "solidArc")
							  .attr("stroke", "none")
							  .on("mouseover", function(d) {
								d3.select(this)
									.transition()
									.ease("quad")
									.duration("200")
									.style("fill", setHover);
								tooltip.html(d.data.name + "<br />" + d.data.amount);
								return tooltip.style("display", "block")
							  })                  
							  .on("mouseout", function(d) {
								d3.select(this)
									.transition()
									.ease("quad")
									.duration("200")
									.style("fill", setColor);
								return tooltip.style("display", "none");
							  })
							  .on("mousemove", function(){
								  return tooltip.style("top",(d3.event.pageY-10)+"px")
								  .style("left",(d3.event.pageX+10)+"px");
							  })
							  .attr("d", arc);
						
						  var outerPath = svg.selectAll(".outlineArc")
							  .data(pie(charData))
							  .enter()
							  .append("path")
							  .attr("fill", "none")
							  .attr("stroke", "#c6c6c6")
							  .attr("class", "outlineArc")
							  .attr("d", outlineArc);  
  
						
						
				   } // end link

				}; // end directive initial return
	   			  
		} ]); // end directive

}());