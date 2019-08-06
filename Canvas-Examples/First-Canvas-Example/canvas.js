var canvas = document.querySelector('canvas');
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');

// context.fillRect(x,y,width,height);
context.fillRect(100, 100, 100, 100);
context.fillStyle = "yellow";
context.fillRect(300, 400, 100, 100);
context.fillStyle = "pink";
context.fillRect(500, 100, 100, 100);


//lines
context.beginPath();
// context.moveTo(x,y);
context.moveTo(50, 300);
context.lineTo(300, 100);
context.lineTo(400, 300);
context.strokeStyle = "red";
context.stroke();


for (var i = 0; i < 3; i++) {
    context.beginPath();
    // context.arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean)
    var x = Math.random()*window.innerWidth;
    var y = Math.random()*window.innerHeight;
    context.arc(x,y, 30, 0, Math.PI * 2, false);
    context.strokeStyle = "blue";
    context.stroke();
}

