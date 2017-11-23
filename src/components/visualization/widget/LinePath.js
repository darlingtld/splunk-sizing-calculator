import * as d3 from 'd3';

export function createLine(name, width, height, isReverse, color, duration, rotate) {
    var w = width;
    var h = height;

    var path = d3.select("#" + name);
    path.selectAll("*").remove();
    var svg = path.append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("id", "visualization");

    var x = d3.scaleLinear().domain([0, 10]).range([0, w]);
    var y = d3.scaleLinear().domain([0, 10]).range([10, h - 10]);

    var line = d3.line()
        .x(function (d, i) {
            return isReverse ? w - x(i) : x(i);
        })
        .y(function (d) {
            return y(d);
        })
        .curve(d3.curveNatural);

// data is created inside the function so it is always unique
    let repeat = () => {

        var data = d3.range(11).map(function (i) {
            return 0;
        })

        // Uncomment following line to clear the previously drawn line
        svg.selectAll("path").remove();

        var path = svg.append("path")
            .attr("d", line(data))
            .attr("stroke", color ? color : "lightgreen")
            .attr("stroke-width", "2")
            .attr("fill", "none");

        var totalLength = path.node().getTotalLength();

        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0)
            .on("end", repeat);
    };
    repeat();
}