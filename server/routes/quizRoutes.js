const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');


router.post('/submit', protect, async (req, res) => {
    const { score, totalQuestions /*, questionsAttempted (if you add this later) */ } = req.body;
    const userId = req.user.id;

    if (score === undefined || totalQuestions === undefined) {
        return res.status(400).json({ message: 'Score and total questions are required.' });
    }

    try {
        const newResult = new QuizResult({
            user: userId,
            score: parseInt(score),
            totalQuestions: parseInt(totalQuestions),
            // questionsAttempted: questionsAttempted // if implemented
        });
        // xpEarned and coinsEarned are calculated in the pre-save hook

        await newResult.save();

        // Update user's overall stats, XP, coins, level
        const user = await User.findById(userId);
        if (user) {
            user.stats.quizzesPlayed = (user.stats.quizzesPlayed || 0) + 1;
            // More sophisticated average score calculation might be needed
            // For now, let's say we store total score points and calculate average on the fly or update it here
            user.xp = (user.xp || 0) + newResult.xpEarned;
            user.coins = (user.coins || 0) + newResult.coinsEarned;

            // Simple leveling system: 100 XP per level
            const xpForNextLevel = (user.level || 1) * 100;
            if (user.xp >= xpForNextLevel) {
                user.level += 1;
                user.xp -= xpForNextLevel; // Reset XP for the new level or carry over excess
                // You could add an achievement for leveling up here
            }
            await user.save();
        }

        res.status(201).json({ message: 'Quiz results submitted successfully', result: newResult });
    } catch (error) {
        console.error('Error submitting quiz results:', error);
        res.status(500).json({ message: 'Server error submitting results' });
    }
});


router.get('/leaderboard', protect, async (req, res) => {
    try {
        const topScores = await QuizResult.find({})
            .sort({ percentage: -1, playedAt: 1 }) // Highest percentage, then oldest of those
            .limit(10)
            .populate('user', 'username profilePictureUrl'); // Populate user details

        // A more user-centric leaderboard (e.g., by total XP):
        const topUsersByXP = await User.find({})
            .sort({ level: -1, xp: -1, coins: -1 }) // Sort by level, then XP, then coins
            .limit(10)
            .select('username profilePictureUrl level xp coins'); // Select relevant fields

        res.json(topUsersByXP); // Sending users sorted by XP/Level
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ message: 'Server error fetching leaderboard' });
    }
});

module.exports = router;