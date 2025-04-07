let countdownTime = 10 * 60 * 1000;  // 10 minutes in milliseconds
let timerInterval;

function startTimer() {
  // Start the countdown timer
  timerInterval = setInterval(() => {
    countdownTime -= 1000;  // Decrease by 1 second (1000 milliseconds)
    if (countdownTime <= 0) {
      clearInterval(timerInterval);  // Stop the timer once it reaches 0
      countdownTime = 0;  // Ensure the timer does not go negative
    }
    updateTimerDisplay(countdownTime);
  }, 1000);

  // Save the countdown time in localStorage for quiz.html to access
  localStorage.setItem('countdownTime', countdownTime);

  // Redirect to quiz page
  setTimeout(() => {
    window.location.href = 'quiz.html';  // Redirect to quiz page
  }, 100);  // Adjust time delay as needed to avoid a race condition
}

// Update timer display
function updateTimerDisplay(time) {
  const minutes = Math.floor(time / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const formattedTime = `${pad(minutes)}:${pad(seconds)}`;
  document.getElementById('timer-display').innerText = formattedTime;
}

// Utility function to pad minutes/seconds
function pad(num) {
  return num < 10 ? '0' + num : num;
}

// Event listener for the Start Timer button
document.getElementById('start-timer-btn').addEventListener('click', function() {
  startTimer();  // Start the countdown timer and redirect to quiz page
});
