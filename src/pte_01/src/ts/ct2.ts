import * as d3 from "d3";
import "./helper/d3Ex";

var data = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 200 },
    { name: 'A3', value: 300 },
]

//设置四边空白
var paddings = {
    l: 30,
    r: 30,
    t: 30,
    b: 30,
    width: 500,
    height: 500,
}

var chartDim = {
    width: paddings.width,
    height: paddings.height,
    scaleWidth: paddings.width - paddings.l - paddings.r,
    scaleHeight: paddings.height - paddings.t - paddings.b,
}



var svg = d3.select('div#ct2>svg')
    .attr('width', chartDim.width)
    .attr('height', chartDim.height)
    .append('g')
    .exSetTranslate(paddings.l, paddings.t)

// d3.max
var x = d3.scaleLinear()
    .domain([0, d3.max(data,d=>d.value)])
    .range([0, chartDim.scaleWidth])

var xa = d3.axisBottom(x)

// domain 应该用 d3.set 处理
var y = d3.scaleBand()
    .domain(d3.set(data,d=>d.name).values())
    .range([0, chartDim.scaleHeight])

var ya = d3.axisLeft(y)


var barWidth = y.bandwidth()/2

// 
svg.selectAll('rect.bar')
    .data(data)
    .join('rect')
    .attr('class','bar')
    .attr('x', 0)
    .attr('y', d => y(d.name) + barWidth/ 2)
    .attr('width', d => x(d.value))
    .attr('height',barWidth)

svg.append('g')
    .exSetTranslate(0, chartDim.scaleHeight)
    .call(xa)

svg.append('g')
    .exSetTranslate(0, 0)
    .call(ya)


