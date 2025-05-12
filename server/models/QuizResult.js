const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    percentage: { // Calculated on save
        type: Number
    },
    xpEarned: {
        type: Number,
        default: 0
    },
    coinsEarned: {
        type: Number,
        default: 0
    },
    // You could store the specific questions and answers if needed for detailed review
    // questionsAttempted: [{
    //     question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    //     selectedAnswer: String,
    //     isCorrect: Boolean
    // }],
    playedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

quizResultSchema.pre('save', function(next) {
    if (this.totalQuestions > 0) {
        this.percentage = Math.round((this.score / this.totalQuestions) * 100);
    } else {
        this.percentage = 0;
    }
    // Simple XP and coin calculation (can be more complex)
    this.xpEarned = this.score * 2; // e.g., 2 XP per correct answer
    this.coinsEarned = this.score;  // e.g., 1 coin per correct answer
    next();
});

module.exports = mongoose.model('QuizResult', quizResultSchema);