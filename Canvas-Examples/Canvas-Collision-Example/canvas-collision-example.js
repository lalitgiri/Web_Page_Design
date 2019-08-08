var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}


var colorArray = [
    '#ffaa33',
    '#99ffaa',
    '#00ff00',
    '#4411aa',
    '#ff1100'
];

canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

});
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

window.addEventListener('click', function () {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
//utility functions 

function randomIntFormRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor() {
    return colorArray[Math.floor(Math.random() * colorArray.length)]
}


var ballArray = [];
var ball;
var ball2;
init();
function init() {
    ballArray = [];

    ball = new Ball(canvas.width / 2, canvas.height / 2,  40, 'black');
    ball2 = new Ball(undefined,undefined,  20, 'red');

}
function Ball(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color; // colorArray[Math.floor(Math.random() * colorArray.length)];


    this.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // context.strokeStyle = "blue";
        context.fillStyle = this.color;
        // context.fillText("Hello",this.x, this.y);
        context.fill();
        context.stroke();
        context.closePath();
    }
    this.update = function () {

        this.draw();
    }
}

function intercept(x1,y1,x2,y2){

    return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);

    if(intercept(ball.x,ball.y,ball2.x,ball2.y) <= ball.radius+ball2.radius+1)
        ball.color='red'
    else  ball.color='black'

        ball.update();
        ball2.x= mouse.x;
        ball2.y= mouse.y;
        ball2.update();

    // context.fillText('HTML Canvas',mouse.x,mouse.y);

}

animate();