    document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Element Selection ---
    // Sound elements (Keep if used)
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

    // Mobile menu toggle (Keep if used)
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    // Level progress (Keep if used)
    const levelProgressBar = document.getElementById('levelProgressBar');
    const playerLevel = document.getElementById('playerLevel');
    const xpText = document.getElementById('xpText'); // Assuming xpText span has id="xpText"

    // Stats/Info elements (Ensure these IDs exist in your HTML)
    const coinCount = document.getElementById('coinCount');
    const joinedDate = document.getElementById('joinedDate');
    const statQuizzesPlayed = document.getElementById('statQuizzesPlayed');
    const statAverageScore = document.getElementById('statAverageScore');
    const statAchievements = document.getElementById('statAchievements');

    // Achievements and Past Games Lists (Ensure these IDs exist)
    const achievementsList = document.getElementById('achievementsList');
    const pastGamesList = document.getElementById('pastGamesList');
    const noGamesMessage = document.getElementById('noGamesMessage');

    // --- State Variables ---
    let soundEnabled = true; // Default sound state

    // --- Helper Functions (Implement or ensure they exist) ---
    function showToast(message, type = 'info') { // Example implementation
        console.log(`Toast [${type}]: ${message}`);
        // Replace with your actual toast notification logic
        const toast = document.createElement('div');
        toast.className = `fixed bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg z-50 pixel-font text-white ${type === 'error' ? 'bg-red-600' : (type === 'success' ? 'bg-green-600' : 'bg-black bg-opacity-80')}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => { document.body.removeChild(toast); }, 500);
        }, 3000);
    }

    function toggleUsernameEditMode(editing) {
        // Ensure all elements exist before manipulating classes
        if (!usernameDisplay || !usernameInput || !editUsernameBtn || !saveUsernameBtn || !cancelEditBtn) {
            console.error("One or more username editing elements not found!");
            return;
        }
        if (editing) {
            usernameDisplay.classList.add('hidden');
            usernameInput.classList.remove('hidden');
            editUsernameBtn.classList.add('hidden');
            saveUsernameBtn.classList.remove('hidden');
            cancelEditBtn.classList.remove('hidden');
            usernameInput.focus();
            usernameInput.select(); // Select text for easy replacement
        } else {
            usernameDisplay.classList.remove('hidden');
            usernameInput.classList.add('hidden');
            editUsernameBtn.classList.remove('hidden');
            saveUsernameBtn.classList.add('hidden');
            cancelEditBtn.classList.add('hidden');
        }
    }

    // Placeholder functions (Replace with your actual implementations if needed)
    function loadPastGames(games = []) {
        console.log("Loading past games:", games);
        if (!pastGamesList || !noGamesMessage) return;

        pastGamesList.innerHTML = ''; // Clear previous entries
        if (games.length === 0) {
            noGamesMessage.innerHTML = `
                <i class="fas fa-ghost text-3xl mb-2"></i><br>
                No quests completed yet. <br> Start playing to build your adventure log!`;
            noGamesMessage.classList.remove('hidden');
        } else {
            noGamesMessage.classList.add('hidden');
            games.forEach(game => {
                // Create and append game item HTML elements here based on 'game' object
                const gameItem = document.createElement('div');
                gameItem.className = 'game-item pixel-card bg-white p-5 md:p-6 hover-scale mb-4'; // Added margin
                 const scoreClass = (game.percentage >= 70) ? 'text-green-600' : (game.percentage >= 40 ? 'text-orange-500' : 'text-red-600');
                gameItem.innerHTML = `
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                       <div class="flex items-center">
                           <i class="fas fa-scroll fa-fw mr-3 text-xl text-yellow-700"></i> <h3 class="text-lg font-semibold text-blue-700">Quiz Result</h3> </div>
                       <p class="text-xs mt-2 sm:mt-0 text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Played on: ${new Date(game.playedAt || game.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div class="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                       <div class="mr-4">
                           <p class="text-md text-gray-700">Score: <span class="font-bold ${scoreClass}">${game.score} / ${game.totalQuestions} (${game.percentage}%)</span></p>
                       </div>
                       <div class="flex items-center">
                           <div class="coin ml-2 w-5 h-5 inline-block"></div>
                           <span class="ml-1 text-yellow-600 font-bold">+${game.coinsEarned || 0}</span>
                       </div>
                       <div class="flex items-center">
                           <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">+${game.xpEarned || 0} XP</span>
                       </div>
                    </div>
                    `;
                pastGamesList.appendChild(gameItem);
            });
        }
    }

    function displayAchievements(achievements = []) {
        console.log("Displaying achievements:", achievements);
         if (!achievementsList) return;
        // Logic to display achievements based on the 'achievements' array
        achievementsList.innerHTML = ''; // Clear
        if (achievements.length === 0) {
             achievementsList.innerHTML = '<p class="text-gray-500 col-span-full">No achievements unlocked yet.</p>';
        } else {
            // Loop through achievements and create/append elements
            achievements.forEach(ach => {
                 const achItem = document.createElement('div');
                 achItem.className = 'achievement-item text-center';
                 // ... create icon/text based on achievement name/id 'ach' ...
                 achItem.innerHTML = `<div class="bg-yellow-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-2 border-2 border-yellow-400"><i class="fas fa-trophy text-yellow-500 text-2xl"></i></div><h3 class="text-sm font-semibold">${ach}</h3>`; // Example display
                 achievementsList.appendChild(achItem);
            });
        }
    }


    // --- Event Listeners ---
    // Sound Toggle (Keep if used)
    if (soundToggle) {
        soundToggle.addEventListener('click', function() {
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                soundIcon.className = 'fas fa-volume-up';
                 if (bgMusic && bgMusic.paused) bgMusic.play().catch(e => console.log('BG music play prevented'));
            } else {
                soundIcon.className = 'fas fa-volume-mute';
                 if (bgMusic) bgMusic.pause();
            }
             console.log("Sound enabled:", soundEnabled);
        });
    } else { console.log("Sound toggle button not found"); }

     // Background Music Autoplay attempt (Keep if used)
     if (bgMusic) {
        bgMusic.volume = 0.3;
        // Autoplay often restricted, user interaction usually needed first
        // Maybe play on first button click instead
     } else { console.log("BG Music element not found"); }


    // Username Editing
    if (editUsernameBtn) {
        editUsernameBtn.addEventListener('click', function() {
            console.log('Edit username button clicked'); // DEBUG
            if (soundEnabled && buttonSound) buttonSound.play();
            toggleUsernameEditMode(true);
        });
    } else { console.error("Edit Username button not found!"); }

    if (saveUsernameBtn) {
        saveUsernameBtn.addEventListener('click', async function() { // Make it async
            console.log('Save username button clicked'); // DEBUG
            if (!usernameInput) {
                console.error("Username input field not found!");
                return;
            }
            const newUsername = usernameInput.value.trim(); // Define newUsername here
            console.log('Attempting to save username:', newUsername); // DEBUG

            if (soundEnabled && successSound) successSound.play(); // Play sound optimistically or after success

            if (newUsername) {
                try {
                    showToast('Saving username...', 'info'); // Give feedback
                    // ---> ENFORCEMENT POINT 1 (Saving Username) <---
                    const response = await fetch('/api/users/me/username', { // Send to backend
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: newUsername })
                    });

                    const result = await response.json(); // Try to parse response regardless of status

                    if (!response.ok) {
                        // Use error message from backend if available
                        throw new Error(result.message || `Server error: ${response.status}`);
                    }

                    // SUCCESS
                    if (usernameDisplay) usernameDisplay.textContent = result.username; // Update display with confirmed data
                    showToast(result.message || 'Username updated!', 'success');
                    toggleUsernameEditMode(false);

                } catch (error) {
                    // FAILURE
                    console.error("Error updating username:", error);
                    showToast(`Error: ${error.message}`, 'error');
                    // Decide if you want to leave edit mode open on failure
                    // toggleUsernameEditMode(false); // Optionally close edit mode even on error
                }
            } else {
                showToast('Username cannot be empty.', 'error');
                // Don't close edit mode if submission was invalid client-side
                // toggleUsernameEditMode(false);
            }
        });
    } else { console.error("Save Username button not found!"); }


    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function() {
             console.log('Cancel edit button clicked'); // DEBUG
            if (soundEnabled && buttonSound) buttonSound.play();
            if (usernameInput && usernameDisplay) {
                 usernameInput.value = usernameDisplay.textContent; // Reset input field
            }
            toggleUsernameEditMode(false);
        });
    } else { console.error("Cancel Edit button not found!"); }


    // Profile Picture Changing
    if (changePicBtn) {
        changePicBtn.addEventListener('click', function() {
            console.log('Change pic button clicked'); // DEBUG
             if (soundEnabled && buttonSound) buttonSound.play();
            if (profilePicInput) {
                profilePicInput.click(); // Trigger the hidden file input
            } else {
                 console.error("Profile picture file input not found!");
            }
        });
    } else { console.error("Change Pic button not found!"); }


    if (profilePicInput) {
        profilePicInput.addEventListener('change', async function(e) { // Make it async
             console.log('File input changed:', e.target.files); // DEBUG
            if (e.target.files.length > 0) {
                const file = e.target.files[0];

                // Optional: Client-side size check
                if (file.size > 2 * 1024 * 1024) { // 2MB limit example
                    showToast('File is too large (Max 2MB).', 'error');
                    return;
                }
                // Optional: Client-side type check
                if (!file.type.startsWith('image/')) {
                     showToast('Please select an image file.', 'error');
                    return;
                }


                const formData = new FormData();
                formData.append('profilePic', file); // Key matches multer setup
                
                try {
                    showToast('Uploading picture...', 'info'); // Feedback
                    // ---> ENFORCEMENT POINT 2 (Saving Profile Pic) <---
                    const response = await fetch('/api/users/me/profile-picture', { // Send to backend
                        method: 'POST',
                        // No 'Content-Type' header needed for FormData with fetch
                        body: formData
                    });

                    const result = await response.json(); // Try to parse response

                    if (!response.ok) {
                        throw new Error(result.message || `Upload failed: ${response.status}`);
                    }

                    // SUCCESS
                    if (profileImage) profileImage.src = result.filePath + `?t=${new Date().getTime()}`; // Update image + cache bust
                    if (soundEnabled && successSound) successSound.play();
                    showToast(result.message || 'Profile picture updated!', 'success');

                } catch (error) {
                    // FAILURE
                    console.error("Error uploading profile picture:", error);
                    showToast(`Error: ${error.message}`, 'error');
                }
            }
        });
    } else { console.error("Profile Pic file input not found!"); }


    // Mobile Menu Toggle (Keep if used)
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            if (soundEnabled && buttonSound) buttonSound.play();
            mobileMenu.classList.toggle('hidden');
        });
    }


    // --- Initial Data Load ---
    async function fetchUserProfile() {
        // Ensure all elements needed for population are selected first
        if (!usernameDisplay || !usernameInput || !profileImage || !playerLevel || !levelProgressBar || !xpText || !coinCount || !joinedDate || !statQuizzesPlayed || !statAverageScore || !statAchievements) {
             console.error("One or more profile display elements are missing!");
             showToast("Error initializing profile display.", 'error');
             return;
        }

        try {
            console.log("Fetching user profile data..."); // DEBUG
            // ---> ENFORCEMENT POINT 3 (Loading Persisted Data) <---
            const response = await fetch('/api/users/me'); // Get latest data from backend
            console.log("Profile fetch response status:", response.status); // DEBUG

            if (!response.ok) {
                if (response.status === 401) {
                    console.log("Unauthorized (401). Redirecting to login."); // DEBUG
                    window.location.href = '/homepage.html'; // Redirect if not logged in
                }
                // Try to get error message from backend if possible
                let errorMsg = `HTTP error! Status: ${response.status}`;
                try {
                    const errResult = await response.json();
                    errorMsg = errResult.message || errorMsg;
                } catch (parseError) { /* Ignore if response not json */ }
                throw new Error(errorMsg);
            }

            const userData = await response.json();
            console.log("Received user data:", userData); // DEBUG

            // Use data from DB to populate the page elements
            usernameDisplay.textContent = userData.username || 'N/A';
            usernameInput.value = userData.username || ''; // Also set input field value
            profileImage.src = userData.profilePictureUrl || './images/retro image of a mushroom video game theme.png'; // Fallback image
            playerLevel.textContent = userData.level || 1;
            const currentXP = userData.xp || 0;
            const xpToLevel = (userData.level || 1) * 100;
            levelProgressBar.style.width = `${Math.min(100, (currentXP / xpToLevel) * 100)}%`; // Calculate percentage correctly
            xpText.textContent = `${currentXP}/${xpToLevel} XP`;
            coinCount.textContent = userData.coins || 0;
            joinedDate.textContent = userData.joinedDate ? `Joined: ${new Date(userData.joinedDate).toLocaleDateString()}` : 'Joined: N/A';

            let totalAverageScore = 0;
            // defines the total average score

            for (const quiz of userData.pastGames) {
                // loops through previous played quizzes

                totalAverageScore += quiz.percentage; 
                // adds to average score

            }

            // Populate stats (using optional chaining ?. for safety)
            statQuizzesPlayed.textContent = userData.stats?.quizzesPlayed || 0;
            // Calculate average score if not stored directly

            userData.stats.averageScore = userData.pastGames.length > 0 ? (totalAverageScore / userData.pastGames.length).toFixed(2) : 0;

            statAverageScore.textContent = `${userData.stats?.averageScore || 0}%`; // Assuming averageScore is stored
            statAchievements.textContent = userData.achievements?.length || 0;

            // Load dynamic lists
            loadPastGames(userData.pastGames || []); // Load past games received from API
            displayAchievements(userData.achievements || []); // Function to display achievements

        } catch (error) {
            console.error('Error fetching user profile:', error);
            showToast(`Could not load profile data: ${error.message}`, 'error');
            // Maybe hide profile sections or show error message
            // Display error state on page:
             if(usernameDisplay) usernameDisplay.textContent = "Error";
             // etc. for other fields
        }
    }

    // ---> Initial call to load profile data <---
    fetchUserProfile();

    // --- Other Event Listeners from Original File (e.g., stats clicks, level up simulation) ---
    // Make sure these are also correctly selecting elements and don't have errors. Add console.log checks if needed.

    // Example: Add sound effects to buttons (ensure '.retro-button' class exists and elements are present)
    document.querySelectorAll('.retro-button').forEach(button => {
         if (!button) return;
        button.addEventListener('click', function() {
            if (soundEnabled && buttonSound) buttonSound.play();
        });
    });

    // Add coin sound on hover (ensure '.coin' class exists)
    document.querySelectorAll('.coin').forEach(coin => {
         if (!coin) return;
        coin.addEventListener('mouseenter', function() {
            if (soundEnabled && coinSound) coinSound.play();
        });
    });

     // Add logout functionality to nav buttons
     const navLogoutButton = document.getElementById('navLogoutButton');
     const mobileLogoutButton = document.getElementById('mobileLogoutButton');
     const handleLogout = async (e) => {
          e.preventDefault();
          console.log("Logout clicked");
          try {
               const response = await fetch('/api/auth/logout', { method: 'POST' });
               if (response.ok) {
                    window.location.href = '/index.html'; // Redirect to login
               } else {
                    const result = await response.json();
                    showToast(result.message || 'Logout failed.', 'error');
                    console.error('Logout failed:', result.message);
               }
          } catch (error) {
               console.error('Error during logout:', error);
               showToast('Logout error.', 'error');
          }
     };

     if (navLogoutButton) navLogoutButton.addEventListener('click', handleLogout);
     if (mobileLogoutButton) mobileLogoutButton.addEventListener('click', handleLogout);


}); // End DOMContentLoaded