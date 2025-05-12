const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get quiz questions (e.g., random set)
// @route   GET /api/questions
// @access  Private (user must be logged in to play)
router.get('/', protect, async (req, res) => {
    const count = parseInt(req.query.count) || 10; // Default to 10 questions
    const category = req.query.category; // Optional category filter

    try {
        let query = {};
        if (category) {
            query.category = category;
        }

        // Fetch questions matching the query, then randomly sample 'count'
        // For true randomness on large datasets, $sample is better in MongoDB aggregation
        const questions = await Question.find(query);

        if (questions.length === 0) {
            return res.status(404).json({message: "No questions found for this criteria."});
        }

        // Simple shuffle and slice
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.min(count, shuffled.length));

        res.json(selected);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Server error fetching questions' });
    }
});

// Optional: Route to add a new question (admin only - needs further protection)
// router.post('/', protectAdmin, async (req, res) => { ... });

module.exports = router;