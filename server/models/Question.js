const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    A: { type: String, required: true },
    B: { type: String, required: true },
    C: { type: String, required: true },
    D: { type: String, required: true },
    answer: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D'] // Ensures answer is one of these
    },
    category: {
        type: String,
        default: 'General Knowledge' // Example category
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);