
var width = parseFloat(d3.select('#scatter').style('width'));
var height = .66 * width;

var svg = d3
    .select('#scatter')
    .append('svg')
    .style('width', width)
    .style('height', height)
    .style('border', '2px solid black')
    .style('border-radius', '12px');

var xText = svg.append('g').attr('transform', `translate(${width / 2},${.98 * height})`)

xText
    .append('text')
    .attr('class', 'x inactive aText')
    .attr('data-id', 'income')
    .text('Household Income (Median)')

xText
    .append('text')
    .attr('y', -20)
    .attr('class', 'x inactive aText')
    .attr('data-id', 'age')
    .text('Age (Median)')

xText
    .append('text')
    .attr('y', -40)
    .attr('class', 'x active aText')
    .attr('data-id', 'poverty')
    .text('In Poverty (%)')

var yText = svg.append('g').attr('transform', `translate(15,${height / 2})rotate(-90)`)

yText
    .append('text')
    .attr('class', 'y active aText')
    .attr('data-id', 'obesity')
    .text('Obese (%)')

yText
    .append('text')
    .attr('y', 20)
    .attr('class', 'y inactive aText')
    .attr('data-id', 'smokes')
    .text('Smokes (%)')

yText
    .append('text')
    .attr('y', 40)
    .attr('class', 'y inactive aText')
    .attr('data-id', 'healthcare')
    .text('Lacks Healthcare (%)')

d3.selectAll('.aText').on('click', function () {
    var sel = d3.select(this);

    if (sel.classed('x')) {
        d3.selectAll('.x').classed('active', false).classed('inactive', true);
    } else {
        d3.selectAll('.y').classed('active', false).classed('inactive', true);
    };
    sel.classed('active', true).classed('inactive', false);

    showCircles();
});




var chartGroups = svg.append("g").attr("transform", `translate(${.1 * width}, ${.80 * height})`);
var xScaleLoc = chartGroups.append('g');
var yScaleLoc = chartGroups.append('g');
var circleGroup = chartGroups.append('g');

d3.csv("assets/data/data.csv").then(data => {
    
    var circles = circleGroup.selectAll('g').data(data).enter().append('g');
    circles.append('circle').attr('r', .02 * width).attr('class', 'stateCircle');
    circles.append('text').attr('class', 'stateText');
    
    showCircles();


    
    
    function showCircles() {
        
        var xSel = d3.selectAll('.x').filter('.active').attr('data-id')
        var ySel = d3.selectAll('.y').filter('.active').attr('data-id')
    
        var xVal = data.map(x => +x[xSel]);
        var xScaler = d3.scaleLinear().range([0, .8 * width]).domain([d3.min(xVal), d3.max(xVal)]);
        xScaleLoc.transition().duration(1000).call(d3.axisBottom(xScaler))
    
        var yVal = data.map(x => +x[ySel]);
        var yScaler = d3.scaleLinear().range([0, -.7 * height]).domain([d3.min(yVal), d3.max(yVal)]);
        yScaleLoc.transition().duration(1000).call(d3.axisLeft(yScaler))

        d3.selectAll('.stateCircle').transition().duration(1000).attr('cx', d => xScaler(d[xSel])).attr('cy',d => yScaler(d[ySel]))
        
        d3.selectAll('.stateText').transition().duration(1000).attr('dx', d => xScaler(d[xSel])).attr('dy',d => yScaler(d[ySel])).text(d=>d.abbr)
        
    };
});

// d3.csv("assets/data/data.csv").then(function(Statedata) {


//     Statedata.forEach(function(data){
//         data.poverty = +data.poverty;
//         data.age = +data.age;
//         data.income = +data.income;
//         data.incomeMoe= +data.incomeMoe;
//         data.noHealthInsurance = +data.noHealthInsurance;
//         data.obesity= +data.obesity;
//         data.smokes = +data.smokes;

//     });

//     ////create scale functions 
//     var xLinearScale= d3.scaleLinear()
//         .domain([d3.min(Statedata, d => d.poverty)-1, d3.max(Statedata, d => d.poverty)])
//         .range([0,width]);

//     var yLinearScale= d3.scaleLinear()
//         .domain([d3.min(Statedata, d => d.noHealthInsurance)-1, d3.max(Statedata, d => d.noHealthInsurance)])
//         .range([height,0]);

//       //Creating axis
//     var bottomAxis= d3.axisBottom(xLinearScale);
//     var leftAxis= d3.axisLeft(yLinearScale);  


//     ////appending axis to the chart
// var bottomAxis= d3.axisBottom(xLinearScale);
// var leftAxis= d3.axisLeft(yLinearScale);

// ////appending axis to the chart


// // chartGroup.append("g")
// // .attr("transform",`translate(0, ${height})`)
// // .call(bottomAxis);

// chartGroup.append("g")
// .call(leftAxis);
// //creating circles

// var circlesGroup= chartGroup.selectAll("circle")
// .data(Statedata)
// .enter()
// .append("circle")
// .attr("cx", d => xLinearScale(d.poverty))
// .attr("cy", d => yLinearScale(d.noHealthInsurance))
// .attr("r", "15")
// .attr("fill", "blue")
// .attr("opacity", "0.8");

// ///Initialize tool tip


// var toolTip= d3.tip()
// .attr("class", "tootip")
// .offset([80, -60])
// .html(function(d) {
//     return (`${d.abbr} <br> In Poverty: ${d.poverty}% <br> No Healthcare: ${d.noHealthInsurance}%`);
// });
// ////tooltip
// chartGroup.call(toolTip);

// });







