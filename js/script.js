const mainCharacter = document.querySelector(".mainCharacter");
const SimpleObstacle1 = document.querySelector(".SimpleObstacle1-game");
const restartButton = document.querySelector("#restartButton");
const gameOverScreen = document.querySelector("#gameOverScreen")
const jumpCounter = document.getElementById("jump_counter");
const difficultyLevel = document.getElementById("difficulty_level");
const countUpTime = document.getElementById("count_up_timer")
const scoreCounter = document.getElementById("score_counter")
let jumpCount = 0;
let gameIsRunning = true;

// Make mainCharacterJump (with jump counter)

const jump = () => {
  {
    if (mainCharacter.classList.contains("jump-mainCharacter") === false &&
      gameIsRunning === true) {
      mainCharacter.classList.add("jump-mainCharacter");
      jumpCount += 1;
      jumpCounter.innerHTML = `${jumpCount}`;
      ChangeDifficulty();

      setTimeout(() => {
        mainCharacter.classList.remove("jump-mainCharacter");
      }, 505);
    }
  }
};

document.addEventListener("keydown", jump);
document.addEventListener("click", jump);

// Make collider for SimpleObstacle1

const loopGame = setInterval(() => {
  const SimpleObstacle1Position = SimpleObstacle1.offsetLeft;55
  const mainCharacterPosition = +window
    .getComputedStyle(mainCharacter)
    .bottom.replace("px", "");

  if (SimpleObstacle1Position <= 120 && SimpleObstacle1Position > 0 && mainCharacterPosition < 80) {
    SimpleObstacle1.style.animation = "none";
    SimpleObstacle1.style.left = `${SimpleObstacle1Position}px`;

    mainCharacter.style.animation = "none";
    mainCharacter.style.bottom = `${mainCharacterPosition}px`;

    mainCharacter.src = "./Images/lvcidu-game-over-new.png";
    mainCharacter.style.width = "150px";
    mainCharacter.style.marginLeft = "5px";
    gameOverScreen.style.display = "block";
    calculateScore();

    gameIsRunning = false;
  
    clearInterval(timerVariable);
    clearInterval(loopGame);
  }
}, 10);

//TIMER

let timerVariable = setInterval(countUpTimer, 1000);
totalSeconds = 0;

function countUpTimer() {
  ++totalSeconds;
  let hour = Math.floor(totalSeconds / 3600);
  let minute = Math.floor((totalSeconds - hour * 3600) / 60);
  let seconds = totalSeconds - (hour * 3600 + minute * 60);

  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  if (seconds < 10) seconds = "0" + seconds;
  countUpTime.innerHTML = `${hour}:${minute}:${seconds}`;
}

//Restart Button

restartButton.onclick = function () {
  location.reload();
  return false;
};

//difficulty set

let difficultyCounter = 5
let difficulty = 0
let SimpleObstacle1_Position0 = false
let levelCount = 1

SimpleObstacle1.style.animation = `SimpleObstacle1-animation linear ${1.5 - difficulty}s infinite normal none running`


function ChangeDifficulty() {

  const SimpleObstacle1Position = SimpleObstacle1.offsetLeft
  const windowWidth = window.innerWidth
  const animationDurationNumber = Number(SimpleObstacle1.style.animationDuration.slice(0, -1))
  const animationPixelPerSecond = animationDurationNumber / windowWidth
  const timeToEndAnimation = SimpleObstacle1Position * animationPixelPerSecond
  const timeEndAnimationMilisec = timeToEndAnimation * 1000

  console.log('mudou')
  if (jumpCount === difficultyCounter) {
    
    console.log('ativei')
    difficultyCounter += 5
    difficulty += 0.1

    levelCount += 1;
    difficultyLevel.innerHTML = `${levelCount}`;

    /*
    console.log(SimpleObstacle1Position)
    console.log(windowWidth)
    console.log((animationDurationNumber * 1000).toFixed(5))
    console.log((animationPixelPerSecond * 1000).toFixed(5));
    console.log((timeEndAnimationMilisec).toFixed(5));
    */

    setTimeout(function waitAnimation() {
      SimpleObstacle1.style.animation = `none`

      setTimeout(() => {
        SimpleObstacle1.style.animation = `SimpleObstacle1-animation linear ${1.5 - difficulty}s infinite normal none running`
        //console.log(timeEndAnimationMilisec)
      }, 100);
    }, timeEndAnimationMilisec);
  }
}


//CALCULATE SCORE
function calculateScore() {
  let scoreCount = 1
  let totalJump = jumpCounter.innerHTML
  let totalTime = countUpTime.innerHTML
  let difficultyBonus = difficultyLevel.innerHTML

  let seconds = totalTime.slice(-2);
  let minutes = totalTime.slice(3,5);
  let hours = totalTime.slice(0,2);
  let timePoints = (seconds*1000) + (minutes*60000) + (hours*3600000)

  /*
  console.log(totalJump);
  console.log(totalTime);
  console.log(seconds);
  console.log(minutes);
  console.log(hours);
  console.log(timePoints);
  console.log(difficultyBonus);
  */
  
  let totalPoints = ((totalJump*5000000)/timePoints)

  console.log(totalPoints)
  console.log(difficultyBonus)

  scoreCount = Math.round(totalPoints*(difficultyBonus/4))

  scoreCounter.innerHTML = `${scoreCount}`;
}