var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 40;
var minRadius = 10;

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
canvas.addEventListener('click', (e) => {
    const pos = {
        x: e.clientX,
        y: e.clientY
    };
    circleArray.forEach(circle => {
        if (isIntersect(pos, circle)) {
            alert('click on circle: ' + circle.id);
        }
    });
});

var circleArray = [];
init();

function init() {
    circleArray =[];

    for (var i = 0; i < 1000; i++) {
        var radius = (Math.random() * 3) + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5)*5;
        var dy = (Math.random() - 0.5)*5;
    
        circleArray.push(new Circle(i,x, y, dx, dy, radius));
    }
    
}
function Circle(id,x, y, dx, dy, radius) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];


    this.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // context.strokeStyle = "blue";
        context.fillStyle = this.color;

        // context.fillText("Hello",this.x, this.y);
        context.fill();
        context.stroke();
    }
    this.update = function () {

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;


        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius < maxRadius) {
            this.radius += 1;
        }
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
    }
}

function isIntersect(point, circle) {
    return Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
}
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].draw();
        circleArray[i].update();
    }

}

animate();