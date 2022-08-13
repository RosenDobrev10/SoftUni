const canvas = document.getElementById('canvas');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

ctx.font = '24px Arial';
const width = canvas.width;
const height = canvas.height;


// Physics step
const stepSize = 20;
const rate = 1000 / stepSize;
const speed = 300;

const brickWidth = 50;
const brickHeight = 15;
const padWidth = 100;
const padHeight = 20;
const ballSize = 10;

const limits = {
    left: 0 + ballSize,
    right: width - ballSize,
    top: 0 + ballSize,
    bottom: height - 50 - ballSize
};

const mouse = {
    x: 0,
    y: 0
};
const ball = {
    x: 400,
    y: 300,
    vel: getVector(speed, Math.PI / 4)
};

const bricks = [];
const colors = [
    'black',
    'green',
    '#00CCCC'
];

canvas.addEventListener('mousemove', onMouse);

function getVector(speed, dir) {
    return {
        x: Math.cos(dir) * speed,
        y: Math.sin(dir) * speed
    };
}

function onMouse(event) {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
}

function brick(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, brickWidth, brickHeight);
}

function pad(x) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(x - padWidth / 2, 550, padWidth, padHeight);
}

function drawBall(x, y) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, ballSize, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function clear() {
    ctx.clearRect(0, 0, 800, 600);
}

function render() {
    clear();
    for (let b of bricks) {
        if (b.live == false) {
            continue;
        }
        brick(b.x, b.y, colors[b.hits]);
    }
    pad(mouse.x);
    drawBall(ball.x, ball.y);
}

function tick() {
    ball.x += ball.vel.x / rate;
    ball.y += ball.vel.y / rate;

    if ((ball.x > limits.right && ball.vel.x > 0)
        || (ball.x < limits.left && ball.vel.x < 0)) {
        ball.vel.x *= -1;
    }
    if (ball.y < limits.top && ball.vel.y < 0) {
        ball.vel.y *= -1;
    }

    // Paddle hit
    if ((ball.y > limits.bottom && ball.vel.y > 0)
        && (ball.y <= limits.bottom + ballSize)
        && (ball.x >= mouse.x - padWidth / 2 - ballSize)
        && ball.x <= mouse.x + padWidth / 2 + ballSize) {
        ball.vel.y *= -1;

        let x = ball.vel.x + 100 * (ball.x - mouse.x) / padWidth;
        const y = Math.sqrt(speed ** 2 - x ** 2);
        ball.vel.x = x;
        ball.vel.y = -y;
    }

    for (let b of bricks) {
        if (b.live == false) {
            continue;
        }
        checkBrick(b);
    }
}

function checkBrick(b) {
    if ((ball.x + ballSize > b.x)
    && (ball.x - ballSize < b.x + brickWidth)
    && (ball.y + ballSize > b.y)
    && ball.y - ballSize < b.y + brickHeight) {
        b.hits--;
        if (b.hits == 0) {
            b.live = false;
        }

        if (ball.x < b.x && ball.vel.x > 0) {
            ball.vel.x *= -1;
        } else if (ball.x > b.x + brickWidth && ball.vel.x < 0) {
            ball.vel.x *= -1;
        }

        if (ball.y < b.y && ball.vel.y > 0) {
            ball.vel.y *= -1;
        } else if (ball.y > b.y + brickHeight && ball.vel.x < 0) {
            ball.vel.y *= -1;
        }
    }
}

let lastTime = 0;
let delta = 0;

function main(time) {
    delta += time - lastTime;
    lastTime = time;

    if (delta > 1000) {
        delta = 20;
    }
    while (delta >= 20) {
        delta -= 20;
        tick();
    }
    render();

    // ctx.fillText(`${time.toFixed(0)} : ${lastTime.toFixed(0)} : ${delta.toFixed(0)}`, 20, 20);

    requestAnimationFrame(main);
}

function start() {
    // TODO initialize board
    for (let row = 0; row < 5; row++)  {
        for (let col = 0; col < 13; col++) {
            bricks.push({
                x: col * brickWidth * 1.2 + 15,
                y: row * brickHeight * 2 + 100,
                live: true,
                hits: 2
            });
        }
    }

    requestAnimationFrame(main);
}

start();