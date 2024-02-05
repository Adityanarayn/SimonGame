// alert("this is the simon game !!");

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];

var started = false ;
var level=0;



$(document).keypress(function() {
   if (!started){
    
    $("#level-title").text("level: "+level);
    nextSequence();

    started= true;
    $(".btn").click(function() {
        var userChosenColor = $(this).attr("id");// this will get the attribute id from the this object
        flashColor(userChosenColor);
        animatePress(userChosenColor);
        

        // playAudio(userChosenColor);
        var audio= new Audio(`./sounds/${userChosenColor}.mp3`);
        audio.play();
        userClickedPattern.push(userChosenColor);
        console.log("this is the user choice: "+userClickedPattern)
        checkAnswer(userClickedPattern.length-1)
    });

   }
});



function nextSequence() {
    level++;
    $("#level-title").text("level: "+level);
    var randomNumber = Math.floor(Math.random() * buttonColors.length); // Use the length of the array
    var randomChosenColor =buttonColors[randomNumber]; // Return a color from buttonColors array
    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // this is used to flash the chosen color and it will asign the id 
    var audio= new Audio(`./sounds/${randomChosenColor}.mp3`);
    audio.play();
    console.log("this is the gamePattern: "+gamePattern);
    // checkAnswer(userClickedPattern.length-1);

}

function animatePress(currentColor) {
    $("#"+currentColor).toggleClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).toggleClass("pressed");
    },100);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                userClickedPattern = []; // Clear the user's pattern before starting the next sequence
                nextSequence();
            }, 1000);
        }
        console.log("success");
    } else {
        console.log("Fail");
        let failAudio = new Audio("./sounds/wrong.mp3");
        failAudio.play();
        $("body").toggleClass("game-over");
        setTimeout(function () {
            $("body").toggleClass("game-over");
        }, 200);
        $("h1").text("Game-Over");
        setTimeout(function () {
            startOver();
        }, 500);
    }
}


function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
    location.reload(true);

    
}




function flashColor(buttonClicked) {
    $(`#${buttonClicked}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // this function will flash the color for the clicked button
}




