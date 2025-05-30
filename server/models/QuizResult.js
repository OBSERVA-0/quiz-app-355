// const mongoose = require('mongoose');
// const quizResultSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     score: {
//         type: Number,
//         required: true
//     },
//     totalQuestions: {
//         type: Number,
//         required: true
//     },
//     percentage: { // Calculated on save
//         type: Number
//     },
//     xpEarned: {
//         type: Number,
//         default: 0
//     },
//     coinsEarned: {
//         type: Number,
//         default: 0
//     },
//     // You could store the specific questions and answers if needed for detailed review
//     // questionsAttempted: [{
//     //     question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
//     //     selectedAnswer: String,
//     //     isCorrect: Boolean
//     // }],
//     playedAt: {
//         type: Date,
//         default: Date.now
//     }
// }, { timestamps: true });

// quizResultSchema.pre('save', function(next) {
//     if (this.totalQuestions > 0) {
//         this.percentage = Math.round((this.score / this.totalQuestions) * 100);
//     } else {
//         this.percentage = 0;
//     }
//     // Simple XP and coin calculation (can be more complex)
//     this.xpEarned = this.score * 2; // e.g., 2 XP per correct answer
//     this.coinsEarned = this.score;  // e.g., 1 coin per correct answer
//     next();
// });

// module.exports = mongoose.model('QuizResult', quizResultSchema);


// server/models/QuizResult.js
const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required for a quiz result.'] // Added custom message
    },
    score: {
        type: Number,
        required: [true, 'Score is required for a quiz result.']
    },
    totalQuestions: {
        type: Number,
        required: [true, 'Total questions are required for a quiz result.']
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
    playedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

quizResultSchema.pre('save', function(next) {
    console.log('--- QuizResult pre-save hook ENTERED ---'); // DEBUG
    console.log('Data before calculation:', {
        score: this.score,
        totalQuestions: this.totalQuestions,
        typeOfScore: typeof this.score // Check type
    }); // DEBUG

    try {
        if (this.totalQuestions > 0) {
            this.percentage = Math.round((Number(this.score) / Number(this.totalQuestions)) * 100);
        } else {
            this.percentage = 0;
        }

        // Ensure score is treated as a number for calculations
        const numericScore = Number(this.score) || 0; // Default to 0 if score is NaN or undefined

        this.xpEarned = numericScore * 2; // e.g., 2 XP per correct answer
        this.coinsEarned = numericScore;  // e.g., 1 coin per correct answer

        console.log('Data AFTER calculation (in pre-save):', { // DEBUG
            percentage: this.percentage,
            xpEarned: this.xpEarned,
            coinsEarned: this.coinsEarned
        });
        next(); // Proceed with saving
    } catch (error) {
        console.error('!!! ERROR in QuizResult pre-save hook:', error); // DEBUG
        next(error); // Pass error to Mongoose to stop save and propagate error
    }
});

module.exports = mongoose.model('QuizResult', quizResultSchema);
