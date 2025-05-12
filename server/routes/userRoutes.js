const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const QuizResult = require('../models/QuizResult');
const { protect } = require('../middleware/authMiddleware');

// Multer setup for profile picture uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/uploads/profile-pics/'));
    },
    filename: function (req, file, cb) {
        // req.user should be available after 'protect' middleware
        cb(null, req.user.id + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1024 * 1024 * 2 } }); // 2MB limit

// @desc    Get current user's profile (includes past games)
// @route   GET /api/users/me
// @access  Private
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const pastGames = await QuizResult.find({ user: req.user.id }).sort({ playedAt: -1 }).limit(10);

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePictureUrl: user.profilePictureUrl,
            level: user.level,
            xp: user.xp,
            coins: user.coins,
            stats: user.stats,
            achievements: user.achievements,
            joinedDate: user.joinedDate,
            pastGames: pastGames // Add past games to the response
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Update user's username
// @route   PUT /api/users/me/username
// @access  Private
router.put('/me/username', protect, async (req, res) => {
    const { username } = req.body;
    if (!username || username.trim() === '') {
        return res.status(400).json({ message: 'Username cannot be empty' });
    }
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if new username is already taken by another user
        const existingUser = await User.findOne({ username: username.trim() });
        if (existingUser && existingUser._id.toString() !== user._id.toString()) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        user.username = username.trim();
        await user.save();
        res.json({ message: 'Username updated successfully!', username: user.username });
    } catch (error) {
        console.error('Error updating username:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Update user's profile picture
// @route   POST /api/users/me/profile-picture
// @access  Private
router.post('/me/profile-picture', protect, upload.single('profilePic'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Server stores path relative to the 'public' folder for client access
        const filePath = `/uploads/profile-pics/${req.file.filename}`;
        user.profilePictureUrl = filePath;
        await user.save();
        res.json({ message: 'Profile picture uploaded!', filePath: filePath });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        if (error.message.includes('File too large')) { // From multer limits
             return res.status(400).json({ message: 'File too large. Max 2MB allowed.' });
        }
        res.status(500).json({ message: 'Server error uploading picture.' });
    }
});

module.exports = router;