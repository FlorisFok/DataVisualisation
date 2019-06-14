
var margin = {top: 40, right: 40, bottom: 40, left: 40};

var svgmap = d3.select("#map"),
    width = +svgmap.attr("width"),
    height = +svgmap.attr("height");

// Should really change this to 'clipExtent' instead of center
var projection = d3.geoAlbers()
  .center([4.9, 52.366667])
  .parallels([51.5, 51.49])
  .rotate(120)
  .scale(200000)
  .translate([width / 2, height / 2]);

var path = d3.geoPath()
  .projection(projection);

var stadsdeel = {"A": "Centrum","B": "Westpoort", "E": "West", "M": "Oost", "K": "Zuid", "F": "Nieuw west", "N": "Noord", "T": "Zuidoost"}

var colorScale = d3.scaleOrdinal(d3.schemeCategory20)
    colorStadsdelen = d3.scaleOrdinal(d3.schemePastel2); //d3.schemeGreys
    colorLines = d3.scaleSequential(d3.schemeCategory20);

svgmap.append("text")
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

// /*Legenda*/
// svgmap.append("circle")
//   .attr("class", "station")
//   .attr("cx", x0 + 22)
//   .attr("cy", y0 + spacingy * 3)
//   .attr("r", 3);
// svgmap.append("text")
//   .attr("class", "label")
//   .attr("x", spacingx + 5)
//   .attr("y", y0 + spacingy * 3 + 5)
//   .text("Kamers");

function colorPath(d) {
  let g = d3.select('.sun')
  g.selectAll('#grey').style('fill', 'grey')

  if (d.depth == 3){
    document.querySelector("#sunpath").innerHTML =
   `${d.parent.parent.data.name} -->
   ${d.parent.data.name}
   --> ${d.data.name}`
   document.querySelector(`.${d.parent.parent.data.name.replace(/ /g,".")}`).style = "fill: red;"
   document.querySelector(`.${d.parent.data.name.replace(/ /g,".")}`).style = "fill: red;"
   document.querySelector(`.${d.data.name.replace(/ /g,".")}`).style = "fill: red;"
  }
  else if (d.depth == 2){
    console.log(d.parent.data.name.replace(/ /g,"."))
    document.querySelector("#sunpath").innerHTML =
   `${d.parent.data.name}
   --> ${d.data.name}`
   document.querySelector(`.${d.parent.data.name.replace(/ /g,".")}`).style = "fill: red;"
   document.querySelector(`.${d.data.name.replace(/ /g,".")}`).style = "fill: red;"
  }
  else if (d.depth == 1){
    document.querySelector("#sunpath").innerHTML =
   `${d.data.name}`
   document.querySelector(`.${d.data.name.replace(/ /g,".")}`).style = "fill: red;"
  }
}

function inside_poly(point, pol) {
    var x = point[0], y = point[1];
    var inside = false;
    for (var i = 0, j = pol.length - 1; i < pol.length; j = i++) {
        var xi = pol[i][0], yi = pol[i][1];
        var xj = pol[j][0], yj = pol[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};



d3.queue()
    .defer(d3.json, "../data/GEBIED_BUURTEN.json")
    .defer(d3.json, "/data/GEBIED_STADSDELEN.json")
    .defer(d3.json, "http://api.foknet.nl")
    .defer(d3.json, "../data/trammetrostations.geojson")
    .defer(d3.csv,  "../data/treinstations.csv")
    .await(ready);

function ready(error, buurten, stad_poly, api_data, trammetrostations, treinstations) {
  if (error) throw error;
  /* Areas */
  var code2poly = {};
  for (let i = 0; i < stad_poly.features.length; i++){
    let poly = stad_poly.features[i].geometry.coordinates;
    code2poly[stad_poly.features[i].properties.Stadsdeel] = poly;
    // code2poly[stad_poly.features[i].properties.Stadsdeel_code] = poly;
  }

  var stadsdelen = buurten.features//topojson.feature(buurten, buurten)//.features;

  // Draw the buurten
  svgmap.selectAll(".buurt")
      .data(stadsdelen)
    .enter().insert("g")
      .append("path")
        .attr("class", "buurt")
        .attr("d", path)
        // .attr("fill", "#faebc4")
        .attr("fill", function(d) { if (d.properties.Buurtcombinatie_code == 'N73'){return "white"}
                                    else if (d.properties.Stadsdeel_code == 'B'){return "white"}
                                    else{return colorStadsdelen(d.properties.Stadsdeel_code[0]) }})
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

            d2 = document.querySelector(`.${d.properties.Buurt.replace(/ /g,".")}`).__data__
            colorPath(d2)

            if (!($(".tooltip_key").text().substr(0,3) ==
                    d.properties.Buurt.substr(0,3))){
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

  // Draw borders around buurten
  svgmap.append("path")
      .data(stadsdelen)
      .enter().insert("g")
      .attr("class", "buurt-borders")
      .attr("d", path)
      .attr("style", "outline: solid black;")
      .style("fill", "none")
    .append("title")

  /* Points */
  // Draw the points for the stations
  var station = svgmap.selectAll(".treinstations")
    .data(api_data.data)
    .enter().append("circle")
      .attr("transform", function(d)
      { return "translate(" + projection([d["lon"], d["lat"]]) + ")"; })
      .attr("id", function(d) {for (let i = 0; i < 7; i++){
        if (inside_poly([d.lon, d.lat], code2poly[Object.keys(code2poly)[i]][0])){
        return Object.keys(code2poly)[i]
      }}})
      .attr("r", 3)
      .on("mouseover", function(d) {for (let i = 0; i < 7; i++){if (inside_poly([d.lon, d.lat], code2poly[Object.keys(code2poly)[i]][0])){
        console.log(Object.keys(code2poly)[i])
      }}})
      .style('fill',function(d) {if (d.tijd == -1){return 'green'} else{return 'red'}});
// console.log(inside_poly([d.lon, d.lat], code2poly[Object.keys(code2poly)[i]][0]))

};
