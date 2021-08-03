// create variables
let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width,
    height = canvas.height;


// divide the canvas into blocks
let blockSize = 10,
    widthInBlocks = width / blockSize,
    heightInBlocks = height / blockSize;

// Game score
let score = 0;

// drawing the borders
let drawBorder = function() {
    ctx.fillStyle = 'Gray';
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};

// draw score
let drawScore = function() {
    ctx.font = '20px Courier';
    ctx.fillStyle = 'Black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Score: ' + score, blockSize, blockSize);
};

// setInterval for animation game
let intervalId = setInterval(function() {
    ctx.clearRect(0, 0, width, height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
}, 100);

// game over
let gameOver = function() {
    clearInterval(intervalId);
    ctx.font = '60px Courier';
    ctx.fillStyle = 'Black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game Over', width / 2, height / 2);
};