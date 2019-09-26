var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth-20;
canvas.height = window.innerHeight-20;

var mouse = {
    x: undefined,
    y: undefined
}

// context.beginPath();
context.moveTo(20, canvas.height - 20);

context.lineTo(canvas.width - 20, canvas.height - 20);
context.strokeStyle = "red";
context.lineWidth=10;
context.stroke();
context.moveTo(50, canvas.height - 50);

context.lineTo(canvas.width - 20, canvas.height - 50);
context.stroke();
// context.closePath();

context.beginPath();
// context.moveTo(50, canvas.height - 100);
context.arc(50, canvas.height - 80, 30, 0.5*Math.PI,1*Math.PI, false);
context.strokeStyle = "blue";
context.stroke();
context.closePath();

context.beginPath();
context.lineWidth=1;
context.moveTo(300, 20);
for(var i = 1;i<10;i++){
    context.lineTo(300-i, 20+i); 
}
// context.moveTo(300, 20);
for(var i = 1;i<20;i++){
    context.lineTo(290+i, 30); 
}
// context.lineTo(70, 100);

// context.fillStyle = "red";
// context.fill();
context.closePath();
context.stroke();

// for (var i = 0; i < 3; i++) {
//     context.beginPath();
//     // context.arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean)
//     var x = Math.random()*window.innerWidth;
//     var y = Math.random()*window.innerHeight;
//     context.arc(x,y, 30, 0, Math.PI * 2, false);
//     context.strokeStyle = "blue";
//     context.stroke();
// }