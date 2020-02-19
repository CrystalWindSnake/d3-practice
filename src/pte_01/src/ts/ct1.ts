import * as d3 from "d3";
import "./helper/d3Ex";

// var data =
//     [
//         { "name": "A2", "sex": "m", "value": 20 },
//         { "name": "A3", "sex": "m", "value": 30 },
//         { "name": "A4", "sex": "m", "value": 40 },
//         { "name": "A5", "sex": "m", "value": 50 },
//         { "name": "A1", "sex": "m", "value": 10 },
//         { "name": "A6", "sex": "m", "value": 60 },
//         { "name": "A1", "sex": "f", "value": 100 },
//         { "name": "A2", "sex": "f", "value": 200 },
//         { "name": "A4", "sex": "f", "value": 400 },
//         { "name": "A5", "sex": "f", "value": 500 },
//         { "name": "A3", "sex": "f", "value": 300 },
//         { "name": "A7", "sex": "f", "value": 600 }]

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


//通常在svg中先加入一个 g，并且设置他的偏移，
//防止x和y轴内容超出范围
var svg = d3.select('div#ct1>svg')
    .attr('width', chartDim.width)
    .attr('height', chartDim.height)
    .append('g')
    .exSetTranslate(paddings.l, paddings.t)

var x = d3.scaleLinear()
    .domain([0, 300])
    .range([0, chartDim.scaleWidth])

var xa = d3.axisBottom(x)

// domain 应该用 d3.set 处理
var y = d3.scaleBand()
    .domain(['A1', 'A2', 'A3'])
    .range([0, chartDim.scaleHeight])

var ya = d3.axisLeft(y)

//y.bandwidth() 能获取y轴每个段的宽度
var barWidth = y.bandwidth()/2

// 注意这里直接用join，当只传入字符串做第一个参数时，自动会append
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


