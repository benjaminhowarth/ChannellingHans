function showtrace(){
    if(selected_countries.length<2){
        console.log("generate trail for 1 called");
        generateTrail(selected_countries[0]);
    }
    else{
        generateTrail(selected_countries[0]);
        generateTrail(selected_countries[1]);
    }
    }
//    else{
//        console.log("falsie");
//        generateVis();
//    }
}

function generateTrail(country) {
    console.log("country ",country);
    function countryFilter(value) {
        return (value.Country == country);
    }
    var trail_dataset = dataset.filter(countryFilter);
    console.log(trail_dataset);
    
   var trace = canvas.selectAll()
	   .data(trail_dataset);

    console.log(trail_dataset);
   
    trace.enter()
	   .append("circle")
		.attr("cx", function(d){
        console.log("stuff");
        return xScale(+d.GDP)
	   })

	   .attr("cy", function(d){ return yScale(+d.Global_Competitiveness_Index)})

	   .attr("r", function(d){return radiusScale(+d.Population)})
		.style("fill", function(d){ 
        if(country==selected_countries[0]){
                    return "red"
            }
        else{
            return "blue"
        }
    
    }
              )
	   .style("opacity", .5)

        .on("click", function (d) {
            addCountry(d.Country);
            makeBarChart(selected_countries);
        })	   
//        .transition()
//	   .duration(1000)
	   .style("opacity", .4)
        .style("stroke", "black")
        .style("opacity", 0.8)
        .style("stroke-width", 1);
    
//    	trace.transition()
//		.duration(1000)
//		.attr("cx", function(d){ return xScale(+d.GDP)
//	   })
//		.attr("cy", function(d){ return yScale(+d.Global_Competitiveness_Index)
//	   })
//		.attr("r", function(d){ return radiusScale(+d.Population)})
//        .style("fill", function(d){ 
//            if (country==selected_countries[0])
//                return "red"
//            else
//                return "blue"
//        })
//		.style("opacity", .7)
//        .style("stroke", "black")
//        .style("stroke-width", 1);
}