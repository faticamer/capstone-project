var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = true;

// keydown event listener
$(document).keydown(function () {
    $("#level-title").text("Level " + level);
    if(started) {
        nextSequence();
        started = false;
    }
})

// button click event listener
$(".btn").on("click", function () {    

    var userChosenColor = $(this).attr("id");    
    userClickedPattern.push(userChosenColor);    

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

// function that generates a random number that corresponds to one of the colors and adds it 
// to the gamePattern array
function nextSequence () {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    console.log(gamePattern);
}

// play sound when button is pressed
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

// apply animation when button is pressed
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass('pressed');        
    }, 100);
}

// function that checks whether user prompted valid input
function checkAnswer(currentLevel) {    
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");        
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence(); // Call nextSequence() only if pattern is finalized                
            }, 1000);
        }
    }
    // Execute when user misses a combination
    else {
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("h1").text("Game Over, Press Any Key To Restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

// function to reset the progress of the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = true;
}