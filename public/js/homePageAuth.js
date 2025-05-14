document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginMessage = document.getElementById('login-message');
    const signupMessage = document.getElementById('signup-message');

    // --- Login Form Handler ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default browser submission

            loginMessage.textContent = 'Logging in...'; // Provide feedback
            loginMessage.className = 'message'; // Reset class

            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries()); // Convert FormData to plain object

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), // Send data as JSON
                });

                const result = await response.json(); // Always try to parse JSON response

                if (response.ok) {
                    // Login successful!
                    loginMessage.textContent = result.message || 'Login successful! Redirecting...';
                    loginMessage.classList.add('success');
                    // Redirect to the main page after a short delay
                    window.location.href = '/homePage.html'; // Redirect to the main game page
                    // Use just '/' if your server route '/' handles redirecting logged-in users
                } else {
                    // Login failed - display error message from backend
                    loginMessage.textContent = result.message || 'Login failed. Please check your credentials.';
                    loginMessage.classList.add('error');
                }
            } catch (error) {
                console.error('Login error:', error);
                loginMessage.textContent = 'An error occurred during login. Please try again.';
                loginMessage.classList.add('error');
            }
        });
    }

    // --- Signup Form Handler ---
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default browser submission

            signupMessage.textContent = 'Signing up...'; // Provide feedback
             signupMessage.className = 'message'; // Reset class

            const formData = new FormData(signupForm);
            const data = Object.fromEntries(formData.entries());

            // Basic client-side password length check (backend also validates)
             if (data.password.length < 6) {
                signupMessage.textContent = 'Password must be at least 6 characters long.';
                signupMessage.classList.add('error');
                return;
            }

            try {
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) { // Status 201 Created is also ok
                    // Signup successful!
                    signupMessage.textContent = result.message || 'Signup successful! Redirecting...';
                     signupMessage.classList.add('success');
                    // Redirect to the main page
                     window.location.href = '/homePage.html';
                } else {
                    // Signup failed - display error message from backend
                    signupMessage.textContent = result.message || 'Signup failed. Please check your details.';
                     signupMessage.classList.add('error');
                }
            } catch (error) {
                console.error('Signup error:', error);
                signupMessage.textContent = 'An error occurred during signup. Please try again.';
                 signupMessage.classList.add('error');
            }
        });
    }
});