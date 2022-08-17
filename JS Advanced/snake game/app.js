const canvas = document.getElementById('canvas')
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

const width = canvas.width
const height = canvas.height
const hSize = 20
const vSize = 20
const gridSize = width / hSize

let timer = null
const apple = {
    x: 5,
    y: 15
}
const snake = {
    x: 10,
    y: 10
}
const tail = []
const speed = {
    x: 1,
    y: 0
}
const inputSpeed = {
    x: 1,
    y: 0
}
let size = 3

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (speed.y === 0) {
                inputSpeed.y = -1
                inputSpeed.x = 0
            }
            break;
        case 'ArrowDown':
            if (speed.y === 0) {
                inputSpeed.y = 1
                inputSpeed.x = 0
            }
            break;
        case 'ArrowLeft':
            if (speed.x === 0) {
                inputSpeed.y = 0
                inputSpeed.x = -1
            }
            break;
        case 'ArrowRight':
            if (speed.x === 0) {
                inputSpeed.y = 0
                inputSpeed.x = 1
            }
            break;
    }
})

function clear() {
    ctx.clearRect(0, 0, width, height)
}

function drawGrid() {
    ctx.strokeStyle = '#999999'
    ctx.beginPath()

    for (let x = 1; x < hSize; x++) {
        ctx.moveTo(x * gridSize, 0)
        ctx.lineTo(x * gridSize, height)
    }

    for (let y = 1; y < vSize; y++) {
        ctx.moveTo(0, y * gridSize)
        ctx.lineTo(width, y * gridSize)
    }

    ctx.closePath()
    ctx.stroke()
}

function rect(x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(x * gridSize + 1, y * gridSize + 1, gridSize - 2, gridSize - 2)
}

function spawnApple() {
    apple.x = Math.floor(Math.random() * hSize)
    apple.y = Math.floor(Math.random() * vSize)

    for (let segment of tail) {
        if (segment.x === apple.x && segment.y === apple.y) {
            spawnApple()
        }
    }
}

function tick() {
    tail.push({
        x: snake.x,
        y: snake.y
    })
    while (tail.length > size) {
        tail.shift()
    }

    speed.x = inputSpeed.x
    speed.y = inputSpeed.y

    snake.x += speed.x
    snake.y += speed.y

    if (snake.x === -1) {
        snake.x = hSize - 1
    }
    if (snake.x === hSize) {
        snake.x = 0
    }
    if (snake.y === -1) {
        snake.y = vSize - 1
    }
    if (snake.y === vSize) {
        snake.y = 0
    }

    for (let segment of tail) {
        if (segment.x === snake.x && segment.y === snake.y) {
            gameOver()
        }
    }

    if (snake.x === apple.x && snake.y === apple.y) {
        size++
        spawnApple()
    }
}

function drawScene() {
    clear()
    drawGrid()
    rect(snake.x, snake.y, 'orange')
    for (let segment of tail) {
        rect(segment.x, segment.y, 'green')
    }
    rect(apple.x, apple.y, 'red')
}

function main() {
    tick()
    drawScene()
}

function gameOver() {
    clearInterval(timer)
    const choice = confirm(`Game Over!\nYour score: ${(size - 3) * 100}\n\n`)

    if (choice === true) {
        start()
    }
}

function start() {
    snake.x = 10
    snake.y = 10
    tail.length = 0
    size = 3
    speed.x = 1
    speed.y = 0
    inputSpeed.x = 1
    inputSpeed.y = 0

    spawnApple()
    timer = setInterval(main, 100)
}

start()