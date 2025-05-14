
// In js/home.js or a common script for the top bar
const logoutButton = document.querySelector('logoutButton'); // Or give it an ID
if (logoutButton) {
    logoutButton.textContent = '🚪 Log Out'; // Change text
    logoutButton.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/logout', { method: 'POST' });
            if (response.ok) {
                window.location.href = '/index.html'; // Redirect to login
            } else {
                console.error('Logout failed');
                // Optionally show an error message
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    });
}
let countdownTime = 10 * 60 * 1000;  // 10 minutes in milliseconds
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    countdownTime -= 1000;
    if (countdownTime <= 0) {
      clearInterval(timerInterval);
      countdownTime = 0;
    }
    updateTimerDisplay(countdownTime);
  }, 1000);

  localStorage.setItem('countdownTime', countdownTime);

  setTimeout(() => {
    window.location.href = 'quiz.html';
  }, 100);
}

function updateTimerDisplay(time) {
  const minutes = Math.floor(time / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const formattedTime = `${pad(minutes)}:${pad(seconds)}`;
  document.getElementById('timer-display').innerText = formattedTime;
}

function pad(num) {
  return num < 10 ? '0' + num : num;
}

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-timer-btn');
  const clickSound = document.getElementById('click-sound');

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      startTimer();
    });
  }

  // ✅ Sound plays on any a/button click
  if (clickSound) {
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.error("Sound playback error:", e));
      });
    });
  }
});
