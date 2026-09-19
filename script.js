// Game settings
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("final-score");
const gameOverScreen = document.getElementById("game-over");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

// Game variables
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake;
let food;
let direction;
let nextDirection;
let score;
let gameRunning = false;
let gameLoop;
let speed = 120;

// Start game
function startGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };

    score = 0;
    speed = 120;

    scoreElement.textContent = score;
    gameOverScreen.classList.add("hidden");

    gameRunning = true;

    createFood();

    clearInterval(gameLoop);
    gameLoop = setInterval(updateGame, speed);

    drawGame();
}

// Update game
function updateGame() {
    direction = nextDirection;

    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    // Check wall collision
    if (
        head.x < 0 ||
        head.x >= tileCount ||
        head.y < 0 ||
        head.y >= tileCount
    ) {
        endGame();
        return;
    }

       // Check self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }

    snake.unshift(head);

    // Check if food was eaten
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;

        createFood();

         // Make the game faster
        if (speed > 50) {
            speed -= 5;
            clearInterval(gameLoop);
            gameLoop = setInterval(updateGame, speed);
        }
    } else {
        snake.pop();
    }

    drawGame();
}

// Draw everything
function drawGame() {
    // Background
    ctx.fillStyle = "#1f2937";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid();

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#4ade80" : "#22c55e";

        ctx.fillRect(
            segment.x * gridSize + 1,
            segment.y * gridSize + 1,
            gridSize - 2,
            gridSize - 2
        );
    });

     // Draw food
    ctx.fillStyle = "#ef4444";

    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// Draw grid
function drawGrid() {
    ctx.strokeStyle = "#293548";
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}









