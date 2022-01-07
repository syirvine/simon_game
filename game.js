var gamePattern = []; // Used to append a random colour and build a sequence
var userClickedPattern = []; // Used to store the user's selected patern
const buttonColours = ["red", "blue", "green", "yellow"]; // The possible coulours/buttons
var numberOfButtons = $(".btn").length;
var gameStarted = "n"
var level = 0



$(document).on("keypress touchstart", function(e) { // Starts the game on a key being pressed
  e.preventDefault();
  while (gameStarted == "n") {
    $("#level-title").html("Level " + String(level));
    nextSequence();
    gameStarted = "y"; // Once a game is started, pressing any button no longer has an effect
  }
});


for (var i = 0; i < numberOfButtons; i++) {
  $(".btn")[i].addEventListener("click", function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });
}



function nextSequence() {

  var randomNumber =  Math.floor(Math.random() * 4); // Random number between 0 & 3
  var randomChosenColour = buttonColours[randomNumber]; // Chosing a random colour/button
  gamePattern.push(randomChosenColour); // Appending it to the gamePattern array

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // Make the button 'flash'
  playSound(randomChosenColour);
  level = level + 1;
  $("#level-title").html("Level " + String(level));

}



function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if(userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  }
  else {
    var audio = new Audio("sounds/wrong.mp3"); // Play a sound to indicate a wrong answer
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").html("Game Over, Press Any Key or Touch Screen to Restart");

    startOver();
  }

}



function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = "n";
}



function animatePress(currentColour) { // Animates a button being pressed
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
           $("#" + currentColour).removeClass("pressed");
   }, 100);
}



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // Play the sound corresponding to the button
  audio.play();
}
