const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

// Player configuration
let player = { x: 50, y: 300, width: 40, height: 60, color: 'red', speed: 5, score: 0 };

// Opponent configuration
let opponent = { x: 700, y: 300, width: 40, height: 60, color: 'blue', speed: 3, score: 0 };

let keys = {};
let gameRunning = false;

// Music setup
const music = new Audio('south_africa_music.mp3');
music.loop = true;

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (gameRunning && e.key === 'Enter') music.play();
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Draw player and opponent
function drawEntity(entity) {
    ctx.fillStyle = entity.color;
    ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
}

// Update positions
function updateEntities() {
    if (keys['ArrowRight']) player.x += player.speed;
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['w'] && opponent.y > 0) opponent.y -= opponent.speed;
    if (keys['s'] && opponent.y < canvas.height - opponent.height) opponent.y += opponent.speed;
}

// Check for collisions and scoring
function checkScore() {
    if (player.x >= canvas.width - player.width) {
        player.score++;
        resetPositions();
    } else if (opponent.x <= 0) {
        opponent.score++;
        resetPositions();
    }
}

// Reset positions
function resetPositions() {
    player.x = 50;
    opponent.x = 700;
}

// Game loop
function gameLoop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEntity(player);
    drawEntity(opponent);
    updateEntities();
    checkScore();
    ctx.fillStyle = 'white';
    ctx.fillText(`Player Score: ${player.score}`, 50, 20);
    ctx.fillText(`Opponent Score: ${opponent.score}`, 650, 20);
    requestAnimationFrame(gameLoop);
}

// Start game
document.getElementById('startGame').addEventListener('click', () => {
    gameRunning = true;
    music.play();
    gameLoop();
});
