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

// game over
let gameOver = function() {
    clearInterval(intervalId);
    ctx.font = '60px Courier';
    ctx.fillStyle = 'Black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game Over', width / 2, height / 2);
};

// draw circle
let circle = function(x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if(fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
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

// Snake move
Snake.prototype.move = function() {
    let head = this.segments[0],
        newHead;
    
    this.direction = this.nextDirection;

    if(this.direction === 'right') {
        newHead = new Block(head.col + 1, head.row);
    } else if(this.direction === 'down') {
        newHead = new Block(head.col, head.row + 1);
    } else if(this.direction === 'left') {
        newHead = new Block(head.col - 1, head.row);
    } else if(this.direction === 'up') {
        newHead = new Block(head.col, head.row - 1);
    }

    if(this.checkCollision(newHead)) {
        gameOver();
        return;
    }

    this.segments.unshift(newHead);

    if(newHead.equal(apple.position)) {
        score++;
        apple.move();
    } else {
        this.segments.pop();
    }
};

Snake.prototype.checkCollision = function(head) {
    let leftCollision = (head.col === 0),
        topCollision = (head.row === 0),
        rightCollision = (head.col === widthInBlocks - 1),
        bottomCollision = (head.row === heightInBlocks - 1),
        wallCollision = leftCollision || topCollision || rightCollision || bottomCollision,
        selfCollision = false;

    for(let i = 0; i < this.segments.length; i++) {
        if(head.equal(this.segments[i])) {
            selfCollision = true;
        }
    }

    return wallCollision || selfCollision;
};

let directions = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

$('body').keydown(function(event) {
    let newDirection = directions[event.keyCode];
    if(newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
});

Snake.prototype.setDirection = function(newDirection) {
    if(this.direction === 'up' && newDirection === 'down') {
        return;
    } else if(this.direction === 'right' && newDirection === 'left') {
        return;
    } else if(this.direction === 'down' && newDirection === 'up') {
        return;
    } else if(this.direction === 'left' && newDirection === 'right') {
        return;
    }

    this.nextDirection = newDirection;
};

// create apple
let Apple = function() {
    this.position = new Block(10, 10);
};

Apple.prototype.draw = function() {
    this.position.drawCircle('LimeGreen');
};

// move apple
Apple.prototype.move = function(occupiedBlocks) {
    let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1,
        randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) +1;
    this.position = new Block(randomCol, randomRow);

    for (var m = 0; m < occupiedBlocks.length; m++) {
        if (this.position.equal(occupiedBlocks[m])) {
          this.move(occupiedBlocks);
          return;
        }
      }
};

// setInterval for animation game and create snake, apple
let snake = new Snake(),
    apple = new Apple();

let intervalId = setInterval(function() {
    ctx.clearRect(0, 0, width, height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
}, 100);