


function showtrace(){
    
        if(selected_countries.length==1){
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


function generateTrail(country) {
    
    console.log("generateTrail");
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
        .attr("class", "traceCircles")
		.attr("cx", function(d){
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
	   .style("opacity", .2)
        .style("stroke", "black")
        .style("stroke-width", 3);

}
function removeTrail(){
    canvas.selectAll(".traceCircles").remove();
}
//var isChecked=false;
function traceButtonChange(){
    if(document.getElementById("traces").checked){
        removeTrail();
        showtrace();
    }
     if(!document.getElementById("traces").checked){
         removeTrail();
     }
}