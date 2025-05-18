require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./server/config/db');

// Route files
const authRoutes = require('./server/routes/authRoutes');
const userRoutes = require('./server/routes/userRoutes');
const questionRoutes = require('./server/routes/questionRoutes');
const quizRoutes = require('./server/routes/quizRoutes');

const { protect } = require('./server/middleware/authMiddleware'); // Import protect middleware

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: `http://localhost:${process.env.PORT || 3000}`, // Adjust if your frontend runs on a different port in dev
    credentials: true // Important for cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
// Serve uploaded profile pictures statically
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);       // Will be protected internally or by specific middleware
app.use('/api/questions', questionRoutes); // Will be protected
app.use('/api/quizzes', quizRoutes);     // Will be protected

app.get('/', (req, res) => {
    console.log('--- ROOT PATH (/) REQUEST RECEIVED ---'); // Add this
    console.log('Cookies on this request:', JSON.stringify(req.cookies, null, 2)); // Add this
    console.log('req.cookies.token value:', req.cookies.token); // Add this

    if (req.cookies.token) {
        console.log('Token FOUND, serving index.html'); // Add this
        return res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
    console.log('Token NOT found, serving homepage.html'); // Add this
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

app.get('/login', (req, res) => { // Alias for the main page if user wants to explicitly log in
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

app.get('/signup', (req, res) => { // Alias for the main page if user wants to explicitly sign up
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});


// Protected HTML page routes (example for quiz.html)
// All these pages should ideally check for authentication before serving.
// A simple way is to redirect to '/' if not authenticated in client-side JS.
// Or server-side:
app.get('/index.html', protect, (req, res) => { // Main game page
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/quiz.html', protect, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});
app.get('/ProfilePage.html', protect, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ProfilePage.html'));
});
app.get('/leaderBoard.html', protect, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'leaderBoard.html'));
});
app.get('/result.html', protect, (req, res) => { // Protect even results to associate them with a session
    res.sendFile(path.join(__dirname, 'public', 'result.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`MongoDB URI: ${process.env.MONGODB_URI ? 'Set' : 'Not Set - Check .env'}`);
    console.log(`JWT Secret: ${process.env.JWT_SECRET ? 'Set' : 'Not Set - Check .env'}`);
});