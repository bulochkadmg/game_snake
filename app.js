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

// block builder
let Block = function(col, row) {
    this.col = col;
    this.row = row;
};

Block.prototype.drawSquare = function(color) {
    let x = this.col * blockSize,
        y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
};

Block.prototype.drawCircle = function(color) {
    let centerX = this.col * blockSize + blockSize / 2,
        centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
};

Block.prototype.equal = function(otherBlocks) {
    return this.col === otherBlocks.col && this.row === otherBlocks.row;
};

// create and draw snake
let Snake = function() {
    this.segments = [
        new Block(7, 5),
        new Block(6,5),
        new Block(5, 5)
    ];

    this.direction = 'right';
    this.nextDirection = 'right';
};

Snake.prototype.draw = function() {
    for(let j = 0; j < this.segments.length; j++) {
        this.segments[j].drawSquare('Blue');
    }
};