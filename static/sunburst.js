// This makes the SUNBURST

// This makes a zoomed version
function make_sun_from_click(pieData) {
  // Get new data
  pieDatac = pieData.children
  var nodeData = {"name":'', "children":[]};

  // PArse data in correct format
  if (pieData.height == 2){
    for (let i = 0; i < pieDatac.length; i++){
      let layer = {"name":pieDatac[i].data.name, "children":[]}
      nodeData['children'].push(layer)
      for (let j = 0; j < pieDatac[i].children.length; j++){
        nodeData['children'][i].children.push({"name":pieDatac[i].children[j].data.name,
                                   "size":pieDatac[i].children[j].data.size})
      }
    }
  }
  else if (pieData.height == 1){
      for (let j = 0; j < pieDatac.length; j++){
        nodeData['children'].push({"name":pieDatac[j].data.name,
                                   "size":pieDatac[j].data.size})
      }

  }
  else{
    return;
  }

  // Remove previous
  d3.select(".sun").remove();
  var svg = d3.select("#burst")

  // Variables
  var width = +svg.attr("width"),
      height = +svg.attr("height");

  var radius = Math.min(width, height) / 2;
  var color = d3.scaleOrdinal(d3.schemeCategory20b);
  // Create primary <g> element
  var g = svg.append('g')
              .attr("class", "sun")
              .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  // Data strucure
  var partition = d3.partition()
      .size([2 * Math.PI, radius]);

  // Find data root
  var root = d3.hierarchy(nodeData)
      .sum(function (d) { return d.size});

  // Size arcs
  partition(root);
  var arc = d3.arc()
      .startAngle(function (d) { return d.x0 })
      .endAngle(function (d) { return d.x1 })
      .innerRadius(function (d) { return d.y0 })
      .outerRadius(function (d) { return d.y1 });

  // Add everything again
  g.append("text")
    .attr("class", "label_center")
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", 'middle')
    .style("font-size", 10)
    .text("None selected");

  // Put it all together
  g.selectAll('path')
      .data(root.descendants())
      .enter().append('path')
      .attr("display", function (d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .attr("class", function (d) { return d.data.name})
      .attr('id', 'grey')
      .style('stroke', '#444')
      // .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
      .style("fill", 'grey')
      .on("mouseover", function (d) { document.querySelector(".label_center").innerHTML = d.data.name
                                  colorPath(d)

                                })
      .on("click", function (d) {
                                  make_sun_from_click(d)
                                });
}

function make_sun(nodeData){
  // Make initial sun
  var svg = d3.select("#burst")

  if (d3.select(".sun")){
    d3.select(".sun").remove();
  }
  // Variables
  var width = +svg.attr("width"),
      height = +svg.attr("height");

  var radius = Math.min(width, height) / 2;

  // Create primary <g> element
  var g = svg.append('g')
              .attr("class", "sun")
              .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  // Data strucure
  var partition = d3.partition()
      .size([2 * Math.PI, radius]);
  // Find data root
  var root = d3.hierarchy(nodeData)
      .sum(function (d) { return d.size});

  // Size arcs
  partition(root);
  var arc = d3.arc()
      .startAngle(function (d) { return d.x0 })
      .endAngle(function (d) { return d.x1 })
      .innerRadius(function (d) { return d.y0 })
      .outerRadius(function (d) { return d.y1 });

  // Make center text
  g.append("text")
    .attr("class", "label_center")
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", 'middle')
    .style("font-size", 10)
    .text("None selected");

  // Put it all together
  g.selectAll('path')
      .data(root.descendants())
      .enter().append('path')
      .attr("display", function (d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .attr("class", function (d) { return d.data.name})
      .attr('id', 'grey')
      .style('stroke', '#444')
      // .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
      .style("fill", 'grey')
      .on("mouseover", function (d) { document.querySelector(".label_center").innerHTML = d.data.name
                                      colorPath(d)
                                    })
      .on("click", function (d) {
                // Make new sun, more zoomed in
                make_sun_from_click(d);

                // If it's thje first layer, calculate the room average of the
                // Selected area
                if (d.height == 2){
                  if (d.data.name == "Nieuw west"){
                    var name = "Nieuw-West";
                  }
                  else{
                    var name = d.data.name;
                  }
                  let rooms = document.querySelectorAll(`#${name}`);

                  var size = 0;
                  var price = 0;
                  var i = 0;

                  rooms.forEach(function(room){
                    let d = room.__data__;
                    price += d.price;
                    size += d.size;
                    i++;
                  });

                  // Round average and display them
                  av_price = Math.round(price/i);
                  av_size = Math.round((size/i)*100)/100;
                  document.querySelector("#legendPrice").innerHTML = `Avarage price: 	&euro;${av_price},-`;
                  document.querySelector("#legendSize").innerHTML = `Avarage size: ${av_size}m&sup2;`;
                }

      });
};

// Make first sun
make_sun(nodeData)

// Reset button
document.querySelector("#sunbtn").onclick = function(){make_sun(nodeData);}
