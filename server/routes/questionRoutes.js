const express = require('express');
const router = express.Router();
const axios = require('axios'); // For making HTTP requests
const he = require('he'); // For decoding HTML entities
const { protect } = require('../middleware/authMiddleware'); // Assuming you still want to protect this
// Remove: const Question = require('../models/Question'); // No longer using Mongoose model for this

// Helper function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// @desc    Get quiz questions from OpenTDB API
// @route   GET /api/questions
// @access  Private (user must be logged in to play)
router.get('/', protect, async (req, res) => {
    const amount = parseInt(req.query.count) || 10; // Number of questions, default 10
    const category = req.query.category; // Optional: OpenTDB category ID (e.g., 9 for General Knowledge)
    const difficulty = req.query.difficulty; // Optional: 'easy', 'medium', 'hard'
    const type = req.query.type; // Optional: 'multiple' or 'boolean'

    // Construct the OpenTDB API URL
    let apiUrl = `https://opentdb.com/api.php?amount=${amount}`;
    if (category) apiUrl += `&category=${category}`;
    if (difficulty) apiUrl += `&difficulty=${difficulty}`;
    if (type) apiUrl += `&type=${type}`;

    try {
        console.log(`Workspaceing questions from OpenTDB: ${apiUrl}`); // For debugging
        const response = await axios.get(apiUrl);
        const triviaData = response.data;

        if (triviaData.response_code !== 0) {
            // Handle OpenTDB API errors
            // Response codes: 1=No Results, 2=Invalid Parameter, 3=Token Not Found, 4=Token Empty
            let message = 'Could not fetch questions from Trivia API.';
            if (triviaData.response_code === 1) message = 'Not enough questions for your query in the Trivia API.';
            else if (triviaData.response_code === 2) message = 'Invalid parameter sent to Trivia API.';
            console.error(`OpenTDB API Error (Code ${triviaData.response_code}): ${message}`);
            return res.status(500).json({ message });
        }

        const formattedQuestions = triviaData.results.map((apiQuestion, index) => {
            const questionText = he.decode(apiQuestion.question);
            const correctAnswer = he.decode(apiQuestion.correct_answer);
            const incorrectAnswers = apiQuestion.incorrect_answers.map(ans => he.decode(ans));

            let options;
            let answerLetter;

            if (apiQuestion.type === 'multiple') {
                options = shuffleArray([...incorrectAnswers, correctAnswer]);
                answerLetter = String.fromCharCode(65 + options.indexOf(correctAnswer)); // A=0, B=1, C=2, D=3
            } else if (apiQuestion.type === 'boolean') {
                // For boolean, options are fixed, correct answer determines the letter
                options = ["True", "False"]; // Standard order for consistency
                answerLetter = (correctAnswer === "True") ? "A" : "B";
            } else {
                // Should not happen with OpenTDB 'multiple' or 'boolean' types
                options = [];
                answerLetter = '';
            }

            return {
                _id: `opentdb_${index}_${Date.now()}`, // Create a unique enough ID
                question: questionText,
                category: he.decode(apiQuestion.category),
                difficulty: he.decode(apiQuestion.difficulty),
                type: apiQuestion.type, // Keep type for potential frontend use
                A: options[0] || null,
                B: options[1] || null,
                C: options[2] || null, // Will be null for boolean
                D: options[3] || null, // Will be null for boolean and some multiple
                answer: answerLetter,
                // Store all options for easier debugging or potential frontend logic
                // all_options: options // Optional
            };
        });

        res.json(formattedQuestions);

    } catch (error) {
        console.error('Error fetching or processing questions from OpenTDB:', error.message);
        if (error.response) { // Log error details if it's an Axios error
            console.error('Axios error data:', error.response.data);
            console.error('Axios error status:', error.response.status);
        }
        res.status(500).json({ message: 'Server error fetching questions. Please try again later.' });
    }
});

module.exports = router;