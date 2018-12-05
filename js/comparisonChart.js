// Define margins
var margin = {
    top: 10,
    right: 120,
    bottom: 25,
    left: 40
};
//Chart Width and height
var outer_width = 600;
var outer_height = 500;
var svg_width = outer_width - margin.left - margin.right;
var svg_height = outer_height - margin.top - margin.bottom;
var barPadding = 26;

var compChart = d3.select("div#container2")
    .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-30 -50 1500 1500")
        .classed("svg_content", true)
    .attr("id", "secondChart")
    .attr("z-index", 10)
    .attr("margin",500);
//    .append("g")
//    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var countryNameDiv = document.getElementById("CountryDiv2");
var countryNameElement = document.getElementById("Country2");
//var year2TitleElement = document.getElementById("Year2");
countryNameElement.style.color = "blue";
countryNameElement.style.fontSize = "150px";
countryNameElement.style.opacity = ".6";
countryNameElement.style.fontFamily = "Roboto";
countryNameDiv.style.zIndex = "-10";
countryNameDiv.style.position = "absolute";
//				yearTitleDiv.style.width = "100%";
countryNameDiv.style.left = "1500px";
countryNameDiv.style.top = "150px";

function comparisonBarChart(countries) {
    var columns = [];
    var i;
    function secondCountryFilter(value){
        return (value.Country == countries[1]);
    }
//    
    var filtered_datset = dataset.filter(yearFilter);

    if(selected_countries.length>1){
        var secondDataSet = filtered_datset.filter(secondCountryFilter);
        secondDataSet.forEach(function (r) {
        columns.push({
            name: r.Country,
            values: [r['1st_pillar_Institutions'], r['2nd_pillar_Infrastructure'], r['3rd_pillar_Macroeconomic_environment'], r['4th_pillar_Health_and_primary_education'], r['5th_pillar_Higher_education_and_training'], r['6th_pillar_Goods_market_efficiency'], r['7th_pillar_Labor_market_efficiency'], r['8th_pillar_Financial_market_development'], r['9th_pillar_Technological_readiness'], r['10th_pillar_Market_size'], r['11th_pillar_Business_sophistication_'], r['12th_pillar_Innovation']]
        })
    });
    }

    //                    // Create a scale to scale values nicely for bar heights
    var yScale = d3.scaleLinear()
        .domain([7, 0])
        .range([svg_height, 0]);

    // Create a scale object to take care of positioning bars along the horizontal axis
    var xScale = d3.scaleBand()
        .domain(secondDataSet.map(function (d) {
            return d3.keys(secondDataSet[0]);
        }))
        .range([0, svg_width], 0.1)
        .paddingInner(0.05)
        .paddingOuter(0.05);

    // Create an x-axis connected to the x scale
//    var xAxis = d3.axisBottom()
//        .scale(xScale)
//        .ticks(12);
//
//    //Define Y axis
//    var yAxis = d3.axisLeft()
//        .scale(yScale)
//        .ticks(5);
//
//    // Call the x-axis
//    compChart.append("g")
//        .attr("class", "axis")
//        .attr("transform", "translate(0," + svg_height + ")")
//        .call(xAxis);
//
//    // Call the y axis
//    compChart.append("g")
//        .attr("class", "axis")
//        .call(yAxis);
//                        
    // Add rectangles
    
    console.log("comp ",columns);
    
    compChart.selectAll("rect")
        .data(columns[0].values)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return (i * (svg_width / columns[0].values.length));
        })
        .attr("y", function (d) {
            return parseInt(svg_height - yScale(d));
        })
        .attr("width", (svg_width / columns[0].values.length) - barPadding)
        .attr("height", function (d) {
            return yScale(d);
        })
        .attr("fill",function(d){
            if(columns[0].name== countries[1]){
                return "blue"
            }
            else{
                return "blue"
            }
    })
    .attr("opacity", 0.6);
    // transitions 
    compChart.selectAll("rect")
        .data(columns[0].values)
        .transition()
        .duration(500)
        .attr("x", function (d, i) {
            return i * (svg_width / columns[0].values.length)+((svg_width / columns[0].values.length) - barPadding)+8;
        })
        .attr("y", function (d) {
            return parseInt(svg_height - yScale(d));
        })
        .attr("width", (svg_width / columns[0].values.length) - barPadding)
        .attr("height", function (d) {
            return yScale(d);
        })
        .attr("fill", "blue")
        .attr("opacity", 0.6);
    
    countryNameElement.innerHTML = selected_countries[1];
        
}
function clearCompChart(){
    compChart.selectAll("rect").remove().transition(100);
}