let board;
let boardWidth = 500;
let boardHeight = 700;
let context;

let playerWidth = 80;
let playerHeight = 10;
let playerVelocityX = 6;

let player = {
    x: boardWidth / 2 - playerWidth / 2,
    y: boardHeight - playerHeight - 5,
    width: playerWidth,
    height: playerHeight,
    velocityX: playerVelocityX,
    movingLeft: false,  // Track movement state
    movingRight: false
};

let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 3;
let ballVelocityY = 3;

let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY
};

//blocks
let blockArray = []
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8;
let blockRows = 5;
let blockMaxRows = 13;
let blockCount = 0;

//score
let score = 0;
let level = 1;

//game-over
let gameOver = false;

//starting block corner
let blockX = 15;
let blockY = 45;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    requestAnimationFrame(update);

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    createBlocks();
};

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, boardWidth, boardHeight);

    // Move player smoothly
    if (player.movingLeft && player.x > 0) {
        player.x -= player.velocityX;
    }
    if (player.movingRight && player.x + player.width < boardWidth) {
        player.x += player.velocityX;
    }

    // Draw player
    context.fillStyle = "black";
    context.fillRect(player.x, player.y, player.width, playerHeight);

    // Move ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Draw ball
    context.fillStyle = "red";
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // Bounce ball off walls
    if (ball.y <= 0) {
        ball.velocityY *= -1;
    }
    if (ball.x <= 0 || ball.x + ball.width >= boardWidth) {
        ball.velocityX *= -1;
    }
    if (ball.y + ball.height >= boardHeight) {
        gameOver = true;
        context.font = "bold 40px Arial Black";
        context.fillStyle = "red";
        context.textAlign = "center";

        // Game Over text
        context.fillText("GAME OVER", boardWidth / 2, boardHeight / 2 - 20);

        // Restart prompt
        context.font = "20px Arial";
        context.fillStyle = "white";
        context.fillText("Press 'R' to Restart", boardWidth / 2, boardHeight / 2 + 30);
    }

    // Bounce ball off player paddle
    if (topCollision(ball, player) || bottomCollision(ball, player)) {
        let hitLeftHalf = ball.x + ball.width / 2 < player.x + player.width / 2;

        if (hitLeftHalf) {
            ball.velocityX *= -1;
        }

        ball.velocityY *= -1;
    }
    if (rightCollision(ball, player) || leftCollision(ball, player)) {
        ball.velocityX *= -1;
    }

    // Draw blocks
    context.fillStyle = "black";
    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            if (topCollision(ball, block) || bottomCollision(ball, block)) {
                block.break = true;
                ball.velocityY *= -1;
                blockCount -= 1;
                score += 1;
            } else if (rightCollision(ball, block) || leftCollision(ball, block)) {
                block.break = true;
                ball.velocityX *= -1;
                blockCount -= 1;
                score += 1;
            }
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }

    // Update the score, blocks, and level in the sidebar
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("blocks").innerText = `Blocks: ${blockCount}`;
    document.getElementById("level").innerText = `Level: ${level}`;

    // Check if level 5 is reached
    if (level === 5) {
        gameOver = true;
        context.font = "bold 40px Arial Black";
        context.fillStyle = "green";
        context.textAlign = "center";

        // Win screen
        context.fillText("YOU WIN!", boardWidth / 2, boardHeight / 2 - 20);

        // Restart prompt
        context.font = "20px Arial";
        context.fillStyle = "white";
        context.fillText("Press 'R' to Restart", boardWidth / 2, boardHeight / 2 + 30);

        return; // Stop the game loop when the player wins
    }

    // Increase level after clearing all blocks
    if (blockCount === 0) {
        level++;

        // Increase ball velocity after every level
        ball.velocityX *= 1.1;
        ball.velocityY *= 1.1;

        // Add a row of blocks per level, up to blockMaxRows
        if (blockRows < blockMaxRows) {
            blockRows++;
        }

        createBlocks();
    }
}

function keyDownHandler(e) {
    if (e.code === "ArrowLeft") {
        player.movingLeft = true;
    } else if (e.code === "ArrowRight") {
        player.movingRight = true;
    }
    else if (e.code === "KeyR" && gameOver) { // Restart game on "R"
        restartGame();
    }
}

function keyUpHandler(e) {
    if (e.code === "ArrowLeft") {
        player.movingLeft = false;
    } else if (e.code === "ArrowRight") {
        player.movingRight = false;
    }
}

// Collision detection functions
function detectCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function topCollision(ball, block) {
    return detectCollision(ball, block) && ball.y + ball.height >= block.y;
}

function bottomCollision(ball, block) {
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}

function leftCollision(ball, block) {
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}

function rightCollision(ball, block) {
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}

function createBlocks() {
    blockArray = [];
    for (i = 0; i < blockColumns; i++) {
        for (j = 0; j < blockRows; j++) {
            let block = {
                x: blockX + i * blockWidth + i * 10,
                y: blockY + j * blockHeight + j * 10,
                width: blockWidth,
                height: blockHeight,
                break: false
            };
            blockArray.push(block);
        }
    }
    blockCount = blockArray.length;
}

function restartGame() {
    gameOver = false;

    player.x = boardWidth / 2 - playerWidth / 2;
    player.movingLeft = false;
    player.movingRight = false;

    ball.x = boardWidth / 2;
    ball.y = boardHeight / 2;
    ball.velocityX = ballVelocityX;
    ball.velocityY = ballVelocityY;

    score = 0;
    level = 1;
    blockRows = 5;
    createBlocks();

    context.clearRect(0, 0, boardWidth, boardHeight);
}