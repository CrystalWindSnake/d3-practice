import * as d3 from "d3";
import "./helper/d3Ex";

function update_tables(tableID: string, input) {
    var arr = input.map(d => Object.values(d))

    var tab = d3.select(`div#ct3  table#${tableID} > tbody`)
    var tr = tab.selectAll('tr')
        .data(arr)
        .join('tr')
        .selectAll('td')
        .data(d => d)
        .join('td')
        .text(d => d)
}


//
function update(input) {
    // .data(input,d=>d.name) 第二参数是重点
    //如果没有设置，由于第二批数据名字顺序与第一批不一样
    //y轴没有变化，数据都更新到错位上
    svg.selectAll('.bar')
        .data(input, d => d.name)
        .join(
            enter => enter.append('rect').lower()
                .attr('class', 'bar')
                .attr('x', 0)
                .attr('y', d => y(d.name) + barWidth / 2)
                .attr('height', barWidth) 
        )
        .transition().duration(1000)
        .attr('width', d => x(d.value))

    update_tables('select', input)


}


var data = [
    { name: 'A1', sex: '男', value: 100 },
    { name: 'A2', sex: '男', value: 200 },
    { name: 'A3', sex: '男', value: 300 },

    { name: 'A2', sex: '女', value: 50 },
    { name: 'A3', sex: '女', value: 150 },
    { name: 'A1', sex: '女', value: 250 },
]


update_tables('all', data)



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


var svg = d3.select('div#ct3 svg')
    .attr('width', chartDim.width)
    .attr('height', chartDim.height)
    .append('g')
    .exSetTranslate(paddings.l, paddings.t)

var x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([0, chartDim.scaleWidth])

var xa = d3.axisBottom(x)

// domain 应该用 d3.set 处理
var y = d3.scaleBand()
    .domain(d3.set(data, d => d.name).values())
    .range([0, chartDim.scaleHeight])

var ya = d3.axisLeft(y)


var barWidth = y.bandwidth() / 2

svg.append('g')
    .exSetTranslate(0, chartDim.scaleHeight)
    .call(xa)

svg.append('g')
    .exSetTranslate(0, 0)
    .call(ya)




d3.select('div#ct3 select')
    .on('change', function (this: Element, d) {
        update(data.filter(d => d.sex == this.value))
    })

update(data.filter(d => d.sex == '男'))

// setTimeout(() => {
//     update(data.filter(d=>d.sex=='女'))
// }, 2000);
