// init canvas
var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = 'aliceblue';
var ctx = canvas.getContext('2d');

// init vars
let angle = 0;
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let radius = 100;
let x = 50; // Initial x position of the fish
let y = 50; // Initial y position
let dx = 2; // Horizontal speed (pixels per frame)
let dy = 1; // Vertical speed (pixels per frame)
let size = 40;

// add auto resize when window resize
window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

// animate loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    let fishAngle = Math.atan2(dy, dx);

    drawFish(ctx, x, y, size, fishAngle); // Draw the fish at the updated position

    //Basic movement
    x += dx;
    y += dy;

    // Bounce off the edges
    if (x + size * 2 > canvas.width || x < 0) {
        dx = -dx; // Reverse horizontal direction
    }
    if (y + size > canvas.height || y < 0) {
        dy = -dy; // Reverse vertical direction
    }

    // print out the diag info
    let diagDiv = document.getElementById('diagnostic');
    diagDiv.innerHTML = `x: ${x}, y: ${y}, dx: ${dx}, dy: ${dy}, angle: ${Math.round(fishAngle * 100) / 100} rad`;

    requestAnimationFrame(animate); 
}

// helper functions
function drawFish(ctx, x, y, size, angle) {
    ctx.save(); // Save the current drawing state
    ctx.translate(x, y); // Move the origin to the fish's center
    ctx.rotate(angle + Math.PI);
    ctx.scale(1, -1);
    ctx.translate(-x, -y);

    ctx.fillStyle = 'orange'; // Body
    ctx.beginPath();
    ctx.ellipse(x, y, size, size * 0.6, 0, 0, 2 * Math.PI); // Elliptical body
    ctx.fill();

    ctx.fillStyle = 'gold'; // Tail
    ctx.beginPath();
    ctx.moveTo(x + size, y);
    ctx.lineTo(x + size * 1.5, y - size * 0.5);
    ctx.lineTo(x + size * 1.5, y + size * 0.5);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'black'; // Eye
    ctx.beginPath();
    ctx.arc(x - size * 0.5, y - size * 0.2, size * 0.1, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
}

// call in animation
animate();