var numSquares = 8;
var colors = [];
var pickedColor;
var score = 0;
var over = false;
var ceiling = 1;
var clicks = 0;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var body = document.body.style.backgroundColor;
var message = document.getElementById("message");
var scoreValue = document.getElementById("scoreValue");
var hScore = document.getElementById("hscore");
var h1 = document.querySelector("h1");
var h2 = document.querySelector("h2");
var newColor = document.getElementById("newColor");
var modeButtons = document.querySelectorAll(".mode");
var highscore = localStorage.getItem("highscore");

init();

hScore.textContent = highscore;


function init() {

    setupButtons();
    setupSquares();
    reset();

}
//either this is the first time I play (then highscore is null), 
//or we have played before in this browser and highscore is already a number.
function hiScore() { 
  if (highscore === null || score > highscore) {
        localStorage.setItem("highscore", score);
    }
}

function falseGuess() {
    if (score <= 0) {
        reset();
        newColor.textContent = "Play Again";
        message.textContent = "Game Over";
        h1.style.background = "red";
        h2.style.background = "red";
        hScore.textContent = highscore;

    } else {
        reset()
        score--;
        scoreValue.textContent = score;
        message.textContent = "Try Again";

    }
    clicks = 0;


}

function setupSquares() {
    // Apply Colors to the Squares
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
        squares[i].addEventListener("click", function() { // Game logic
            var clickedColor = this.style.background;
            clicks++;
            if (clickedColor === pickedColor) { // TRUE
                changeColors(clickedColor);
                message.textContent = "Correct!";
                h1.style.background = clickedColor;
                h2.style.background = clickedColor;
                newColor.textContent = "Keep Playing";
                if (over == false) {
                    score++;
                    scoreValue.textContent = score;
                    over = true;
                    if (score == ceiling) {
                        over = true;
                    }
                    hiScore();
                }

            } else if (clicks % 3 == 0) { // FALSE
                falseGuess();
            } else { // SQUAE FADE
                message.textContent = "Try Again";
                this.style.background = "#232323";
            }
        });
    }
}

function setupButtons() {

    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                numSquares = 6;
                score = 0;
            } else {
                numSquares = 8;
                score = 0;
            }
            reset();
        });
    }
}

function reset() {
    colors = randomColors(numSquares);
    // pick a new random color form array
    pickedColor = pickColor();
    // change color display to match picked color
    colorDisplay.textContent = pickedColor;
    newColor.textContent = "New Colors";
    message.textContent = ""; // Remove the Correct message when Cl
    clicks = 0;
    over = false;
    scoreValue.textContent = score;
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.background = "none";
        }
    }
    h1.style.background = "steelblue"; // Set H1 Background Color to Black
    h2.style.background = "steelblue"; // Set H1 Background Color to Black
}


//Reset colors Button
newColor.addEventListener("click", function() {
    reset();
});


// Changes all the Squares into the same color
function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
}

// Pick a Random number from the Color Array to be the Color solution
function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// Generate  RGB Color Codes
function rgbGen() {

    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb" + "(" + r + ", " + g + ", " + b + ")";
}

// Generate a Bunch of RGB codes and push them to colors array
function randomColors(num) {
    arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(rgbGen());
    }
    return arr;
}
