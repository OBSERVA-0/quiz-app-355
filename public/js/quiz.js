// quiz.js
// Global variables
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];
let numWrongAnswers = 0;
let hearts = 5;
let answerSelected = false;

// DOM elements
const questionElement = document.querySelector('.question');
const optionButtons = document.querySelectorAll('.option');
const quizContainer = document.querySelector('.quiz-container');
let feedbackElement;
let nextButton;

// 🔊 Sound Effects
const coinSounds = [
  new Audio('./sound/coinSound.mp3'),
  new Audio('./sound/coinSound.mp3'),
  new Audio('./sound/coinSound.mp3'),
];
const uhOhSound = new Audio('./sound/uhOh.mp3');
const victorySound = new Audio('./sound/victory.mp3');

document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();

    optionButtons.forEach(button => {
        button.addEventListener('click', checkAnswer);
    });

    addNavigationButtons();

    feedbackElement = document.createElement('div');
    feedbackElement.className = 'feedback';
    quizContainer.insertBefore(feedbackElement, quizContainer.firstChild);
});

// async function fetchQuestions() {
//     try {
//         const response = await fetch('quiz-questions/questions.json');
//         const allQuestions = await response.json();
//         selectedQuestions = getRandomQuestions(allQuestions, 10);
//         displayQuestion(0);
//     } catch (error) {
//         console.error('Error fetching questions:', error);
//         questionElement.textContent = 'Error loading questions. Please try again.';
//     }
// }

// function getRandomQuestions(questions, count) {
//     const shuffled = [...questions].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
// }
// In public/js/quiz.js

async function fetchQuestions() {
    try {
        console.log("Attempting to fetch questions from /api/questions..."); // For debugging
        // ---> CHANGE THIS LINE <---
        const response = await fetch('/api/questions?count=10'); // Fetch from your backend API
                                                            // You can adjust count or add other params here
                                                            // e.g., /api/questions?count=15&category=9

        if (!response.ok) {
            // If the API response is not OK (e.g., 401, 404, 500)
            let errorMsg = `Error loading questions. Status: ${response.status}`;
            try {
                const errData = await response.json(); // Try to get error message from backend
                errorMsg = errData.message || errorMsg;
            } catch (e) { /* Ignore if error response isn't JSON */ }
            throw new Error(errorMsg);
        }

        const questionsFromApi = await response.json();
        console.log("Questions received from API:", questionsFromApi); // For debugging

        if (!questionsFromApi || questionsFromApi.length === 0) {
            throw new Error("No questions received from the API.");
        }
        
        selectedQuestions = questionsFromApi; // API now returns the selected count and format
        // No need for getRandomQuestions if the backend handles selection & formatting
        // selectedQuestions = getRandomQuestions(questionsFromApi, 10); // Remove or adapt if backend doesn't randomize/count

        displayQuestion(0);

    } catch (error) {
        console.error('Error fetching questions:', error);
        if (questionElement) { // Check if element exists
            questionElement.textContent = error.message || 'Error loading questions. Please try again.';
        }
    }
}

// function displayQuestion(index) {
//     if (index >= selectedQuestions.length) {
//         endQuiz();
//         return;
//     }

//     answerSelected = false;
//     const question = selectedQuestions[index];
//     questionElement.textContent = question.question;

//     optionButtons[0].textContent = `A. ${question.A}`;
//     optionButtons[1].textContent = `B. ${question.B}`;
//     optionButtons[2].textContent = `C. ${question.C}`;
//     optionButtons[3].textContent = `D. ${question.D}`;

//     optionButtons.forEach(button => {
//         button.classList.remove('correct', 'incorrect', 'selected');
//         button.disabled = false;
//     });

//     feedbackElement.textContent = '';
//     feedbackElement.className = 'feedback';

//     updateQuestionCounter(index);

//     if (nextButton) {
//         nextButton.style.display = 'none';
//     }
// }
// In public/js/quiz.js

