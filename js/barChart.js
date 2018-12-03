// Define margins
var margin = {
    top: 10,
    right: 120,
    bottom: 25,
    left: 40
};
//Chart Width and height
var outer_width = 1200;
var outer_height = 550;
var svg_width = outer_width - margin.left - margin.right;
var svg_height = outer_height - margin.top - margin.bottom;
var barPadding = 20;

var chart = d3.select("body")
    .append("svg")
    .attr("width", svg_width + margin.left + margin.right)
    .attr("height", svg_height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
function barChart(...countries) {
    
    var columns = [];

    function countryFilter(value) {
        return (value.Country == countries);
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
        .domain([5, 0])
        .range([svg_height, 0]);

    // Create a scale object to take care of positioning bars along the horizontal axis
    var xScale = d3.scaleBand()
        .domain(chart_dataset.map(function (d) {
            return d.Company;
        }))
        .range([0, svg_width], 0.1)
        .paddingInner(0.05)
        .paddingOuter(0.05);

    // Create an x-axis connected to the x scale
    var xAxis = d3.axisBottom()
        .scale(xScale);

    //Define Y axis
    var yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(5);

    // Call the x-axis
    chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + svg_height + ")")
        .call(xAxis);

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
            return i * (svg_width / columns[0].values.length);
        })
        .attr("y", function (d) {
            return parseInt(svg_height - yScale(d));
        })
        .attr("width", (svg_width / columns[0].values.length) - barPadding)
        .attr("height", function (d) {
            return yScale(d);
        })
        .attr("fill", "blue");

}