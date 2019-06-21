
var margin = {top: 40, right: 40, bottom: 40, left: 40};

var svgmap = d3.select("#map"),
    width = +svgmap.attr("width"),
    height = +svgmap.attr("height");

// Should really change this to 'clipExtent' instead of center
var projection = d3.geoAlbers()
  .center([4.9, 52.349667])
  .parallels([51.5, 51.49])
  .rotate(120)
  .scale(190000)
  .translate([width / 2, height / 2]);

var path = d3.geoPath()
  .projection(projection);

var stadsdeel = {"A": "Centrum","B": "Westpoort", "E": "West", "M": "Oost", "K": "Zuid", "F": "Nieuw west", "N": "Noord", "T": "Zuidoost"}

var colorScale = d3.scaleOrdinal(d3.schemeCategory20)
    colorStadsdelen = d3.scaleOrdinal(d3.schemePastel2); //d3.schemeGreys
    colorLines = d3.scaleSequential(d3.schemeCategory20);

svgmap.append("text")
  .attr("x", width - 120)
  .attr("y", 30)
  .attr("font-size", "large")
  .attr("text-decoration", "italic")
  .attr("font-weight", "bold")
  .text("Zoom & drag!");
svgmap.append("text")
  .attr("x", width - 100)
  .attr("y", 60)
  .attr("class", "topMapText")
  .text("~");

svgmap.append("text")
  .attr("x", 30)
  .attr("y", 30)
  .attr("font-size", "large")
  .attr("text-decoration", "underline")
  .attr("font-weight", "bold")
  .text("Legenda");

svgmap.append("text")
  .attr("x", 30)
  .attr("y", height - 60)
  .attr("class", "small")
  .attr("id", "legendPrice")
  .text("Price");
svgmap.append("text")
  .attr("x", 30)
  .attr("y", height - 45)
  .attr("class", "small")
  .attr("id", "legendSize")
  .text("Size");
svgmap.append("text")
  .attr("x", 30)
  .attr("y", height - 30)
  .attr("class", "small")
  .attr("id", "legendStreet")
  .text("Street");
svgmap.append("text")
  .attr("x", 30)
  .attr("y", height - 15)
  .attr("class", "small")
  .attr("id", "legendUrl")
  .text("Url");

var y0 = 30;
var spacingy = 20
var x0 = 5
var spacingx = 55

// Sepcial Variables
var previous_block = ''

/*Legenda*/
svgmap.append("circle")
  .attr("class", "room")
  .attr("cx", x0 + 22)
  .attr("cy", y0 + spacingy * 1)
  .attr("r", 3)
  .style("fill", "green");

svgmap.append("circle")
  .attr("class", "room_temp")
  .attr("cx", x0 + 22)
  .attr("cy", y0 + spacingy * 2)
  .attr("r", 3)
  .style("fill", "red");

svgmap.append("text")
  .attr("class", "label")
  .attr("x", spacingx + 5)
  .attr("y", y0 + spacingy * 1 + 5)
  .text("Onbepaalde tijd");

svgmap.append("text")
  .attr("class", "label")
  .attr("x", spacingx + 5)
  .attr("y", y0 + spacingy * 2 + 5)
  .text("Tijdelijk");

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

function colorDay(date) {
  let new_date = `${date.substring(8, 10)}${date.substring(4, 8)}${date.substring(0, 4)}`
  if (previous_block){
    if (document.querySelector(`rect#__${previous_block}`)){
      var ele = document.querySelector(`rect#__${previous_block}`)
      let color = ele.attributes.class.value
      ele.style = `fill:${color};`

    }
    else{
      var ele2 = document.querySelector(`rect#_${previous_block}`)
      let color = ele2.attributes.class.value
      ele2.style = `fill:white;`

    }
  }
  if (document.querySelector(`rect#__${new_date}`)){
    var ele = document.querySelector(`rect#__${new_date}`)
    ele.style = "fill:red;"
    previous_block = new_date

  }
  else{
    var ele2 = document.querySelector(`rect#_${new_date}`)
    ele2.style = "fill:red;"
    previous_block = new_date
  }
}

call  = "http://api.foknet.nl"

d3.queue()
    .defer(d3.json, "../data/GEBIED_BUURTEN.json")
    .defer(d3.json, "/data/GEBIED_STADSDELEN.json")
    .defer(d3.json, call)
    // .defer(d3.json, "http://api.foknet.nl/where/due_date+2019-06-18")
    .await(ready);

