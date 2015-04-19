// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// Initializing the canvas
// Using native JS but could use jQuery or anything
var canvas = document.getElementById("spaceCanvas");

// Initialize the context
var ctx = canvas.getContext("2d");

// Set width and height to full window
var W = window.innerWidth,
    H = window.innerHeight;
canvas.width = W;
canvas.height = H;

// Some variables for later use
var particleCount = $(window).width()/20,
    particles = [],
    minDist = 65,
    dist;

// Function to make canvas black
function paintCanvas() {
    // Set color to black
    ctx.fillStyle = "rgba(30,30,30,1)";

    // Rectangle of white from Top Left (0,0) to Bottom Right (W,H)
    ctx.fillRect(0, 0, W, H);
}

// Now make some particles that attract each other when near
// Will set min. distance for it and draw a line between them when near

// Attraction is done by increasing velocity when near each other

// Make a function that will act as a class for the particles

function Particle() {
    // Position them randomly
    // Math.random() generates random between 0 and 1, so we multiply this by canvas width and height
    this.x = Math.random() * W;
    this.y = Math.random() * H;

    // Also need to set some velocity
    this.vx = -0.5 + Math.random() * Math.random();
    this.vy = 0.5 + Math.random() * Math.random();

    // Now the size of the particles
    this.radius = Math.random() * (Math.random() * 5);

    // Now draw the particles, use basic fillStyle and start the path
    // use 'arc' function to draw circle, uses x + y coordinates and then radius, then start angle, and end angle, then boolean
    // False for clockwise
    this.draw = function() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        // Fill the arc we just made
        ctx.fill();
    }
}

// Push the particles into an array
for (var i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Function to draw everything on canvas that we'll use when we animate whole scene
function draw() {
    // Call the painCanvas function so it gets repainted each frame
    paintCanvas();

    // Call function to draw particles using a loop
    for (var i = 0; i < particles.length; i++) {
        p = particles[i];
        p.draw();
    }

    // Call update function
    update();
}

// Give life to the particles
function update() {
    // This function will update evry particles position according to their velocities
    for (var i = 0; i < particles.length; i++) {
        p = particles[i];

        // change velocities
        p.x += p.vx;
        p.y += p.vy

        // We dont want them to leave area so only change position whent hey touch walls
        if (p.x + p.radius > W)
            p.x = p.radius;

        else if (p.x - p.radius < 0) {
            p.x = W - p.radius;
        }

        if (p.y + p.radius > H)
            p.y = p.radius;

        else if (p.y - p.radius < 0) {
            p.y = H - p.radius;
        }

        // Now they need to attract, so check distance then compare to minDistance
        // We will have another loop so it is compared to everyparticles apart from itself
        for (var j = i + 1; j < particles.length; j++) {
            p2 = particles[j];
            distance(p, p2);
        }

    }
}

// Distance calculator between particles
function distance(p1, p2) {
    var dist,
        dx = p1.x - p2.x;
    dy = p1.y - p2.y;
    dist = Math.sqrt(dx * dx + dy * dy);

    // Draw line if distance is smaller than minDistance
    if (dist <= minDist) {

        // Draw the line
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255," + (1.2 - dist / minDist) + ")";
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.closePath();

        // Some acceleration depending on distance
        var ax = dx / -5000,
            ay = dy / -5000;

        // Apply the acceleration
        p1.vx -= ax;
        p1.vy -= ay;

        p2.vx += ax;
        p2.vy += ay;
    }
}

// Start main animation loop using requestAnimFrame
function animloop() {
    draw();
    requestAnimFrame(animloop);
}

animloop();
