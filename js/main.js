
// Defining margins, width and height
var margin = {top: 100, right: 160, bottom: 100, left: 100};
var outer_width = 1000;
var outer_height = 1000;
var svg_width = outer_width - margin.left - margin.right;
var svg_height = outer_height - margin.top - margin.bottom;

// Initialising display_year so I can define yearFilter
display_year = null;
// Defining a function that filters data by year (code taken from solution to 5th practical)
function yearFilter(value){
	return (value.Year == display_year)
}
var yearTitleDiv = document.getElementById("YearDiv");
var yearTitleElement = document.getElementById("Year");
var year2TitleElement = document.getElementById("Year2");
yearTitleElement.style.color = "grey";
//yearTitleElement.style.fontSize = "8vw";
yearTitleElement.style.fontSize = "calc(12px + 5vw)";

yearTitleElement.style.opacity = ".6";
yearTitleElement.style.fontFamily = "Roboto";
yearTitleDiv.style.zIndex = "-10";
yearTitleDiv.style.position = "absolute";
//				yearTitleDiv.style.width = "100%";
yearTitleDiv.style.left = "15%";
yearTitleDiv.style.top = "14%";
//yearTitle.Div.style.


var selected_country;
var selected_countries = [];

// function to implement queue for counties
function addCountry(country){
    if (selected_countries.length<1){
        
        selected_countries.push(country);
    }
    else if (selected_countries.length == 1 && country !=selected_countries[0] ){
       
        selected_countries.push(country);
        
    }
    else if(selected_countries.length==2){
        if (country == selected_countries[0]){
            selected_countries.pop();
        }
        else if (country == selected_countries[1]){
            selected_countries.shift();
        }

        else{
           
            selected_countries.pop();
            selected_countries.unshift(country);
        }
    }
    
}
function makeBarChart(selected_countries){
    if(selected_countries.length==0){
        
    }
    else if (selected_countries.length==1){
        barChart(selected_countries);
        clearCompChart();
        document.getElementById("Country2").innerHTML="";
    }
    else{
        barChart(selected_countries);
        comparisonBarChart(selected_countries);
    }
}

//_-_-_C-_-_-A_-_-_N-_-_-V_-_-_A-_-_-S_-_-_
//SOME CODE TAKEN FROM PRACTICAL 5 SOLUTION

// Create svg canvas
var canvas = d3.select("div#container")
        .append("svg")
//		.attr("width", svg_width + margin.left + margin.right)
//		.attr("height", svg_height + margin.top + margin.bottom)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-30 -50 1100 1100")
        .classed("svg_content", true);
//		.append("g")
//		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Creating y scale
// We don't set the domain yet as data isn't loaded
var yScale = d3.scaleLinear()
// svg_height,0 or 0,svg_height
				.range([svg_height, 0]);

// Creating x scale
// We don't set the domain yet as data isn't loaded
// *N WHAT DOES 0.1 DO HERE
var xScale = d3.scaleLog()
				.range([0.1, svg_width]);



// Creating color scale
var colourScale = d3.scaleOrdinal(d3.schemeCategory10);

// Creating a scale for the radius of each circle
// *N WHY DOES 5E8 WORK? TAKEN FROM http://bl.ocks.org/avimoondra/aca16f9aa134cd664c0e
var radiusScale = d3.scaleSqrt()
	.domain([0, 5e8])
	.range([0, 50]);
var textScale = d3.scaleSqrt()
	.domain([0, 5e8])
	.range([10, 40]);


		
	// Call the y axis
	

//-_-_-M_-_-_A-_-_-I_-_-_N-_-_-
//   VISUALISATION FUNCTION
var drag = d3.drag();

function generateVis(){

	// Filter the data to only include the current year
	var filtered_dataset = dataset.filter(yearFilter);

	/******** PERFORM DATA JOIN ************/
	// Join new data with old elements, if any.
	var circles = canvas.selectAll(".updateCircle")
	   .data(filtered_dataset);
    
	var texts = canvas.selectAll(".countrylabel")
			.data(filtered_dataset, function key(d){return d.Country});

	/******** HANDLE ENTER SELECTION ************/
	// Create new elements in the dataset

	// *N Check for problem here
	circles.enter()
	   .append("circle")
        .attr("class", function(d){
        return "updateCircle";
    })
		.attr("cx", function(d){
        return xScale(+d.GDP)
	   })

	   .attr("cy", function(d){ return yScale(+d.Global_Competitiveness_Index)})

	   .attr("r", function(d){return radiusScale(+d.Population)})
		.style("fill", function(d){ return colourScale(d.Region)})
	   .style("opacity", .7)
        .on("mouseover", function (d) {
            d3.select(this)
                .transition()
                .duration(500)
                .style("opacity", 1);
        })
         .on("mouseout", function (d) {
            d3.select(this)
                .transition()
                .duration(500)
                .style("opacity", 0.7);
        })
        .on("click", function (d) {
            addCountry(d.Country);
            traceButtonChange();
            makeBarChart(selected_countries);
        })	   
        .transition()
	   .duration(1000);

	texts.enter()
		.append("text")
		.attr("x", function(d){return xScale(+d.GDP)})
		.attr("y", function(d){return yScale(+d.Global_Competitiveness_Index)})
		.attr("fill", "black")
		.attr("class", "countrylabel")
		.attr("font-size", function(d){return textScale(+d.Population)})
         .on("click", function (d) {
            addCountry(d.Country);
            makeBarChart(selected_countries);
        })
		.text(function(d){return d.Country})

	/******** HANDLE UPDATE SELECTION ************/
	// Update the display of existing elements to match new data
	circles.transition()
		.attr("cx", function(d){ return xScale(+d.GDP)
	   })
		.attr("cy", function(d){ return yScale(+d.Global_Competitiveness_Index)
	   })
		.attr("r", function(d){ return radiusScale(+d.Population)}).style("fill", function(d){ return colourScale(d.Region)})
		.style("opacity", .7)
		.transition()
		.duration(1000);
//        .call(makeBarChart(selected_countries));


	texts
		.attr("x", function(d){
        return xScale(+d.GDP)})
		.attr("y", function(d){return yScale(+d.Global_Competitiveness_Index)})
    .transition()
		.duration(1000);
    

	/******** HANDLE EXIT SELECTION ************/

	circles.exit()
		.transition()
		.duration(200)
		.ease(d3.easeBounce)
		.attr("r", 0)
		.remove();


	texts.exit()
	.remove();
    makeBarChart(selected_countries);
	// Set the year label
	d3.select("#year_header").text("Year: " + display_year)

	setInterval(function(){
	yearTitleElement.innerHTML = display_year; 800;
	}, 200)
	
}

