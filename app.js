// create variables
let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width,
    height = canvas.height;


// divide the canvas into blocks
let blockSize = 10,
    widthInBlocks = width / blockSize,
    heightInBlocks = height / blockSize;