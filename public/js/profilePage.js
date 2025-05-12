    document.addEventListener('DOMContentLoaded', function() {
    // Sound elements
    const coinSound = document.getElementById('coinSound');
    const buttonSound = document.getElementById('buttonSound');
    const successSound = document.getElementById('successSound');
    const bgMusic = document.getElementById('bgMusic');
    const soundToggle = document.getElementById('soundToggle');
    const soundIcon = document.getElementById('soundIcon');
    
    // Username editing elements
    const usernameDisplay = document.getElementById('usernameDisplay');
    const usernameInput = document.getElementById('usernameInput');
    const editUsernameBtn = document.getElementById('editUsernameBtn');
    const saveUsernameBtn = document.getElementById('saveUsernameBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    
    // Profile picture elements
    const profileImage = document.getElementById('profileImage');
    const changePicBtn = document.getElementById('changePicBtn');
    const profilePicInput = document.getElementById('profilePicInput');
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Level progress animation
    const levelProgressBar = document.getElementById('levelProgressBar');
    const playerLevel = document.getElementById('playerLevel');
    
    // Achievements and stats
    const achievementsList = document.getElementById('achievementsList');
    const statItems = document.querySelectorAll('.stat-item');
    
    // Past games
    const pastGamesList = document.getElementById('pastGamesList');
    const noGamesMessage = document.getElementById('noGamesMessage');
    
    // Sound settings (default to on)
    let soundEnabled = true;
    
    // Initialize sound controls
    soundToggle.addEventListener('click', function() {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
            soundIcon.className = 'fas fa-volume-up';
            bgMusic.play();
        } else {
            soundIcon.className = 'fas fa-volume-mute';
            bgMusic.pause();
        }
    });
    
    // Play background music with low volume
    bgMusic.volume = 0.3;
    setTimeout(() => {
        if (soundEnabled) {
            bgMusic.play().catch(e => console.log('Audio autoplay was prevented'));
        }
    }, 1000);
    
    // Username Editing
    editUsernameBtn.addEventListener('click', function() {
        if (soundEnabled) buttonSound.play();
        usernameDisplay.classList.add('hidden');
        usernameInput.classList.remove('hidden');
        editUsernameBtn.classList.add('hidden');
        saveUsernameBtn.classList.remove('hidden');
        cancelEditBtn.classList.remove('hidden');
        usernameInput.focus();
    });
    
    saveUsernameBtn.addEventListener('click', function() {
        if (soundEnabled) successSound.play();
        const newUsername = usernameInput.value.trim();
        if (newUsername) {
            usernameDisplay.textContent = newUsername;
            // Here you would typically send this update to your server
            showToast('Username updated successfully!');
        }
        toggleUsernameEditMode(false);
    });
    
    cancelEditBtn.addEventListener('click', function() {
        if (soundEnabled) buttonSound.play();
        usernameInput.value = usernameDisplay.textContent;
        toggleUsernameEditMode(false);
    });
    
    function toggleUsernameEditMode(editing) {
        if (editing) {
            usernameDisplay.classList.add('hidden');
            usernameInput.classList.remove('hidden');
            editUsernameBtn.classList.add('hidden');
            saveUsernameBtn.classList.remove('hidden');
            cancelEditBtn.classList.remove('hidden');
        } else {
            usernameDisplay.classList.remove('hidden');
            usernameInput.classList.add('hidden');
            editUsernameBtn.classList.remove('hidden');
            saveUsernameBtn.classList.add('hidden');
            cancelEditBtn.classList.add('hidden');
        }
    }
    
    // Profile Picture Changing
    changePicBtn.addEventListener('click', function() {
        if (soundEnabled) buttonSound.play();
        profilePicInput.click();
    });
    
    profilePicInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                profileImage.src = event.target.result;
                if (soundEnabled) successSound.play();
                showToast('Profile picture updated!');
                // Here you would typically upload the image to your server
            }
            
            reader.readAsDataURL(file);
        }
    });
    
    // Mobile Menu Toggle
    mobileMenuButton.addEventListener('click', function() {
        if (soundEnabled) buttonSound.play();
        mobileMenu.classList.toggle('hidden');
    });
    
    // Level XP animation (for demo purposes)
    setTimeout(() => {
        levelProgressBar.style.width = '65%';
    }, 500);
    
    // Add click handlers to stats
    statItems.forEach(item => {
        item.addEventListener('click', function() {
            if (soundEnabled) coinSound.play();
            const statType = this.querySelector('p:last-child').textContent;
            showToast(`Viewing detailed ${statType} stats!`);
            // Here you would typically navigate to or display detailed stats
        });
    });
    
    // Dynamically load past games (demo function)
    function loadPastGames() {
        // This would normally come from your API/database
        const games = [
            {
                title: "General Knowledge Challenge",
                date: "May 01, 2025",
                score: "8 / 10",
                scoreClass: "text-green-600",
                correct: 8,
                incorrect: 2,
                coins: 25,
                xp: 15
            },
            {
                title: "Science Wonders",
                date: "April 28, 2025",
                score: "5 / 10",
                scoreClass: "text-orange-500",
                correct: 5,
                incorrect: 5,
                coins: 15,
                xp: 8
            }
        ];
        
        if (games.length > 0) {
            pastGamesList.innerHTML = ''; // Clear existing games
            noGamesMessage.classList.add('hidden');
            
            games.forEach(game => {
                // Create game history item (implementation not shown for brevity)
                // This would recreate the HTML structure for each game
            });
        } else {
            pastGamesList.innerHTML = '';
            noGamesMessage.classList.remove('hidden');
        }
    }
    
    // Toast notification system
    function showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-lg z-50 pixel-font';
        toast.textContent = message;
        
        // Add to DOM
        document.body.appendChild(toast);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 500);
        }, 3000);
    }
    
    // Add sound effects to buttons
    document.querySelectorAll('.retro-button').forEach(button => {
        button.addEventListener('click', function() {
            if (soundEnabled) buttonSound.play();
        });
    });
    
    // Add coin animation on hover to coin elements
    document.querySelectorAll('.coin').forEach(coin => {
        coin.addEventListener('mouseenter', function() {
            if (soundEnabled) coinSound.play();
        });
    });
    
    // Simulated Level Up feature
    let currentXP = 65;
    document.getElementById('levelProgressBar').addEventListener('click', function() {
        currentXP += 10;
        if (currentXP >= 100) {
            // Level up!
            currentXP = currentXP - 100;
            const newLevel = parseInt(playerLevel.textContent) + 1;
            playerLevel.textContent = newLevel;
            levelProgressBar.style.width = currentXP + '%';
            
            if (soundEnabled) {
                bgMusic.pause();
                successSound.play();
                setTimeout(() => {
                    if (soundEnabled) bgMusic.play();
                }, 1000);
            }
            
            // Create level up animation
            const levelUpMsg = document.createElement('div');
            levelUpMsg.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black px-8 py-4 rounded-lg z-50 text-2xl font-bold pixel-font text-center';
            levelUpMsg.innerHTML = `LEVEL UP!<br>You are now level ${newLevel}`;
            document.body.appendChild(levelUpMsg);
            
            setTimeout(() => {
                levelUpMsg.classList.add('opacity-0', 'transition-opacity', 'duration-500');
                setTimeout(() => {
                    document.body.removeChild(levelUpMsg);
                }, 500);
            }, 2000);
        } else {
            // Just update XP
            if (soundEnabled) coinSound.play();
            levelProgressBar.style.width = currentXP + '%';
        }
        
        // Update XP text
        const xpText = levelProgressBar.nextElementSibling;
        xpText.textContent = `${currentXP}/100 XP`;
    });
});