var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var lvl = 0;

var toggle = 0;

function nextSequence(){
    userClickedPattern = [];

    toggle++;

    lvl++;
    $("#level-title").text("Level "+ lvl);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    
}

$(".btn").on("click",function(){
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {

    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);

}

$(document).keypress(function(){

    $("h1").text("Level " + lvl);
    if(toggle === 0){
        nextSequence();
    }
    
});

function checkAnswer(currentLvl){

    if(gamePattern[currentLvl] === userClickedPattern[currentLvl]){
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        restart();
        
        // console.log("Wrong");
    }
}


function restart(){
    lvl = 0;
    gamePattern = [];
    toggle = 0;
}