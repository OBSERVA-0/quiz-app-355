// quiz.js
// Global variables
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];
let numWrongAnswers = 0; // Track the number of wrong answers
let hearts = 5; // Total number of hearts (we start with 5 hearts)
let answerSelected = false; // Track if an answer was selected for the current question

// DOM elements
const questionElement = document.querySelector('.question');
const optionButtons = document.querySelectorAll('.option');
const quizContainer = document.querySelector('.quiz-container');
let feedbackElement; // To display right/wrong feedback
let nextButton;

document.addEventListener('DOMContentLoaded', () => {
    // Fetch questions from JSON file
    fetchQuestions();

    // Add event listeners to option buttons
    optionButtons.forEach(button => {
        button.addEventListener('click', checkAnswer);
    });

    // Add navigation buttons to HTML
    addNavigationButtons();

    // Create feedback element
    feedbackElement = document.createElement('div');
    feedbackElement.className = 'feedback';
    quizContainer.insertBefore(feedbackElement, quizContainer.firstChild); // Add feedback at the top
});

// Fetch questions from JSON file
async function fetchQuestions() {
    try {
        const response = await fetch('quiz-questions/questions.json');
        const allQuestions = await response.json();

        // Randomly select 10 questions
        selectedQuestions = getRandomQuestions(allQuestions, 10);

        // Display the first question
        displayQuestion(0);
    } catch (error) {
        console.error('Error fetching questions:', error);
        questionElement.textContent = 'Error loading questions. Please try again.';
    }
}

// Get random questions from the pool
function getRandomQuestions(questions, count) {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayQuestion(index) {
    if (index >= selectedQuestions.length) {
        endQuiz();
        return;
    }

    // Reset the answerSelected flag for new question
    answerSelected = false;

    const question = selectedQuestions[index];
    questionElement.textContent = question.question;

    // Update option buttons
    optionButtons[0].textContent = `A. ${question.A}`;
    optionButtons[1].textContent = `B. ${question.B}`;
    optionButtons[2].textContent = `C. ${question.C}`;
    optionButtons[3].textContent = `D. ${question.D}`;

    // Reset button styles and enable them
    optionButtons.forEach(button => {
        button.classList.remove('correct', 'incorrect', 'selected'); // Remove all old styles
        button.disabled = false;
    });

    // Clear any previous feedback
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback'; // Reset feedback class

    // Update question counter
    updateQuestionCounter(index);
    
    // Hide the next button until an answer is selected
    if (nextButton) {
        nextButton.style.display = 'none';
    }
}


// Create and update question counter
function updateQuestionCounter(index) {
    // Find or create the counter element
    let counterElement = document.querySelector('.question-counter');
    if (!counterElement) {
        counterElement = document.createElement('div');
        counterElement.className = 'question-counter';
        const questionBox = document.querySelector('.question-box');
        if (questionBox) {
            questionBox.prepend(counterElement);
        }
    }

    counterElement.textContent = `Question ${index + 1} of ${selectedQuestions.length}`;
}

// Add navigation buttons
function addNavigationButtons() {
    const navDiv = document.createElement('div');
    navDiv.className = 'navigation';

    nextButton = document.createElement('button');
    nextButton.textContent = 'Next Question';
    nextButton.className = 'nav-button next-button';
    nextButton.style.display = 'none';
    nextButton.addEventListener('click', () => {
        // Only allow proceeding if an answer was selected
        if (answerSelected) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        } else {
            // Optionally  a message reminding user to select an answer
            feedbackElement.textContent = 'Please select an answer before proceeding.';
            feedbackElement.className = 'feedback warning-feedback';
        }
    });

    navDiv.appendChild(nextButton);
    quizContainer.appendChild(navDiv);
}

// Update hearts display based on wrong answers
function updateHearts() {
    // Calculate how many hearts to dim (every 2 wrong answers = 1 heart lost)
    const heartsToDim = Math.floor(numWrongAnswers / 2);
    
    // Get all heart images
    const heartImages = document.querySelectorAll('.hearts img');
    
    // Update the hearts (dim the appropriate number of hearts)
    heartImages.forEach((heart, index) => {
        if (index < heartsToDim) {
            // Dim this heart (apply a dimmed class or directly modify its opacity)
            heart.classList.add('dimmed');
            heart.style.opacity = '0.3'; // Make the heart appear dimmed
        } else {
            // Ensure the heart is not dimmed
            heart.classList.remove('dimmed');
            heart.style.opacity = '1';
        }
    });
    
    // Check if all hearts are lost (game over condition)
    if (heartsToDim >= hearts) {
        // All hearts are lost, end the quiz
        endQuiz();
    }
}

function checkAnswer(event) {
    // Remove previous 'selected' class from all buttons
    optionButtons.forEach(button => button.classList.remove('selected'));

    // Add 'selected' class to the clicked one
    event.target.classList.add('selected');

    // Set the answerSelected flag to true
    answerSelected = true;

    const selectedOption = event.target.textContent[0]; // A, B, C, or D
    const correctAnswer = selectedQuestions[currentQuestionIndex].answer;

    // Disable all option buttons
    optionButtons.forEach(button => button.disabled = true);

    // Provide feedback
    if (selectedOption === correctAnswer) {
        feedbackElement.textContent = 'Correct!';
        feedbackElement.className = 'feedback correct-feedback';
        score++;
        event.target.classList.add('correct');
    } else {
        feedbackElement.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
        feedbackElement.className = 'feedback incorrect-feedback';
        event.target.classList.add('incorrect');
        
        // Increment wrong answer count and update hearts
        numWrongAnswers++;
        updateHearts();
        
        // Highlight the correct answer
        optionButtons.forEach(button => {
            if (button.textContent[0] === correctAnswer) {
                button.classList.add('correct');
            }
        });
    }
    
    // Show the next button now that an answer is selected
    if (currentQuestionIndex === selectedQuestions.length - 1) {
        nextButton.textContent = 'See Results';
    }
    nextButton.style.display = 'block';
}

// End the quiz and redirect to results page
function endQuiz() {
    localStorage.setItem('quizScore', score);
    localStorage.setItem('totalQuestions', selectedQuestions.length);
    window.location.href = 'result.html';
}


let timer;
let seconds = 0;
let minutes = 0;
let timerInterval; // Declare timerInterval outside startTimer

// Retrieve the saved countdown time from localStorage
const savedTime = localStorage.getItem('countdownTime');
let countdownTime;
if (savedTime) {
    countdownTime = parseInt(savedTime);  // Get the time that was saved from the home screen
} else {
    countdownTime = 10 * 60 * 1000;  // Default to 10 minutes if no saved time exists
}

function startTimer() {
    // Start the timer countdown
    timerInterval = setInterval(() => {
        countdownTime -= 1000;  // Decrease by 1 second (1000 milliseconds)
        if (countdownTime <= 0) {
            clearInterval(timerInterval);  // Stop the timer once it reaches 0
            countdownTime = 0;  // Ensure the timer does not go negative
            window.location.href = 'result.html';
        }
        updateTimerDisplay(countdownTime);
    }, 1000);
}

// Update timer display
function updateTimerDisplay(time) {
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const formattedTime = `${pad(minutes)}:${pad(seconds)}`;
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.innerText = formattedTime;
    }
}

// Utility function to pad minutes/seconds
function pad(num) {
    return num < 10 ? '0' + num : num;
}

// Start the timer when the page is loaded
window.onload = function() {
    startTimer();
};