var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var body = document.body.style.backgroundColor;
var message = document.getElementById("message");
var h1 = document.querySelector("h1");
var newColor = document.getElementById("newColor");
var modeButtons = document.querySelectorAll(".mode");


init ();

function init (){

	setupButtons();
	setupSquares();
	reset();
}

function setupSquares(){
	// Apply Colors to the Squares
	for( var i = 0; i < squares.length; i++){
		squares[i].style.background = colors[i];
		squares[i].addEventListener("click", function(){ // Game logic
				var clickedColor = this.style.background;
				if ( clickedColor === pickedColor) {
					changeColors(clickedColor);
					message.textContent = "Correct!";
					h1.style.background = clickedColor;
					newColor.textContent = "Play Again?";
				}
				else {

					message.textContent = "Try Again!";
					this.style.background = "#232323";
				}
		});
}
}

function setupButtons(){
	
		for (var i = 0; i < modeButtons.length; i++){
	    modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		// if this text content is equal to easy then numsquares = 3 otherwise numsuares is equal to 6
		this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
		reset();
	});
}
}

function reset(){
		colors = randomColors(numSquares);
		// pick a new random color form array
		pickedColor = pickColor();
		// change color display to match picked color
		colorDisplay.textContent = pickedColor;
		newColor.textContent = "New Colors";
		message.textContent = ""; // Remove the Correct message when Cl
		for( var i = 0; i < squares.length; i++){
			if (colors[i]){
			   squares[i].style.background = colors[i];
			} else {
			   squares[i].style.background ="none";
			}
		}
	h1.style.background = "steelblue"; // Set H1 Background Color to Black
}

//Reset colors Button
newColor.addEventListener("click",function(){
 reset();
});

// Changes all the Squares into the same color
 function changeColors(color){
 	for (var i = 0; i < squares.length; i++) {
 		squares[i].style.background = color;
 	}
 }

// Pick a Random number from the Color Array to be the Color solution
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// Generate  RGB Color Codes
function rgbGen(){	

	var r = Math.floor(Math.random() * 256);	
	var g = Math.floor(Math.random() * 256);	
	var b = Math.floor(Math.random() * 256);	
 	return "rgb" + "(" + r + ", " + g + ", " + b + ")";
}

// Generate a Bunch of RGB codes and push them to colors array
function randomColors(num){
	arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(rgbGen());
	}
	return arr;
}



