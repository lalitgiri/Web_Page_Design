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

window.addEventListener('click', function (e) {

    const pos = {
        x: e.clientX,
        y: e.clientY
    };
    particles.forEach(particle => {
        if (isIntersect(pos, particle)) {
            alert('click on particle: ' + particle.id);
        }
    });
});
//utility functions 

function randomIntFormRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor() {
    return colorArray[Math.floor(Math.random() * colorArray.length)]
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    }
    return rotatedVelocities;
}

function isIntersect(point, particle) {
    return Math.sqrt((point.x - particle.x) ** 2 + (point.y - particle.y) ** 2) < particle.radius;
}

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;


    // prevent accidental overlap of partiles 
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        // grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x)

        // strore mass in var for better readability in collision equations
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // velocity before equation 
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // velocity after collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        //swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

var particles = [];

init();
function init() {
    const radius = 50;
    particles = [];
    for (var i = 0; i < 50; i++) {
        let x = randomIntFormRange(radius, canvas.width - radius);
        let y = randomIntFormRange(radius, canvas.height - radius);
        if (i !== 0) {
            for (var j = 0; j < particles.length; j++) {
                if (distance(x, y, particles[j].x, particles[j].y) - (2 * radius) - 1 < 0) {
                    x = randomIntFormRange(radius, canvas.width - radius);
                    y = randomIntFormRange(radius, canvas.height - radius);
                    j = -1;
                }
            }
        }

        particles.push(new Particle(i,x, y, radius, randomColor(), randomColor()));
    }


}
function Particle(id,x, y, radius, color, strokeStyle) {
    this.id =id;
    this.x = x;
    this.y = y;
    this.velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
    }
    this.radius = radius;
    this.mass = 1;
    this.color = color; // colorArray[Math.floor(Math.random() * colorArray.length)];
    this.strokeStyle = strokeStyle;
    this.opacity=0.2;

    this.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.save();

        context.globalAlpha =this.opacity;
        context.fillStyle = this.color;
        context.fill();
        context.restore()
        context.strokeStyle = this.color;
       
        context.fillText(this.id,this.x-this.radius/2, this.y+this.radius/4);
        
        context.stroke();
        context.closePath();
    }
    this.update = function (particles) {
        this.draw();

        for (var j = 0; j < particles.length; j++) {
            if (this === particles[j])
                continue;
            if (distance(this.x, this.y, particles[j].x, particles[j].y) - (2 * this.radius) - 1 < 0) {
                resolveCollision(this, particles[j]);
            }
        }

        if (this.x - this.radius <= 0 || this.x + this.radius > canvas.width)
            this.velocity.x = -this.velocity.x;
        if (this.y - this.radius <= 0 || this.y + this.radius > canvas.height)
            this.velocity.y = -this.velocity.y;

        // mouse collision detection
        if(distance(mouse.x, mouse.y,this.x, this.y)<30 && this.opacity <0.2){
           this.opacity +=0.2;
        }else if(this.opacity>0){
            this.opacity -=0.2;
            this.opacity= Math.max(0,this.opacity);
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);


    particles.forEach(particle => particle.update(particles));

}

animate();