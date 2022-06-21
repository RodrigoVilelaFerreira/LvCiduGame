
const mario = document.querySelector(".super-mario");
const pipe = document.querySelector(".pipe-game");

const jump = () => {
  mario.classList.add("jump-mario");

  setTimeout(() => {
    mario.classList.remove("jump-mario");
  }, 500);
};

const loopGame = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
  .getComputedStyle(mario)
  .bottom.replace("px", "");
  
  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;
    
    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;
    
    mario.src = "./Images/lvcidu-game-over-new.png";
    mario.style.width = "150px";
    mario.style.marginLeft = "5px";
    
    clearInterval(timerVariable);
    clearInterval(loopGame);
  }
}, 10);

document.addEventListener("keydown", jump);

//TIMER 

let timerVariable = setInterval(countUpTimer, 1000);
 totalSeconds = 0;

function countUpTimer() {
  ++totalSeconds;
  let hour = Math.floor(totalSeconds / 3600);
  let minute = Math.floor((totalSeconds - hour * 3600) / 60);
  let seconds = totalSeconds - (hour * 3600 + minute * 60);

  if(hour < 10)
     hour = "0"+hour;
  if(minute < 10)
     minute = "0"+minute;
  if(seconds < 10)
     seconds = "0"+seconds;
  document.getElementById("count_up_timer").innerHTML = `${hour}:${minute}:${seconds}`;
}

// TIMER END