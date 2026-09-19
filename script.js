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

