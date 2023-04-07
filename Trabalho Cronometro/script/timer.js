//Primeira parte dedicada ao cronometro
const timer = document.querySelector(".timer");
const btnStartPause = document.getElementById("btnStartPause");
const btnStop = document.getElementById("btnStop");
const btnReset = document.getElementById("btnReset");

let intervalId;
let startTime;
let elapsedTime = 0;
let isPaused = true;

function updateTimer() {
  const now = Date.now();
  elapsedTime = now - startTime;
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60)).toString().padStart(2, "0");
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60).toString().padStart(2, "0");
  const seconds = Math.floor((elapsedTime / 1000) % 60).toString().padStart(2, "0");
  timer.textContent = `${hours}:${minutes}:${seconds}`;
}
btnStartPause.addEventListener("click", function(e) {
  e.preventDefault();
  if (isPaused) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTimer, 10);
    isPaused = false;
  } else {
    clearInterval(intervalId);
    isPaused = true;
  }
});

btnStop.addEventListener("click", function(e) {
  e.preventDefault();
  clearInterval(intervalId);
  isPaused = true;
  elapsedTime = 0;
  timer.textContent = "00:00:00";
});

btnReset.addEventListener("click", function(e) {
  e.preventDefault();
  elapsedTime = 0;
  timer.textContent = "00:00:00";
});





