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
            } 
            generateVis();
        
            makeBarChart(selected_countries);
            showtrace();
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

function hue(h) {
    console.log("inhue h");
	display_year = Math.floor(x.invert(currentValue));
	if (display_year != old_display_year){
        console.log("");
		generateVis();
        console.log("calling");
        makeBarChart(selected_countries);
        console.log("called");
        showtrace();
	}
	old_display_year = display_year;
}