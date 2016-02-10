
d3.json("./juice_orders",function(error, data){
	var list = d3.nest()
			   .key(function(d){return d.drinkName})
			   .sortKeys(d3.ascending)
			   .rollup(function(d){
			   	return d.reduce(function(a,b){
			   		return a+b.quantity;
			   	},0)})
			   .entries(data);

	console.log("list.......",list);	

	var scale = d3.scale.linear()
					.domain([0,7000])
					.range([0,600])


		var svgContainer = d3.select("body").append("svg")
			.attr("width",1000)
			.attr("height",600)

		var circleGroup = svgContainer.selectAll('g')
							.data(list)
							.enter()
							.append('g');

		circleGroup.append("text")
				.attr("x",0)
				.attr("y", function(d, index){return (index*15)+10})
				.style("fill","black")
				.text(function(d){return d.key;})

		circleGroup.append('line')
					.attr('x1',170)
					.attr('y1',function(d, index){ return (index*15)+10})
					.attr('x2',function(d){return scale(d.values)+170;})
					.attr('y2', function(d, index){ return (index*15)+10})
					.style("stroke","red")
					.style("stroke-width","5");

		// circleGroup.append('circle')
		// 			.attr("cx",function(d, index){return scale(d.values)})
		// 			.attr("cy", function(d,index){return (index*15)+5;})
		// 			.attr("r",5)
		// 			.style("fill","green");
									
})