function ready(error, buurten, stad_poly, api_data) {
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
  svgmap.append("g")
         .attr('class', "zoom_g")
         .selectAll(".buurt")
         .data(stadsdelen)
        .enter().insert("g")
          .on("wheel.zoom",function(){
              var currScale = projection.scale();
              var newScale = currScale - 30*event.deltaY;
              var currTranslate = projection.translate();
              var coords = projection.invert([event.offsetX, event.offsetY]);
              projection.scale(newScale);
              var newPos = projection(coords);
              projection.translate([currTranslate[0] + (event.offsetX - newPos[0]), currTranslate[1] + (event.offsetY - newPos[1])]);
              let g = d3.select(".zoom_g");
              g.selectAll("path").attr("d", path);
              g.selectAll("circle").attr("transform", function(d)
              {return "translate(" + projection([d["lon"], d["lat"]]) + ")"; })
          })
          .call(d3.drag().on("drag", function(){
              var currTranslate = projection.translate();
              projection.translate([currTranslate[0] + d3.event.dx,
                                    currTranslate[1] + d3.event.dy]);

              let g = d3.select(".zoom_g");
              g.selectAll("path").attr("d", path);
              g.selectAll("circle").attr("transform", function(d)
              {return "translate(" + projection([d["lon"], d["lat"]]) + ")"; })
          }))
        .append("path")
          .attr("class", "buurt")
          .attr("d", path)
          // .attr("fill", "#faebc4")
          .attr("fill", function(d) { if (d.properties.Buurtcombinatie_code == 'N73'){return "None"}
                                      else if (d.properties.Stadsdeel_code == 'B'){return "None"}
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

  /* Points */
  // Draw the points for the stations
  var station = d3.select(".zoom_g").selectAll(".treinstations")
    .data(api_data.data)
    .enter().append("circle")
      .attr("transform", function(d)
      { return "translate(" + projection([d["lon"], d["lat"]]) + ")"; })
      .attr("id", function(d) {for (let i = 0; i < 7; i++){
        if (inside_poly([d.lon, d.lat], code2poly[Object.keys(code2poly)[i]][0])){
        return Object.keys(code2poly)[i]
      }}})
      .attr("r", 5)
      .on("mouseover", function(d) {colorDay(d.due_date)
        for (let i = 0; i < 7; i++){if (inside_poly([d.lon, d.lat], code2poly[Object.keys(code2poly)[i]][0])){
        document.querySelector(".topMapText").innerHTML = Object.keys(code2poly)[i]
      }}})
      .style('fill',function(d) {if (d.tijd == -1){return 'green'} else{return 'red'}})
      .style("stroke", 'black')
      .on("click", function(d) {
        document.querySelector("#legendUrl").innerHTML = `<a href="${d.url}" target="_blank"> Advertentie <a>`;
        document.querySelector("#legendUrl").style = 'fill:blue;'
        document.querySelector("#legendPrice").innerHTML = `Price: 	&euro;${d.price},-`;
        document.querySelector("#legendStreet").innerHTML = `${d.loc.substring(0, d.loc.length-9)}`;
        document.querySelector("#legendSize").innerHTML = `Size: ${d.size}m&sup2;`;
      });
};

function new_rooms(call){
  d3.json(call, function(error, data2) {

    var rooms =  document.querySelectorAll(".treinstations");

    rooms.forEach(function() {
      this.remove()
    })


    var station = d3.select(".zoom_g").selectAll(".treinstations")
      .data(api_data.data)
      .enter().append("circle")
        .attr("transform", function(d)
        { return "translate(" + projection([d["lon"], d["lat"]]) + ")"; })
        .attr("id", function(d) {for (let i = 0; i < 7; i++){
          if (inside_poly([d.lon, d.lat], code2poly[Object.keys(code2poly)[i]][0])){
          return Object.keys(code2poly)[i]
        }}})
        .attr("r", 5)
        .on("mouseover", function(d) {colorDay(d.due_date)
          for (let i = 0; i < 7; i++){if (inside_poly([d.lon, d.lat], code2poly[Object.keys(code2poly)[i]][0])){
          document.querySelector(".topMapText").innerHTML = Object.keys(code2poly)[i]
        }}})
        .style('fill',function(d) {if (d.tijd == -1){return 'green'} else{return 'red'}})
        .style("stroke", 'black')
        .on("click", function(d) {
          document.querySelector("#legendUrl").innerHTML = `<a href="${d.url}" target="_blank"> Advertentie <a>`;
          document.querySelector("#legendUrl").style = 'fill:blue;'
          document.querySelector("#legendPrice").innerHTML = `Price: 	&euro;${d.price},-`;
          document.querySelector("#legendStreet").innerHTML = `${d.loc.substring(0, d.loc.length-9)}`;
          document.querySelector("#legendSize").innerHTML = `Size: ${d.size}m&sup2;`;
  })})}
