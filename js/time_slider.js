//https://bl.ocks.org/officeofjane/47d2b0bfeecfcb41d2212d06d095c763

//$.getScript('./d3/d3.v4.js', function() {
//    //script is loaded and executed put your dependent JS here



// New Categorical Slider


year_list = [2007,2008,2009,2010, 2011, 2012, 2013, 2014, 2015, 2016,2017]
//counter = 0;
function initialize_slider() {
	
// *?Some code from https://github.com/OopsRyan/channelling-hans
    slider_div = d3.select("#slider_div")
	
    slider_div.append("span")
        .attr("id", "min_year")
        .style("height", "30px")
        .style("width", "10%")
        .html(min_year)
	
    slider_div.append("input")
        .attr("type", "range")
        .attr("min", min_year)
        .attr("max", max_year)
        .attr("value", min_year)
        .attr("step", 1)
        .attr("id", "year_slider2")
        .style("width", "70%")
        .style("height", "16px")
        .on("input", function() {

            current_value = d3.select(this).property("value") -1;
            if (!year_list.includes("" + current_value)) {
                var years_more_than_this = year_list.filter(function(year) {
                    return current_value < +year;
                })
                display_year = years_more_than_this[0];
				console.log("display_year: ", display_year);
            } 
//			else {
//                // current_value must be in the range of slider, so no need to worry about being greater than max_year
//                display_year = current_value;
//				console.log("else display_year: ", display_year);
//            }
            generateVis();
        });
	
	var x = d3.scaleLinear()
    .domain([2007, 2017])
    .range([0, svg_width])
    .clamp(true);
	
    slider_div.append("span")
        .attr("id", "max_year")
        .style("height", "30px")
        .style("width", "10%")
        .html(max_year);
	console.log("display_year: ", display_year);

}





<<<<<<< HEAD




























//var svg = d3.select("svg"),
//    margin = {right: 50, left: 50},
//    width = +svg.attr("width") - margin.left - margin.right,
//    height = +svg.attr("height")*1.95;
//
//var x = d3.scaleLinear()
//    .domain([2007, 2017])
//    .range([0, width])
//    .clamp(true);
//
//var slider = svg.append("g")
//    .attr("class", "slider")
//    .attr("transform", "translate(" + margin.left + "," + (height/2) + ")");
//
//slider.append("line")
//    .attr("class", "track")
//    .attr("x1", x.range()[0])
//    .attr("x2", x.range()[1])
//  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
//    .attr("class", "track-inset")
//  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
//    .attr("class", "track-overlay")
//    .call(d3.drag()
//        .on("start.interrupt", function() { slider.interrupt(); })
//        .on("start drag", function() { currentValue = d3.event.x; hue(x.invert(d3.event.x)); }));
//
//slider.insert("g", ".track-overlay")
//    .attr("class", "ticks")
//    .attr("transform", "translate(0," + 18 + ")")
//  .selectAll("text")
//  .data(x.ticks(10))
//  .enter().append("text")
//    .attr("x", x)
//    .attr("text-anchor", "middle")
//    .text(function(d) {
////	current_year = d; 
//	return d; });
//
//var handle = slider.insert("circle", ".track-overlay")
//    .attr("class", "handle")
//    .attr("r", 9);
//
////slider.transition() // Gratuitous intro!
////    .duration(750)
////    .tween("hue", function() {
////      var i = d3.interpolate(0, 70);
////      return function(t) { hue(i(t)); };
////    });
//
//var playButton = d3.select("#play-button");
//
//var moving = false;
//var timer=0;
//var currentValue = 0;
//var targetValue = width;
//var dataset = 0;
//var old_display_year = 0;
//
////Important
//var plot = svg.append("g")
//    .attr("class", "plot")
//    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//
//function step() {
//  update(x.invert(currentValue));
//  currentValue = currentValue + (targetValue/151);
////	console.log("currentvalueStep", x.invert(currentValue))
//  if (currentValue > targetValue) {
//    moving = false;
//    currentValue = 0;
//    clearInterval(timer);
//     timer = 0;
//    playButton.text("Play");
//    console.log("Slider moving: " + moving);
//  }
//}
//
////sometimes this isnt drawn.
//function drawPlot(data) {
//	
//	// eslint-disable-next-line
//  var locations = plot.selectAll(".location")
//    .data(data);
//
//  // if filtered dataset has more circles than already existing, transition new ones in
//  locations.enter()
//    .append("circle")
//    .attr("class", "location")
//    .attr("cx", function(d) { return x(d.date); })
//    .attr("cy", height/2)
//    .style("fill", function(d) { return d3.hsl(d.date/1000000000, 0.8, 0.8)})
//    .style("stroke", function(d) { return d3.hsl(d.date/1000000000, 0.7, 0.7)})
//    .style("opacity", 0.5)
//    .attr("r", 8)
//      .transition()
//      .duration(400)
//      .attr("r", 25)
//        .transition()
//        .attr("r", 8);
//
//  // if filtered dataset has less circles than already existing, remove excess
//  locations.exit()
//    .remove();
//}
//
//
//function update(h) {
//  // update position of slider handle according to slider scale (x)
//  handle.attr("cx", x(h));
//
//	//Should call the generate vis function here
//	hue(x.invert(currentValue));
//	
////  label
////    .attr("x", x(h))
////    .text(formatDate(h));
//
//  // filter data set and redraw plot
//  var newData = dataset.filter(function(d) {
//    return d.date < h;
//  })
//   drawPlot(newData);
//  }
//
//playButton
//    .on("click", function() {
//    var button = d3.select(this);
//    if (button.text() == "Pause") {
//      moving = false;
//      clearInterval(timer);
//      // timer = 0;
//      button.text("Play");
//    } else {
//      moving = true;
//      timer = setInterval(step, 100);
//      button.text("Pause");
//    }
//	  
//	 // eslint-disable-next-line
//    console.log("Slider moving: " + moving);
//  })
//
//function hue(h) {
	display_year = Math.floor(x.invert(currentValue));
	if (display_year != old_display_year){
		generateVis();
        makeBarChart(selected_countries);
	}
	old_display_year = display_year;
}
>>>>>>> 07eb94f268b3e9efc526a82eb7d3ea291fe88f17
	
