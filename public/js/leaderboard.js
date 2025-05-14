// public/js/leaderboard.js

document.addEventListener('DOMContentLoaded', async () => {
    const leaderboardBody = document.getElementById('leaderboard-body');

    if (!leaderboardBody) {
        console.error("Leaderboard table body not found!");
        return;
    }

    // Function to display a message in the leaderboard (e.g., for errors or empty state)
    function displayMessage(message) {
        leaderboardBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px;">${message}</td></tr>`;
    }

    try {
        // Client-side auth check (good practice for protected pages)
        const authResponse = await fetch('/api/auth/me');
        if (!authResponse.ok) {
            if (authResponse.status === 401) { // Unauthorized
                displayMessage('Please log in to view the leaderboard. Redirecting...');
                setTimeout(() => { window.location.href = '/homepage.html'; }, 2000);
            } else {
                displayMessage(`Error checking authentication: ${authResponse.statusText}`);
            }
            return;
        }

        // Fetch leaderboard data from your backend API
        const response = await fetch('/api/quizzes/leaderboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Cookies are usually sent automatically by the browser
            }
        });

        if (!response.ok) {
            const errorResult = await response.json().catch(() => ({ message: `HTTP Error: ${response.status}` }));
            throw new Error(errorResult.message || `Failed to fetch leaderboard data: ${response.statusText}`);
        }

        const leaderboardData = await response.json();
        console.log('Leaderboard data received:', leaderboardData);

        // Clear "Loading..." message
        leaderboardBody.innerHTML = '';

        if (leaderboardData && leaderboardData.length > 0) {
            leaderboardData.forEach((player, index) => {
                const row = document.createElement('tr');

                // Sanitize user-provided data before inserting into HTML if needed,
                // though textContent is generally safe.
                // For complex HTML, consider DOMPurify or similar if data isn't fully trusted.

                const rankCell = document.createElement('td');
                rankCell.textContent = index + 1;

                const playerCell = document.createElement('td');

                if (player.profilePictureUrl){
                    const img = document.createElement('img');
                    img.src = player.profilePictureUrl;
                    img.alt = player.username;
                    img.style.width = '23px';
                    img.style.height = '23px';
                    img.style.borderRadius = '20%';
                    img.style.marginRight = '8px';
                    playerCell.appendChild(img);
                }

                const playerName = document.createTextNode(player.username || 'N/A');
                playerCell.appendChild(playerName);


                const levelCell = document.createElement('td');
                levelCell.textContent = player.level || 0;

                const xpCell = document.createElement('td');
                xpCell.textContent = player.xp || 0;

                // Optional: Add coins
                // const coinsCell = document.createElement('td');
                // coinsCell.textContent = player.coins || 0;

                row.appendChild(rankCell);
                row.appendChild(playerCell);
                row.appendChild(levelCell);
                row.appendChild(xpCell);
                // row.appendChild(coinsCell); // If displaying coins

                leaderboardBody.appendChild(row);
            });
        } else {
            displayMessage('Leaderboard is currently empty!');
        }

    } catch (error) {
        console.error('Failed to load leaderboard:', error);
        displayMessage(`Error loading leaderboard: ${error.message}`);
    }
});