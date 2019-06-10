
var margin = {top: 40, right: 40, bottom: 40, left: 40};

var svg = d3.select("#map"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Should really change this to 'clipExtent' instead of center
var projection = d3.geoAlbers()
  .center([4.9, 52.366667])
  .parallels([51.5, 51.49])
  .rotate(120)
  .scale(90000)
  .translate([width / 2, height / 2]);

var path = d3.geoPath()
  .projection(projection);

var stadsdeel = {"A": "Centrum","B": "Westpoort", "E": "West", "M": "Oost", "K": "Zuid", "F": "Nieuw west", "N": "Noord", "T": "Zuidoost"}

var colorScale = d3.scaleOrdinal(d3.schemeCategory20)
    colorStadsdelen = d3.scaleOrdinal(d3.schemePastel2); //d3.schemeGreys
    colorLines = d3.scaleSequential(d3.schemeCategory20);

svg.append("text")
  .attr("x", 0)
  .attr("y", 15)
  .attr("font-size", "large")
  .attr("text-decoration", "underline")
  .attr("font-weight", "bold")
  .text("Legenda");

var y0 = 30;
var spacingy = 20
var x0 = 5
var spacingx = 55

/*Legenda*/
svg.append("circle")
  .attr("class", "station")
  .attr("cx", x0 + 22)
  .attr("cy", y0 + spacingy * 3)
  .attr("r", 3);
svg.append("text")
  .attr("class", "label")
  .attr("x", spacingx + 5)
  .attr("y", y0 + spacingy * 3 + 5)
  .text("Kamers");


d3.queue()
    .defer(d3.json, "../data/GEBIED_BUURTEN.json")
    // .defer(d3.json, "trammetro.json")
    .defer(d3.json, "../data/trammetrostations.geojson")
    // .defer(d3.json, "spoor.geojson")
    .defer(d3.csv,  "../data/treinstations.csv")
    .await(ready);

function ready(error, buurten, trammetrostations, treinstations) {
  if (error) throw error;

  /* Areas */

  var stadsdelen = buurten.features//topojson.feature(buurten, buurten)//.features;

  // Draw the buurten
  svg.selectAll(".buurt")
      .data(stadsdelen)
    .enter().insert("g")
      .append("path")
        .attr("class", "buurt")
        .attr("d", path)
        // .attr("fill", "#faebc4")
        .attr("fill", function(d) { return colorStadsdelen(d.properties.Stadsdeel_code[0]) })
        .on("click", function(d) {
            var html = "";

            html += "<div class=\"tooltip_kv\">";
            html += "<span class=\"tooltip_value\">";
            html += `${stadsdeel[d.properties.Stadsdeel_code]}`;
            html += "</span>";
            html += "<span class=\"tooltip_key\">";
            html += `${d.properties.Buurt}`
            html += "</span>";
            html += "</div>";

            if (!($(".tooltip_key").text().substr(0,4) ==
                    d.properties.Buurt.substr(0,4))){
            $("#tooltip-container").html(html);
            $(this).attr("fill-opacity", "0.8");
            $("#tooltip-container").show();
            }
            else{
              $(this).attr("fill-opacity", "1.0");
              $("#tooltip-container").hide();
            }

            var coordinates = d3.mouse(this);

            var map_width = $('#map')[0].getBoundingClientRect().width;

            if (d3.event.layerX < map_width / 2) {
              d3.select("#tooltip-container")
                .style("top", (d3.event.layerY + 15) + "px")
                .style("left", (d3.event.layerX + 15) + "px");
            } else {
              var tooltip_width = $("#tooltip-container").width();
              d3.select("#tooltip-container")
                .style("top", (d3.event.layerY + 15) + "px")
                .style("left", (d3.event.layerX - tooltip_width - 30) + "px");
            }
        })
      .append("title")
        .text(function(d) { return stadsdeel[d.properties.Stadsdeel_code] + ": " + d.properties.Buurt });

  console.log(buurten.features[0])
  // Draw borders around buurten
  svg.append("path")
      .data(stadsdelen)
      .enter().insert("g")
      .attr("class", "buurt-borders")
      .attr("d", path)
      // .attr("fill", "#faebc4")
      .attr("style", "outline: solid black;")
      .style("fill", "none")
    .append("title")
      // .text(function(d) { return stadsdeel[d.properties.Stadsdeel_code] + ": " + d.properties.Buurtcombinatie });

  /* Points */

  // Draw the points for the stations
  var station = svg.selectAll(".treinstations")
    .data(treinstations)
    .enter().append("circle")
      .attr("transform", function(d) { return "translate(" + projection([d["0"], d["1"]]) + ")"; })
      .attr("class", "station");

  // // Draw name next to station point
  // svg.selectAll(".stationnaam")
  //     .data(treinstations)
  //     .enter().append("text")
  //       .text(function(d) { return d.name; }) //.split(" ")
  //       .attr("class", "stationnaam")
  //       .attr("x", function(d) { return projection([d["0"], d["1"]])[0] - d.name.length/3})
  //       .attr("y", function(d) { return projection([d["0"], d["1"]])[1] - 7})

  // Draw the points for the stations
  svg.selectAll(".trammetrostations")
    .data(trammetrostations.features)
    .enter().append("circle")
      .attr("transform", function (d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
      .attr("class", function (d) { return "halte " + d.properties.Modaliteit.toLowerCase() });

};
