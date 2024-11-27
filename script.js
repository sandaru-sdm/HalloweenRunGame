var boy = document.getElementById("boy");
var background = document.getElementById("background");
var scoreTag = document.getElementById("score");
var score = 0;

var boyRunAnimationStartId = 0;
var backgroundAnimationStartId = 0;
var boyRunStatus = false;

var boyIdleAnimationStartId = 0;

function start() {
    boyIdleAnimationStartId = setInterval(boyIdleAnimation, 100);
    objectAnimation();
}

function backgroundAnimation() {
    if (boyRunStatus == false) {
        backgroundAnimationStartId = setInterval(bg, 100);
    }
}

function boyRunAnimationStart() {
    if (boyRunStatus == false) {
        boyRunAnimationStartId = setInterval(run, 100);
        clearInterval(boyJumpAnimationStartId);
        RunAudio.play();
    }
}

var boyPositionX = 0;
var boyPositionY = 0;
var bgPositionX = 0;

function run() {
    clearInterval(boyIdleAnimationStartId);

    boyPositionY = -564;
    boy.style.backgroundPositionY = boyPositionY + "px";
    boyPositionX = boyPositionX - 614;
    boy.style.backgroundPositionX = boyPositionX + "px";

    boyRunStatus = true;
    boyJumpAnimationStatus = false;
    boyDeadAnimationStatus = false;

}
var RunAudio = new Audio("Run.mp3");
var JumpAudio = new Audio("jump.mp3");
var GameOver = new Audio("gameover.mp3");

function bg() {
    bgPositionX = bgPositionX - 20;
    background.style.backgroundPositionX = bgPositionX + "px";

    score = score + 10;
    scoreTag.innerHTML = score;
}

function boyIdleAnimation() {
    boyPositionY = 0;
    boy.style.backgroundPositionY = boyPositionY + "px";
    boyPositionX = boyPositionX - 614;
    boy.style.backgroundPositionX = boyPositionX + "px";
    boyJumpAnimationStatus = false;
}

function eventHandling(event) {
    var keyCode = event.which;
    if (keyCode == 32) {
        //Space
        if (!boyJumpAnimationStatus) {
            boyJumpAnimationStart();

            if (boyRunStatus) {
                JumpAudio.play();
                RunAudio.volume("10");
            }
        }
    }

    if (keyCode == 13) {
        //Enter
        if (!boyRunStatus) {
            boyRunAnimationStart();
            backgroundAnimation();
            objectAnimationStart();
        }
    }

    // if (keyCode == 68) {
    //     //D
    //     if (!boyDeadAnimationStatus) {
    //         boyDeadAnimationStart();
    //     }
    // }

    if (keyCode == 27) {
        //Esc
        location.reload();
    }
}

var boyJumpAnimationStatus = false;
var boyMarginTop = 0;
var boyRunId = 0;

function boyJumpAnimation() {
    boyPositionX = boyPositionX - 614;
    boy.style.backgroundPositionX = boyPositionX + "px";
    boyPositionY = -1128;
    boy.style.backgroundPositionY = boyPositionY + "px";

    if (boyPositionX == -1228) {
        boy.style.marginTop = -20 + "px";
        boyMarginTop = parseInt(boy.style.marginTop);
    } else if (boyPositionX == -7368) {
        boy.style.marginTop = 70 + "px";
        boyMarginTop = parseInt(boy.style.marginTop);
    } else if (boyPositionX == -9210) {
        clearInterval(boyJumpAnimationStartId);
        boyRunId = setInterval(run, 100);
        boyJumpAnimationStatus = false;
        boyRunStatus = true;
    }
}

var boyJumpAnimationStartId = 0;

function boyJumpAnimationStart() {
    if (boyRunStatus == true) {
        if (boyJumpAnimationStatus == false) {

            clearInterval(boyRunId);
            clearInterval(boyRunAnimationStartId);
            clearInterval(boyIdleAnimationStartId);

            boyPositionX = 0;

            boyJumpAnimationStartId = setInterval(boyJumpAnimation, 100);

            boyJumpAnimationStatus = true;

            // RunAudio.pause();
        }
    }
}

var boyDeadAnimationStartId = 0;
var boyDeadAnimationStatus = false;

function boyDeadAnimationStart() {
    clearInterval(boyRunAnimationStartId);
    clearInterval(boyJumpAnimationStartId);
    clearInterval(boyIdleAnimationStartId);
    clearInterval(backgroundAnimationStartId);
    clearInterval(objectAnimationStartId);
    clearInterval(objectMoveId);
    clearInterval(boyRunId);

    boyPositionX = 0;

    boyDeadAnimationStartId = setInterval(function boyDeadAnimation() {
        if (boyPositionX == -9210) {
            // alert("fuck " + boyPositionX);
            clearInterval(boyDeadAnimationStartId);
            // start();
            RunAudio.pause();
            GameOver.play();
            AllRemove();
        }
        boyPositionY = -1692;
        boy.style.backgroundPositionY = boyPositionY + "px";
        boyPositionX = boyPositionX - 614;
        boy.style.backgroundPositionX = boyPositionX + "px";

    }, 100);
    boyDeadAnimationStatus = true;
}

function AllRemove() {
    clearInterval(boyRunAnimationStartId);
    clearInterval(boyJumpAnimationStartId);
    clearInterval(backgroundAnimationStartId);
    clearInterval(objectAnimationStartId);
    clearInterval(objectMoveId);
    clearInterval(boyRunId);
    clearInterval(boyDeadAnimationStartId);

    document.getElementById("object").remove();
    document.getElementById("boy").remove();
    var h = document.createElement("h1");
    document.body.appendChild(h);
    document.getElementById("background").remove();
    h.innerHTML = "Game Over : " + score;
    h.className = "gameOver";
    document.getElementById("score").remove();
    h.style.textAlign = "center";

    var h3 = document.createElement("h3");
    document.body.appendChild(h3);
    h3.innerHTML = "Press Esc for new Game"
    h3.className = "newGame";
}

var objectMarginLeft = 0;
var objectMoveId = 0;

function startObjectAnimation() {

    var object = document.createElement("div");
    object.className = "object";
    object.id = "object";

    objectMarginLeft = Math.floor(Math.random() * 2000);

    object.style.marginLeft = objectMarginLeft + "px";

    if (objectMarginLeft > 1000) {
        document.body.appendChild(object);

        objectMoveId = setInterval(function moveObject() {

            //var i = Math.floor(Math.random() * 50);
            var i = 20;

            var x = parseInt(object.style.marginLeft) - i;
            object.style.marginLeft = x + "px";

            // alert(x);

            if ((x <= 320) && (x >= 220)) {
                if (boyMarginTop >= 70) {

                    boyDeadAnimationStart();
                }
            }
        }, 100);
    }
}
var objectAnimationStartId = 0;

function objectAnimationStart() {
    objectAnimationStartId = setInterval(startObjectAnimation, 3000);
}