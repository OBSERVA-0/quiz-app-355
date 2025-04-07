let timer;
let seconds = 0;
let minutes = 0;

// Elements
const timerButton = document.getElementById("timer-btn");
const timerDisplay = document.getElementById("timer-display");

// Start the timer
timerButton.addEventListener("click", function() {
  if (timer) {
    clearInterval(timer); // Stop existing timer if any
  }

  // Start a new timer
  timer = setInterval(function() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    timerDisplay.textContent = formatTime(minutes, seconds);
    
    // Store the time in localStorage
    localStorage.setItem('timerTime', JSON.stringify({ minutes, seconds }));
  }, 1000);
});

// Format time as MM:SS
function formatTime(minutes, seconds) {
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