//-_-_-E_-_-_N-_-_-D_-_-_
// END OF MAIN FUNCTION



		d3.csv("./data/GCI_CompleteData4_interpolated.csv")
		  .then(function(data) {
		      	  dataset = data;

		xScale.domain([d3.min(dataset, function(d) {return parseInt(d.GDP);}), d3.max(dataset, function(d) {return parseInt(d.GDP);})]);
            
		yScale.domain([d3.min(dataset, function(d) {return parseFloat(d.Global_Competitiveness_Index);}), d3.max(dataset, function(d) {return parseFloat(d.Global_Competitiveness_Index);})]);
        var radiusScale = d3.scaleLinear()
								 .domain([d3.min(dataset, function(d) {return parseFloat(d.Population);}), d3.max(dataset, function(d) {return parseFloat(d.Population);})])
								 .range([10, 40]);
        var margin = {top: 100, right: 100, bottom: 100, left: 100};
        var outer_width = 1000;
        var outer_height = 1000;
        var svg_width = outer_width - margin.left - margin.right;
        var svg_height = outer_height - margin.top - margin.bottom;
//Define Y axis
var yAxis = d3.axisLeft()
				  .scale(yScale)
				  .ticks(10);

// Create an x-axis connected to the x scale
var xAxis = d3.axisBottom()
			 .scale(xScale)
			 .ticks(3);

//		 Set format for x-axis ticks 
		xAxis.tickFormat(d3.format(".0s"));
//        xAxis.tickFormat(function(d) {
//                  return d.GDP;
//              })
        canvas.append("g")
		.attr("class", "axis")
		.attr("id", "y-axis")
		.call(yAxis);
	// Call the x axis
	canvas.append("g")
		.attr("class", "axis")
		.attr("id", "x-axis")
		.attr("transform", "translate(0," + svg_height + ")")
		.call(xAxis);
            
	// Add axis labels
	canvas.append("text")
		.attr("class", "axis")
		.attr("x", svg_width/4)
		.attr("y", svg_height+50)
        .text("Gross Domestic Product")
            .style("font-size", "2vw");
            
    canvas.append("text")
		.attr("class", "axis")
		.attr("x", -svg_height/1.5)
		.attr("y", 30)
        .text("Global Competitiveness Index")
           .style("font-size", "2vw")
            .attr("transform", "rotate(-90)");
    
            
//            .append("text")
//          .attr("x", function(d) { return x(d) - 3; })
//          .attr("y", barHeight / 2)
//          .attr("dy", ".35em")
//          .text(function(d, i) { return label[i]; });
		// Finding smallest non-zero number for minimum year
		min_year = d3.min(dataset.map(function(d){ return +d.Year || Infinity}));
		max_year = d3.max(dataset.map(function(d){ return +d.Year}));
		display_year = min_year
		
		// Calling main visualisation function
//			initialize_axis();
			generateVis();
			initialize_slider();
            makeBarChart(selected_countries);
		    if(document.getElementById("traces").checked){
                showtrace();
            }
		
		
		
		// Notes:
			//start and stop make smoother.
			// Transition shoot up change. 
			//Don't exit. Or interpolate?
			//Don't let the marker miss anything cool
			//Design decisions included. 
			// y linear scale
			// x log scale
});

//    var xScale = d3.scaleLog()
//                 .domain([d3.min(dataset, function(d) {return parseInt(d.GDP);}), d3.max(dataset, function(d) {return parseInt(d.GDP);})])
//                 .range([0.1, svg_width]);
//
//    var yScale = d3.scaleLinear()
//                 .domain([d3.max(dataset, function(d) {return parseFloat(d.Global_Competitiveness_Index);}), d3.min(dataset, function(d) {return parseFloat(d.Global_Competitiveness_Index);})])
//                 .range([0, svg_height]);