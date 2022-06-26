const mainCharacter = document.querySelector(".mainCharacter");
const SimpleObstacle1 = document.querySelector(".SimpleObstacle1-game");
const restartButton = document.querySelector("#restartButton");
let jumpCount = 0;
let gameIsRunning = true;

// Make mainCharacterJump (with jump counter)

const jump = () => {
  {
    if (mainCharacter.classList.contains("jump-mainCharacter") === false &&
      gameIsRunning === true) {
      mainCharacter.classList.add("jump-mainCharacter");
      jumpCount += 1;
      document.getElementById("jump_counter").innerHTML = `${jumpCount}`;

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
  const SimpleObstacle1Position = SimpleObstacle1.offsetLeft;
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
    restartButton.style.display = "block";

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
  document.getElementById(
    "count_up_timer"
  ).innerHTML = `${hour}:${minute}:${seconds}`;
}

//Restart Button

restartButton.onclick = function () {
  location.reload();
  return false;
};
