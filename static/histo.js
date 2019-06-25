// This makes the uploading histogram

// Some margins
var margin2 = {top: 40, right: 20, bottom: 50, left: 50},
   width2 = 500 - margin2.left - margin2.right,
   height2 = 200 - margin2.top - margin2.bottom;

// Parse the date / time
var	parseDate2 = d3.isoParse;

// Select and fine tune the svg element
var svg2 = d3.select("#histo")
   .attr("width", width2 + margin2.left + margin2.right)
   .attr("height", height2 + margin2.top + margin2.bottom)
 .append("g")
   .attr("transform",
         "translate(" + margin2.left + "," + margin2.top + ")");

// Title
svg2.append("text")
   .attr("x", width2/2)
   .attr("y", 0)
   .attr("dy", "-0.5em")
   .attr("font-weight", "bold")
   .attr("text-anchor", "middle")
   .text("Avarage uploads/hour");

// x-axis label
svg2.append("text")
  .attr("x", width2/2)
  .attr("y", height2)
  .attr("dy", "2em")
  .attr("text-anchor", "middle")
  .text("hour");

// y-axis label
svg2.append("text")
   .attr("x",  -height2/2)
   .attr("y", 0)
   .attr("dy", "-1.5em")
   .attr("text-anchor", "middle")
   .attr("transform", "rotate(-90)")
   .text("uploads");


// Get data from foknet api
d3.json("http://api.foknet.nl/hourly", function(error, data3) {

  // extract useful data from api
  data2 = data3.data.histogram;

  // Get max value of the data
  let max = 0;
  for (let i = 0; i < data2.length; i++){
   if (max < data2[i].values){
     max = data2[i].values;
   }
  }

  // compare to current value
  if (max < data3.data.current.value){
    max = data3.data.current.value;
  }

  // Define the scales
  var x2 = d3.scaleLinear()
                .domain([0, 23])
                .range([0, width2]);

  var y2 = d3.scaleLinear()
                .domain([0, max])
                .range([height2, 0]);

  // Configure axis
  var xAxis2 = d3.axisBottom()
     .scale(x2)
     .ticks(23);

  var yAxis2 = d3.axisLeft()
     .scale(y2)
     .ticks(5);

  // Append axis
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

  // Make bars of avarage data
  svg2.selectAll("bar")
     .data(data2)
   .enter().append("rect")
     .style("fill", "steelblue")
     .attr("x", function(d) { return x2(d.hours); })
     .attr("width", width2/30)
     .attr("y", function(d) { return y2(d.values); })
     .attr("height", function(d) { return height2 - y2(d.values); });

  // Make the bar of the current data/ live data
  svg2.append("rect")
      .style("fill", "red")
      .attr("x", x2(data3.data.current.hour))
      .attr("width", width2/30)
      .attr("y", y2(data3.data.current.value))
      .attr("height", height2 - y2(data3.data.current.value))
      .style("opacity", 0.5);

  // Add the NOW text to the bar
  svg2.append("text")
    .attr("x", x2(data3.data.current.hour))
    .attr("y", y2(data3.data.current.value))
    .attr("dy", "1.5em")
    .attr("dx",  (width2/30)*0.5)
    .attr("text-anchor", "middle")
    .style("font-size", "8px")
    .text("now")
    .style("fill", 'white');
});
