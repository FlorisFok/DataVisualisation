
var margin2 = {top: 20, right: 20, bottom: 50, left: 50},
   width2 = 500 - margin2.left - margin2.right,
   height2 = 200 - margin2.top - margin2.bottom;

// Parse the date / time
var	parseDate2 = d3.isoParse

var x2 = d3.scaleBand().rangeRound([0, width2], .05).padding(0.1);

var y2 = d3.scaleLinear().range([height2, 0]);

var xAxis2 = d3.axisBottom()
   .scale(x2)
   .tickFormat(d3.timeFormat("%Y-%m-%d"));

var yAxis2 = d3.axisLeft()
   .scale(y2)
   .ticks(10);

var svg2 = d3.select("#histo")
   .attr("width", width2 + margin2.left + margin2.right)
   .attr("height", height2 + margin2.top + margin2.bottom)
 .append("g")
   .attr("transform",
         "translate(" + margin2.left + "," + margin2.top + ")");

d3.csv("/data/bar-data.csv", function(error, data2) {

   data2.forEach(function(d) {
       d.date = parseDate2(d.date);
       d.value = +d.value;
   });

 x2.domain(data2.map(function(d) { return d.date; }));
 y2.domain([0, d3.max(data2, function(d) { return d.value; })]);

 svg2.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0," + height2 + ")")
     .call(xAxis2)
   .selectAll("text")
     .style("text-anchor", "end")
     .attr("dx", "-.8em")
     .attr("dy", "-.55em")
     .attr("transform", "rotate(-90)" );

 svg2.append("g")
     .attr("class", "y axis")
     .call(yAxis2)
   .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("dy", ".71em")
     .style("text-anchor", "end")
     .text("Value");

 svg2.selectAll("bar")
     .data(data2)
   .enter().append("rect")
     .style("fill", "steelblue")
     .attr("x", function(d) { return x2(d.date); })
     .attr("width", x2.bandwidth())
     .attr("y", function(d) { return y2(d.value); })
     .attr("height", function(d) { return height2 - y2(d.value); });

});
