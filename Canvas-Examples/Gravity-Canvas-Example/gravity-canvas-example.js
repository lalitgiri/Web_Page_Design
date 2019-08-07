var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var gravity = 1;
var friction = 0.59;

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
init();
function init() {
    ballArray = [];

    for (var i = 0; i < 500; i++) {
        var x = randomIntFormRange(0, canvas.width);
        var y = randomIntFormRange(0, canvas.height);
        var dx = randomIntFormRange(-2, 2);
        var dy = randomIntFormRange(-2, 2);
        var radius = randomIntFormRange(15,30);

        ballArray.push(new Ball(x, y, dx,dy, radius, randomColor()));
    }
    // ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, 'red');

}
function Ball(x, y, dx, dy, radius, color) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
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

        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }
        if (this.x + this.radius + this.dx > canvas.width ||this.x - this.radius-this.dx<0 ) {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;
        console.log("y =" + this.y + " dy=" + this.dy + " height =" + canvas.height);
        this.draw();
    }
}
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);
    // ball.update();
    ballArray.forEach(ball => {
        ball.update();
    })


    // context.fillText('HTML Canvas',mouse.x,mouse.y);

}

animate();