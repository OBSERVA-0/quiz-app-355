// Global variables
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

// DOM elements
const questionElement = document.querySelector('.question');
const optionButtons = document.querySelectorAll('.option');
const quizContainer = document.querySelector('.quiz-container');

// Add this to your quiz.html before the closing body tag
document.addEventListener('DOMContentLoaded', () => {
  // Fetch questions from JSON file
  fetchQuestions();
  
  // Add event listeners to option buttons
  optionButtons.forEach(button => {
    button.addEventListener('click', checkAnswer);
  });
  
  // Add navigation buttons to HTML
  addNavigationButtons();
});

// Fetch questions from JSON file
async function fetchQuestions() {
  try {
    const response = await fetch('../quiz-questions/questions.json');
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

// Display question and options
function displayQuestion(index) {
  if (index >= selectedQuestions.length) {
    endQuiz();
    return;
  }
  
  const question = selectedQuestions[index];
  questionElement.textContent = question.question;
  
  // Update option buttons
  optionButtons[0].textContent = `A. ${question.A}`;
  optionButtons[1].textContent = `B. ${question.B}`;
  optionButtons[2].textContent = `C. ${question.C}`;
  optionButtons[3].textContent = `D. ${question.D}`;
  
  // Reset button styles
  optionButtons.forEach(button => {
    button.classList.remove('correct', 'incorrect');
    button.disabled = false;
  });
  
  // Update question counter
  updateQuestionCounter(index);
}

// Create and update question counter
function updateQuestionCounter(index) {
  // Find or create the counter element
  let counterElement = document.querySelector('.question-counter');
  if (!counterElement) {
    counterElement = document.createElement('div');
    counterElement.className = 'question-counter';
    document.querySelector('.question-box').prepend(counterElement);
  }
  
  counterElement.textContent = `Question ${index + 1} of ${selectedQuestions.length}`;
}

// Add navigation buttons
function addNavigationButtons() {
  const navDiv = document.createElement('div');
  navDiv.className = 'navigation';
  
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next Question';
  nextButton.className = 'nav-button next-button';
  nextButton.style.display = 'none';
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
    nextButton.style.display = 'none';
  });
  
  navDiv.appendChild(nextButton);
  quizContainer.appendChild(navDiv);
}

// Check answer and update score
function checkAnswer(event) {
  const selectedOption = event.target.textContent[0]; // Get the letter (A, B, C, or D)
  const correctAnswer = selectedQuestions[currentQuestionIndex].answer;
  
  // Disable all buttons to prevent multiple answers
  optionButtons.forEach(button => {
    button.disabled = true;
  });
  
  // Show correct/incorrect feedback
  if (selectedOption === correctAnswer) {
    event.target.classList.add('correct');
    score++;
  } else {
    event.target.classList.add('incorrect');
    // Highlight the correct answer
    optionButtons.forEach(button => {
      if (button.textContent[0] === correctAnswer) {
        button.classList.add('correct');
      }
    });
  }
  
  // Show the next button
  const nextButton = document.querySelector('.next-button');
  
  // If this is the last question, change the text
  if (currentQuestionIndex === selectedQuestions.length - 1) {
    nextButton.textContent = 'See Results';
  }
  
  nextButton.style.display = 'block';
}

// End the quiz and redirect to results page
function endQuiz() {
  // Save score to localStorage for the results page
  localStorage.setItem('score', score);
  localStorage.setItem('totalQuestions', selectedQuestions.length);
  
  // Redirect to results page
  window.location.href = 'result.html';
}

let timer;
let seconds = 0;
let minutes = 0;

// Elements
const timerDisplay = document.getElementById("timer-display");

// Retrieve the timer value from localStorage
window.onload = function() {
  const timerData = JSON.parse(localStorage.getItem('timerTime'));

  if (timerData) {
    // Set the timer to the values stored in localStorage
    minutes = timerData.minutes;
    seconds = timerData.seconds;
  }

  // Update the timer display
  timerDisplay.textContent = formatTime(minutes, seconds);

  // Start the timer
  timer = setInterval(function() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    // Update the display
    timerDisplay.textContent = formatTime(minutes, seconds);

    // Store the updated time in localStorage
    localStorage.setItem('timerTime', JSON.stringify({ minutes, seconds }));
  }, 1000);
};

// Format time as MM:SS
function formatTime(minutes, seconds) {
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

