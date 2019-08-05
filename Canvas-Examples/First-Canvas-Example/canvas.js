var canvas = document.querySelector('canvas');
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');

// context.fillRect(x,y,width,height);
context.fillRect(100, 100, 100, 100);
context.fillRect(300, 100, 100, 100);
context.fillRect(500, 100, 100, 100);
