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

var chart = null;
var lineChartRange = [0, 2 * Math.PI]
var lineChartData = [
    {
        label: 'Series 1',
        values: [],
        range: lineChartRange
    }
];

button.onclick = function() {
    button.disabled = true;
    drawLineChart();
    startAnimation();
}

function drawLineChart() {
    chart = $('#lineChart').epoch({
        type: 'time.line',
        axes: ['right', 'bottom', 'left'],
        data: lineChartData
    })
}

function startAnimation() {
    var drawDots = setInterval(function() { drawDot(); })
    setTimeout(function() {
        clearInterval(drawDots);
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
    approximatePi();
}

function approximatePi() {
    var pi = 4 * dotsInCircle / (dotsInCircle + dotsOutsideCircle);
    updateChartData(pi)
}

function updateChartData(value) {
    lineChartData[0].values.push({ time: (new Date).getTime(), y: value })
    chart.update(lineChartData)
}