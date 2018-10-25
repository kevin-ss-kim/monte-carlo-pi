var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
context.beginPath()
context.arc(0, 0, canvas.width, 0, 2 * Math.PI)
context.stroke()
var dotsInCircle = 0, dotsOutsideCircle = 0
var RADIUS = canvas.width

document.getElementById('start-button').onclick = function() {
    alert('hey');
}