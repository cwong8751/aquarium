var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = 'aliceblue';
var ctx = canvas.getContext('2d');

let mouseX = 0;
let mouseY = 0;
canvas.addEventListener('mousemove', function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    let diagDiv = document.getElementById('mousediag');
    diagDiv.innerHTML = `mouseX: ${mouseX}, mouseY: ${mouseY}`;
});

window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let canvasDiag = document.getElementById('canvasdiag');
    canvasDiag.innerHTML = `canvas width: ${canvas.width}, canvas height: ${canvas.height}`;
};

class Fish {
    constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.isActive = true;
    }

    update(frameCount, randomUpdateInterval) {
        if (!this.isActive) return;

        if (frameCount % randomUpdateInterval === 0) {
            this.dx += (Math.random() - 0.5) * 0.5;
            this.dy += (Math.random() - 0.5) * 0.5;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.size * 2 < 0 || this.x > canvas.width || this.y + this.size < 0 || this.y > canvas.height) {
            this.isActive = false;
        }
    }

    draw(ctx) {
        if (!this.isActive) return;

        let fishAngle = Math.atan2(this.dy, this.dx);

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(fishAngle + Math.PI);
        ctx.scale(1, -1);
        ctx.translate(-this.x, -this.y);

        ctx.fillStyle = 'orange';
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.size, this.size * 0.6, 0, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = 'gold';
        ctx.beginPath();
        ctx.moveTo(this.x + this.size, this.y);
        ctx.lineTo(this.x + this.size * 1.5, this.y - this.size * 0.5);
        ctx.lineTo(this.x + this.size * 1.5, this.y + this.size * 0.5);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x - this.size * 0.5, this.y - this.size * 0.2, this.size * 0.1, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();
    }
}

let fishArray = [];
for (let i = 0; i < 5; i++) {
    let size = Math.random() * 30 + 20;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;
    fishArray.push(new Fish(x, y, dx, dy, size));
}

let frameCount = 0;
const randomUpdateInterval = 10;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fishArray.forEach(fish => {
        fish.update(frameCount, randomUpdateInterval);
        fish.draw(ctx);

        if (!fish.isActive) {
            respawnFish(fish);
        }
    });

    frameCount++;

    let diagDiv = document.getElementById('diagnostic');
    diagDiv.innerHTML = `Fish count: ${fishArray.filter(fish => fish.isActive).length}`;

    requestAnimationFrame(animate);
}

function respawnFish(fish) {
    fish.isActive = true;
    fish.x = Math.random() * canvas.width;
    fish.y = Math.random() * canvas.height;
    fish.dx = (Math.random() - 0.5) * 2;
    fish.dy = (Math.random() - 0.5) * 2;
    fish.size = Math.random() * 30 + 20;
}

animate();
