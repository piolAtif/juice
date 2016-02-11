d3.json("./juice_orders",function(error, data){
	var list = d3.nest()
			   .key(function(d){return d.drinkName})
			   .rollup(function(d){
			   	return d.reduce(function(a,b){
			   		return a+b.quantity;
			   	},0)})
			   .entries(data);


	_.remove(list, function(d){
		return (d.key == 'CTL' || d.key == 'ctl') || d.key == 'Register User';
	})

	list= _.sortBy(list, 'values').reverse();

	var scale = d3.scale.linear()
					.domain([0,7000])
					.range([0, 600])


	var svgContainer = d3.select("body").append("svg")
			.attr("width",1000)
			.attr("height",800)

		var circleGroup = svgContainer.selectAll('g')
							.data(list)
							.enter()
							.append('g')
							.attr('transform', "translate("+20+","+700+") rotate(-90)")

		circleGroup.append("text")
				.attr("x", 0)
				.attr("y", function(d, index){return (index*15)+100})
				.style("fill","black")
				.text(function(d){return d.key;})

		circleGroup.append('line')
					.attr('x1',200)
					.attr('y1',function(d, index){ return (index*15)+100})
					.attr('x2',function(d){ return scale(d.values)+200})
					.attr('y2', function(d, index){return (index*15)+100})
					.style("stroke","red")
					.style("stroke-width","13");
									
})





