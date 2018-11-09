// Set number of dots to draw
var numDots = 1000

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

context.scale(1, 0.5)
context.beginPath()
context.arc(0, 0, canvas.width, 0, 2 * Math.PI)
context.stroke()

var dotsInCircle = 0, dotsOutsideCircle = 0
var RADIUS = canvas.width
var button = document.getElementById('start-button')

var data = [];
var chart = echarts.init(document.getElementById('lineChart'));
var chartOption = {
    title: {
        text: 'PI'
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        },
        show: false
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        },
        scale: true
    },
    series: [{
        name: 'pi',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data
    }]
};

button.onclick = function () {
    button.disabled = true;
    drawLineChart();
    startAnimation();
}

function drawLineChart() {
    chart.setOption(chartOption)
}

function startAnimation() {
    var drawDots = setInterval(function () { drawDot(); })
    var calculatePi = setInterval(function () { approximatePi(); }, 100)
    setTimeout(function () {
        clearInterval(drawDots);
        clearInterval(calculatePi);
        button.disabled = false;
    }, numDots * 10)
}

function drawDot() {
    var x = Math.floor(Math.random() * RADIUS);
    var y = Math.floor(Math.random() * RADIUS);
    var distance = Math.sqrt(x * x + y * y)
    if (distance <= RADIUS) {
        context.fillStyle = "#FF0000";
        context.fillRect(x, y, 1, 1);
        dotsInCircle++;
    } else {
        context.fillStyle = "#0000FF";
        context.fillRect(x, y, 1, 1);
        dotsOutsideCircle++;
    }
}

function approximatePi() {
    var pi = 4 * dotsInCircle / (dotsInCircle + dotsOutsideCircle);
    updateChartData(pi)
}

function updateChartData(value) {
    if (data.length > 50) {
        data.shift()
    }
    data.push({
        name: '',
        value: [data.length, value]
    });
    console.log(data)
    chart.setOption({
        series: [{
            data: data
        }]
    })
}