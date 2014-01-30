function simpleBarChart () {

// Set size and margins
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 485 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Set width of bars and spacing between bars
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .5);

var y = d3.scale.linear()
    .range([height, 0]);

// Configure the x axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// Configure the y axis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

var svg = d3.select(".svg-holder-simple").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Load in data and map values
d3.tsv("bar-charts-example-simple-data.tsv", type, function(error, data) {

    // Sort the data by population
  data.sort(function(a, b) { return a.population - b.population; });

  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.population; })]);

  svg.append("g")
	  // Draw the x axis
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
  	// Draw the y axis
      .attr("class", "y axis")
      .call(yAxis)
    // Draw the y axis title 
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .attr("class", "label")
      .style("text-anchor", "end")
      .text("Population");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.population); })
      .attr("height", function(d) { return height - y(d.population); });


});


function type(d) {
  d.population = +d.population;
  return d;
}

}

simpleBarChart();