// Modify your displayQuestion function:
function displayQuestion(index) {
    if (index >= selectedQuestions.length) {
        endQuiz();
        return;
    }

    answerSelected = false;
    const question = selectedQuestions[index];
    questionElement.textContent = question.question;

    // Option buttons (assuming they are in an array/NodeList called optionButtons)
    const optionsData = [question.A, question.B, question.C, question.D];

    optionButtons.forEach((button, i) => {
        button.classList.remove('correct', 'incorrect', 'selected');
        button.disabled = false;

        if (optionsData[i]) { // If option data exists for this button
            button.textContent = `${String.fromCharCode(65 + i)}. ${optionsData[i]}`;
            button.style.display = 'block'; // Show the button
        } else {
            button.style.display = 'none'; // Hide button if no option (e.g., for C & D in boolean)
            button.textContent = '';
        }
    });

    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    updateQuestionCounter(index);

    if (nextButton) {
        nextButton.style.display = 'none';
    }
}

// ... rest of your quiz.js ...

function updateQuestionCounter(index) {
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

function addNavigationButtons() {
    const navDiv = document.createElement('div');
    navDiv.className = 'navigation';

    nextButton = document.createElement('button');
    nextButton.textContent = 'Next Question';
    nextButton.className = 'nav-button next-button';
    nextButton.style.display = 'none';
    nextButton.addEventListener('click', () => {
        if (answerSelected) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        } else {
            feedbackElement.textContent = 'Please select an answer before proceeding.';
            feedbackElement.className = 'feedback warning-feedback';
        }
    });

    navDiv.appendChild(nextButton);
    quizContainer.appendChild(navDiv);
}

function updateHearts() {
    const heartsToDim = Math.floor(numWrongAnswers / 2);
    const heartImages = document.querySelectorAll('.hearts img');

    heartImages.forEach((heart, index) => {
        if (index < heartsToDim) {
            heart.classList.add('dimmed');
            heart.style.opacity = '0.3';
        } else {
            heart.classList.remove('dimmed');
            heart.style.opacity = '1';
        }
    });

    if (heartsToDim >= hearts) {
        endQuiz();
    }
}

function checkAnswer(event) {
    optionButtons.forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    answerSelected = true;

    const selectedOption = event.target.textContent[0];
    const correctAnswer = selectedQuestions[currentQuestionIndex].answer;
    optionButtons.forEach(button => button.disabled = true);

    if (selectedOption === correctAnswer) {
        feedbackElement.textContent = 'Correct!';
        feedbackElement.className = 'feedback correct-feedback';
        score++;
        event.target.classList.add('correct');

        // 🔊 Play random coin sound
        const sound = coinSounds[Math.floor(Math.random() * coinSounds.length)];
        sound.currentTime = 0;
        sound.play();
    } else {
        feedbackElement.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
        feedbackElement.className = 'feedback incorrect-feedback';
        event.target.classList.add('incorrect');

        numWrongAnswers++;
        updateHearts();

        optionButtons.forEach(button => {
            if (button.textContent[0] === correctAnswer) {
                button.classList.add('correct');
            }
        });

        // 🔊 Play uh-oh sound
        uhOhSound.currentTime = 0;
        uhOhSound.play();
    }

    if (currentQuestionIndex === selectedQuestions.length - 1) {
        nextButton.textContent = 'See Results';
    }
    nextButton.style.display = 'block';
}

function endQuiz() {
    // 🔊 Play victory sound
    victorySound.currentTime = 0;
    victorySound.play();

    localStorage.setItem('quizScore', score);
    localStorage.setItem('totalQuestions', selectedQuestions.length);
    window.location.href = 'result.html';
}

let timer;
let seconds = 0;
let minutes = 0;
let timerInterval;

const savedTime = localStorage.getItem('countdownTime');
let countdownTime = savedTime ? parseInt(savedTime) : 10 * 60 * 1000;

function startTimer() {
    timerInterval = setInterval(() => {
        countdownTime -= 1000;
        if (countdownTime <= 0) {
            clearInterval(timerInterval);
            countdownTime = 0;
            window.location.href = 'result.html';
        }
        updateTimerDisplay(countdownTime);
    }, 1000);
}

function updateTimerDisplay(time) {
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const formattedTime = `${pad(minutes)}:${pad(seconds)}`;
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.innerText = formattedTime;
    }
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

window.onload = function() {
    startTimer();
};
