var canvas;
var canvasContext;
const fps = 60;

// X, Y, speedX, speedY
var balls = [ [75, 75, 10, 10], [125, 125, 12, 12] ];

var speedmultiplier = 1;

var paddle1Y = 250, paddle2Y = 250;
const PADDLE_H = 100, PADDLE_W = 10, COMP_PADDLE_SPEED = 13, EDGE = 25;
const offset = 265;

const WIN = 11;
var showWinScreen = true;
var combo = 0, p1score = 0, p2score = 0;

window.onload = function() {	
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
        
    canvas.addEventListener('mousedown', handleMouseClick);
        
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = calcMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_H/2) + offset;
    });

    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/fps);
    
    canvasContext.textAlign = 'center';
    canvasContext.font = "48px Consolas";
}

function calcMousePos(evt) {
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;		
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function handleMouseClick(evt) {
    if (showWinScreen) {
        p1score = 0;
        p2score = 0;
        showWinScreen = false;
    }
}

function moveCompPaddle() {
    var paddle2center = paddle2Y + (PADDLE_H / 2);
    
    if (combo >= 5 && (balls[1][0] - balls[0][0] > 0)) {
        if (balls[1][1] > paddle2center + (PADDLE_H / 2)) {
            paddle2Y += COMP_PADDLE_SPEED;
        } else if (balls[1][1] < paddle2center - (PADDLE_H / 2)) {
            paddle2Y -= COMP_PADDLE_SPEED;
        }
    } else {
        if (balls[0][1] > paddle2center + (PADDLE_H / 2)) {
            paddle2Y += COMP_PADDLE_SPEED;
        } else if (balls[0][1] < paddle2center - (PADDLE_H / 2)) {
            paddle2Y -= COMP_PADDLE_SPEED;
        }
    }
    
}

function ballReset(num) {
    if (p1score >= WIN || p2score >= WIN) {
        showWinScreen = true;
    }
    balls[num][0] = canvas.width/2;
    balls[num][1] = canvas.height/2;
    balls[num][2] = -6;
    balls[num][3] = 6;
    speedmultiplier = 1;
    combo = 0;
}	

function moveEverything() {
    if (showWinScreen) {
        return;
    }
    
    moveCompPaddle();

    var x = 0;
    do {
        if (balls[x][0] <= PADDLE_W + EDGE) {
            if (balls[x][1] > paddle1Y && balls[x][1] < paddle1Y + PADDLE_H) {
                combo++;
                balls[x][2] *= -1;
                balls[x][3] = (balls[x][1] - (paddle1Y + PADDLE_H / 2)) * 0.35;
                // speedmultiplier *= 1.05;
                // balls[x][2] = 6 * speedmultiplier;
            } else if (balls[x][0] < 0) {
                p2score++;
                ballReset(x);
            }
        }

        if (balls[x][0] >= canvas.width - PADDLE_W - EDGE) {
            if (balls[x][1] > paddle2Y && balls[x][1] < paddle2Y + PADDLE_H) {
                balls[x][2] *= -1;
                var deltaY = balls[x][1] - (paddle2Y + PADDLE_H / 2);
                balls[x][3] = deltaY * 0.35;
            } else if (balls[x][0] > canvas.width) {
                p1score++;
                ballReset(x);
            }
        }
        x++;
    } while (x < balls.length && combo >= 5);

    var y = 0;
    do {
        balls[y][0] += balls[y][2];
        balls[y][1] += balls[y][3];
        if (balls[y][1] < 0 || balls[y][1] > canvas.height) {
            balls[y][3] *= -1;
        }
        y++;
    } while (y < balls.length && combo >= 5);
} 

function colourRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColour) {
    canvasContext.beginPath();
    canvasContext.fillStyle = fillColour;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
    canvasContext.fill();
}

function colourCirc(centerX, centerY, radius, fillColour){
    canvasContext.beginPath();
    canvasContext.fillStyle = fillColour;
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colourText(words, posX, posY, fillColour) {
    canvasContext.beginPath();
    canvasContext.fillStyle = fillColour;
    canvasContext.fillText(words, posX, posY);
    canvasContext.fill();
}

function drawEverything() {
    // Clear game view by filling it black
    colourRect(0, 0, canvas.width, canvas.height, 'black');

    // Show WIN screen
    if (showWinScreen) {
        if (p1score == WIN) {
            colourText("LEFT WINS",canvas.width/2,(canvas.height/2) - 50,'white');
        } else if (p2score == WIN) {
            colourText("RIGHT WINS",canvas.width/2,(canvas.height/2) - 50,'white');
        }
        colourText("Click to play!", canvas.width/2, (canvas.height/2)+50, 'white');
    } else {
        // Draw player 1 paddle
        colourRect(EDGE, paddle1Y, PADDLE_W, PADDLE_H, 'red');

        // Draw player 2 paddle
        colourRect(canvas.width - PADDLE_W - EDGE, paddle2Y, PADDLE_W, PADDLE_H, 'blue');
    
        // Draw pong balls
        var x = 0;
        do {
            colourCirc(balls[x][0], balls[x][1], 10, 'white');
            x++;
        } while (x < balls.length && combo >= 5);
    
        // Draw dotted line
        for (i = 10; i < canvas.height; i += 40) {
            colourRect(canvas.width/2, i, 2, 20, 'white');
        }
    }

// Draw some text
    canvasContext.fillText(p1score, (canvas.width/2)-50, 50);
    canvasContext.fillText(p2score, (canvas.width/2)+50, 50);
    canvasContext.fillText(combo, 50, canvas.height-50);canvasContext.fillText(combo, 50, canvas.height-50);
}