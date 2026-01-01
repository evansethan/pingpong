const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startX = canvas.width / 2;
const startY = 70;
const ddy = 0.25;
let gameStarted = false

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
}

let ballsList = [];

function randomColor() {
    const randomColor = Math.floor(Math.random() * 16777215);
    let hexColor = randomColor.toString(16);
    hexColor = hexColor.padStart(6, '0');
    return `#${hexColor}`;
}


function addBall(x, y) {
    let size = Math.floor(Math.random() * 10) + 11
    let direction = -2
    if (Math.random() > 0.5) {
        direction = 2
    }
    let newBall = new Ball(x, y, direction, -10, size, randomColor())
    ballsList.push(newBall)
}


function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < ballsList.length; i++){
        ball = ballsList[i];
        if (ball.x > canvas.width - ball.radius || ball.x < ball.radius) {
            ball.dx = -ball.dx;
            if (ball.x < ball.radius) {
                ball.x = ball.radius;
            } else {
                ball.x = canvas.width - ball.radius;
            }
        }
        if (ball.y > canvas.height - ball.radius /*ball.y < ball.radius*/) { //could close top
            ball.dy = -ball.dy;
            if (ball.y < ball.radius) { 
                ball.y = ball.radius;
            } else {
                ball.y = canvas.height - ball.radius;
            }
        }
        ctx.fillStyle = ball.color;
        drawBall(ball)
        ball.dy += ddy;
        ball.x += ball.dx;
        ball.y += ball.dy;
    }
}

function startGame() {
    gameStarted = true;
    setInterval(draw, 10);
}

const runButton = document.getElementById("runButton");
runButton.addEventListener("click", () => {
    startGame();
    runButton.disabled = true;
});


canvas.addEventListener('click', function(event) {
    if (gameStarted) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        addBall(x, y);
    }
});