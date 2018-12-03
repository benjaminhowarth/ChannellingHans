
// Defining margins, width and height
var margin = {top: 100, right: 100, bottom: 100, left: 100};
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
yearTitleElement.style.fontSize = "200px";
yearTitleElement.style.opacity = ".6";
yearTitleElement.style.fontFamily = "Roboto";
yearTitleDiv.style.zIndex = "-10";
yearTitleDiv.style.position = "absolute";
//				yearTitleDiv.style.width = "100%";
yearTitleDiv.style.left = "350px";
yearTitleDiv.style.top = "300px";


var selected_country;
var selected_countries = [];


//_-_-_C-_-_-A_-_-_N-_-_-V_-_-_A-_-_-S_-_-_
//SOME CODE TAKEN FROM PRACTICAL 5 SOLUTION

// Create svg canvas
var canvas = d3.select("body")
		.append("svg")
		.attr("width", svg_width + margin.left + margin.right)
		.attr("height", svg_height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Creating y scale
// We don't set the domain yet as data isn't loaded
var yScale = d3.scaleLinear()
// svg_height,0 or 0,svg_height
				.range([svg_height, 0]);

// Creating x scale
// We don't set the domain yet as data isn't loaded
// *N WHAT DOES 0.1 DO HERE
var xScale = d3.scaleLog()
				.range([1, svg_width]);

// Creating color scale
var colourScale = d3.scaleOrdinal(d3.schemeCategory10);

// Creating a scale for the radius of each circle
// *N WHY DOES 5E8 WORK? TAKEN FROM http://bl.ocks.org/avimoondra/aca16f9aa134cd664c0e
var radiusScale = d3.scaleSqrt()
	.domain([0, 5e8])
	.range([0, 50]);


//Define Y axis
var yAxis = d3.axisLeft()
				  .scale(yScale)
				  .ticks(10);

// Create an x-axis connected to the x scale
var xAxis = d3.axisBottom()
			 .scale(xScale)
			 .ticks(5);

//		 Set format for x-axis ticks 
		xAxis.tickFormat(d3.format(".0s"));
		
	// Call the y axis
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
		.attr("x", svg_width)
		.attr("y", svg_height);


//-_-_-M_-_-_A-_-_-I_-_-_N-_-_-
//   VISUALISATION FUNCTION
var drag = d3.drag();
function generateVis(){

	// Filter the data to only include the current year
	var filtered_dataset = dataset.filter(yearFilter);

	/******** PERFORM DATA JOIN ************/
	// Join new data with old elements, if any.
	var circles = canvas.selectAll("circle")
	   .data(filtered_dataset);
    
	var texts = canvas.selectAll(".countrylabel")
			.data(filtered_dataset, function key(d){return d.Country});

	/******** HANDLE ENTER SELECTION ************/
	// Create new elements in the dataset

	// *N Check for problem here
	circles.enter()
	   .append("circle")
		.attr("cx", function(d){
        console.log("stuff");
        return xScale(+d.GDP)
	   })

	   .attr("cy", function(d){ return yScale(+d.Global_Competitiveness_Index)})

	   .attr("r", function(d){return radiusScale(+d.Population)})
		.style("fill", function(d){ return colourScale(d.Region)})
	   .style("opacity", .7)

        .on("click", function (d) {
            barChart(d.Country);
            console.log(d.Country);
        })	   
        .transition()
	   .duration(1000);

	texts.enter()
		.append("text")
		.attr("x", function(d){return xScale(+d.GDP)})
		.attr("y", function(d){return yScale(+d.Global_Competitiveness_Index)})
		.attr("fill", "black")
		.attr("class", "countrylabel")
		.attr("font-size", function(d){return radiusScale(+d.Population)})
		.text(function(d){return d.Country})

	/******** HANDLE UPDATE SELECTION ************/
	// Update the display of existing elements to match new data
	circles.transition()
		.duration(1000)
		.attr("cx", function(d){ return xScale(+d.GDP)
	   })
		.attr("cy", function(d){ return yScale(+d.Global_Competitiveness_Index)
	   })
		.attr("r", function(d){ return radiusScale(+d.Population)}).style("fill", function(d){ return colourScale(d.Region)})
		.style("opacity", .7)
		.transition()
		.duration(1000);


	texts.transition()
		.duration(1000)
		.attr("x", function(d){return xScale(+d.GDP)})
		.attr("y", function(d){return yScale(+d.Global_Competitiveness_Index)});


	/******** HANDLE EXIT SELECTION ************/

	circles.exit()
		.transition()
		.duration(200)
		.ease(d3.easeBounce)
		.attr("r", 0)
		.remove();


	texts.exit()
	.remove();
//
	// Set the year label
	d3.select("#year_header").text("Year: " + display_year)

	setInterval(function(){
	yearTitleElement.innerHTML = display_year; 800;
	}, 200)
	console.log(display_year);
	console.log(yearTitleElement);
}

//-_-_-E_-_-_N-_-_-D_-_-_
// END OF MAIN FUNCTION



		d3.csv("./data/GCI_CompleteData4.csv")
		  .then(function(data) {
		      	  dataset = data;

		xScale.domain([1, d3.max(dataset, function(d){	return +d.GDP})])
		yScale.domain([1, d3.max(dataset, function(d){ return +d.Global_Competitiveness_Index})])

		// Finding smallest non-zero number for minimum year
		min_year = d3.min(dataset.map(function(d){ return +d.Year || Infinity}));
		max_year = d3.max(dataset.map(function(d){ return +d.Year}));
		console.log("min_year/max_year:", min_year, max_year);
		display_year = min_year
		
		// Calling main visualisation function
		generateVis();
		
		
		// Notes:
			//start and stop make smoother.
			// Transition shoot up change. 
			//Don't exit. Or interpolate?
			//Don't let the marker miss anything cool
			//Design decisions included. 
			// y linear scale
			// x log scale
});

