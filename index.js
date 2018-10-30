// Set number of dots to draw
var numDots = 50000
// 

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
context.scale(1, 0.5)
context.beginPath()
context.arc(0, 0, canvas.width, 0, 2 * Math.PI)
context.stroke()
var dotsInCircle = 0, dotsOutsideCircle = 0
var RADIUS = canvas.width
var button = document.getElementById('start-button')

button.onclick = function() {
    button.disabled = true;
    startAnimation();
    button.disabled = false;
}

function startAnimation() {
    var drawDots = setInterval(function() { drawDot(); }, 0.1)
    setTimeout(function() { clearInterval(drawDots); }, numDots)
}

function drawDot() {
    var x = Math.floor(Math.random() * RADIUS);
    var y = Math.floor(Math.random() * RADIUS);
    var distance = Math.sqrt(x * x + y * y)
    if (distance <= RADIUS) {
        context.fillStyle = "#FF0000"
        context.fillRect(x, y, 1, 1)
        dotsInCircle++;
    } else {
        context.fillStyle = "#0000FF"
        context.fillRect(x, y, 1, 1)
        dotsOutsideCircle++;
    }
    approximatePi();
}

function approximatePi() {
    console.log(4 * dotsInCircle / (dotsInCircle + dotsOutsideCircle))
}