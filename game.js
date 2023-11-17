let gamePattern = []
let userPattern = []
const buttonColors = ["red", "blue", "green", "yellow"]
let keyPressed = false
let level = 0

document.addEventListener("keydown", () => {
    if (!keyPressed) {
        $("h1").text("Level " + level)
        nextSequence()
        keyPressed = true
    }
})

$(".btn").click(function () {
    var userClickedColor = $(this).attr("id")
    userPattern.push(userClickedColor)
    playsound(userClickedColor)
    animatePress(userClickedColor)
    checkAnswer(userPattern.length - 1)
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (gamePattern.length === userPattern.length) {
            // $("h1").text("Loading the first " + level + "sequence")
            // showSequence()
            setTimeout(function () {
                nextSequence()
            }, 1000);
        }
    }
    else {
        playsound("wrong")
        $("h1").text("Game Over, Press Any Key to Restart")
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 100)
        startOver()
    }

}

function showSequence() {
    for (let i = 0; i < gamePattern.length; i++) {
        $(`#` + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100)
        playsound(gamePattern[i])
    }
}
function nextSequence() {
    userPattern = []
    level++
    $("h1").text("Level " + level)
    const num = Math.floor(Math.random() * 4)
    const randomChosenColor = buttonColors[num]
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playsound(randomChosenColor)
}

function animatePress(color) {
    $("#" + color).addClass("pressed")
    setTimeout(() => {
        $("#" + color).removeClass("pressed")
    }, 100);
}
function playsound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`)
    audio.play()
}

function startOver() {
    keyPressed = false
    level = 0
    gamePattern = []
}