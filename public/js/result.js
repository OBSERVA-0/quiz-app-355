// Wait for the DOM to load
window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('victory-sound');
  
    // Unlock sound on first user interaction if needed
    const playVictorySound = () => {
      if (audio) {
        audio.volume = 1.0;
        audio.play().catch(err => {
          // Some browsers block autoplay; fallback here if needed
          console.warn("Autoplay blocked. Waiting for user interaction.");
        });
      }
  
      // Only need this once
      document.removeEventListener('click', playVictorySound);
    };
  
    // Try to play immediately
    playVictorySound();
  
    // Fallback: play on first user click if blocked
    document.addEventListener('click', playVictorySound);
  });
  