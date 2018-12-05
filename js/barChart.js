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
var barPadding = 20;

var chart = d3.select("div#container2")
    .append("svg")
//    .attr("width", svg_width + margin.left + margin.right)
//    .attr("height", svg_height + margin.top + margin.bottom)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-30 -50 1500 1500")
    .classed("svg_content", true)
    .attr("id", "firstChart");
//    .append("g")
//    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var countryNameDiv1 = document.getElementById("CountryDiv1");
var countryNameElement1 = document.getElementById("Country1");
//var year2TitleElement = document.getElementById("Year2");
countryNameElement1.style.color = "red";
countryNameElement1.style.fontSize = "150px";
countryNameElement1.style.opacity = ".6";
countryNameElement1.style.fontFamily = "Roboto";
countryNameDiv1.style.zIndex = "-10";
countryNameDiv1.style.position = "absolute";
//				yearTitleDiv.style.width = "100%";
countryNameDiv1.style.left = "1500px";
countryNameDiv1.style.top = "700px";
function barChart(countries) {
    
    var columns = [];

    function countryFilter(value) {
        return (value.Country == countries[0]);
    }

    var filtered_datset = dataset.filter(yearFilter);
    var chart_dataset = filtered_datset.filter(countryFilter);
    chart_dataset.forEach(function (r) {
        columns.push({
            name: r.Country,
            values: [r['1st_pillar_Institutions'], r['2nd_pillar_Infrastructure'], r['3rd_pillar_Macroeconomic_environment'], r['4th_pillar_Health_and_primary_education'], r['5th_pillar_Higher_education_and_training'], r['6th_pillar_Goods_market_efficiency'], r['7th_pillar_Labor_market_efficiency'], r['8th_pillar_Financial_market_development'], r['9th_pillar_Technological_readiness'], r['10th_pillar_Market_size'], r['11th_pillar_Business_sophistication_'], r['12th_pillar_Innovation']]
        })
    });



    //                    // Create a scale to scale values nicely for bar heights
    var yScale = d3.scaleLinear()
        .domain([7,0])
        .range([svg_height, 0]);
    

    // Create a scale object to take care of positioning bars along the horizontal axis
    var xScale = d3.scaleBand()
        .domain([1,2,3,4,5,6,7,8,9,10,11,12])
        .range([0,svg_width])
        .paddingInner(0.05)
        .paddingOuter(0.05);
        
    // Create an x-axis connected to the x scale
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(12)
        .tickFormat(function (d) {
      var mapper = {
          1: "Institutions",
          2: "Infrastructure",
          3: "Macroeconomic_environment",
          4: "Health_and_primary_education",
          5: "Higher_education_and_training",
          6: "Goods_market_efficiency",
          7: "Labor_market_efficiency",
          8: "Financial_market_development",
          9: "Technological_readiness", 
          10: "Market_size",
          11: "Business_sophistication",
          12: "Innovation"
      }
      return mapper[d]
    });

    //Define Y axis
    var yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(15)
        .tickFormat(function (d) {
  var mapper = {
    0: 5,
      1: 4,
      2: 3,
      3: 2,
      4: 1,
      5:0
  }
  return mapper[d]
});

    // Call the x-axis
    chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + svg_height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dy","-.05em")
        .style("text-anchor", "end")
        .attr("dx", "-.7em")
        .attr("transform", "rotate(-45)");

    // Call the y axis
    chart.append("g")
        .attr("class", "axis")
        .call(yAxis);
                        
    // Add rectangles

    chart.selectAll("rect")
        .data(columns[0].values)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            console.log(d);
            return i * (svg_width / columns[0].values.length);
        })
        .attr("y", function (d) {
            return parseInt(svg_height - yScale(d));
        })
        .attr("width", (svg_width / columns[0].values.length) - barPadding)
        .attr("height", function (d) {
            return yScale(d);
        })
        .attr("fill", "red")
    .attr("opacity", 0.6);
    // transitions 
    chart.selectAll("rect")
        .data(columns[0].values)
        .transition()
        .duration(500)
        .attr("x", function (d, i) {
            return i * (svg_width / columns[0].values.length)+8;
        })
        .attr("y", function (d) {
            return parseInt(svg_height - yScale(d));
        })
        .attr("width", (svg_width / columns[0].values.length) - barPadding)
        .attr("height", function (d) {
            return yScale(d);
        })
        .attr("fill", "red")
    .attr("opacity", 0.6);
    
        countryNameElement1.innerHTML = selected_countries[0];
}