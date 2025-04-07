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

  // Reset button styles and enable them
  optionButtons.forEach(button => {
    button.classList.remove('correct', 'incorrect', 'selected'); // Remove all old styles
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
// function checkAnswer(event) {
//   const selectedOption = event.target.textContent[0]; // Get the letter (A, B, C, or D)
//   const correctAnswer = selectedQuestions[currentQuestionIndex].answer;
  
//   // Disable all buttons to prevent multiple answers
//   optionButtons.forEach(button => {
//     button.disabled = true;
//   });
  
//   // Show correct/incorrect feedback
//   if (selectedOption === correctAnswer) {
//     event.target.classList.add('correct');
//     score++;
//   } else {
//     event.target.classList.add('incorrect');
//     // Highlight the correct answer
//     optionButtons.forEach(button => {
//       if (button.textContent[0] === correctAnswer) {
//         button.classList.add('correct');
//       }
//     });
//   }
  
//   // Show the next button
//   const nextButton = document.querySelector('.next-button');
  
//   // If this is the last question, change the text
//   if (currentQuestionIndex === selectedQuestions.length - 1) {
//     nextButton.textContent = 'See Results';
//   }
  
//   nextButton.style.display = 'block';
// }
function checkAnswer(event) {
  // Remove previous 'selected' class from all buttons
  optionButtons.forEach(button => button.classList.remove('selected'));

  // Add 'selected' class to the clicked one
  event.target.classList.add('selected');

  const selectedOption = event.target.textContent[0]; // A, B, C, or D
  const correctAnswer = selectedQuestions[currentQuestionIndex].answer;

  // Show correct/incorrect feedback
  if (selectedOption === correctAnswer) {
    event.target.classList.add('correct');
    score++;
  } else {
    event.target.classList.add('incorrect');
    optionButtons.forEach(button => {
      if (button.textContent[0] === correctAnswer) {
        button.classList.add('correct');
      }
    });
  }

  const nextButton = document.querySelector('.next-button');
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

// Retrieve the saved countdown time from localStorage
const savedTime = localStorage.getItem('countdownTime');
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
    }
    updateTimerDisplay(countdownTime);
  }, 1000);
}

// Update timer display
function updateTimerDisplay(time) {
  const minutes = Math.floor(time / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const formattedTime = `${pad(minutes)}:${pad(seconds)}`;
  document.getElementById('timer-display').innerText = formattedTime;
}

// Utility function to pad minutes/seconds
function pad(num) {
  return num < 10 ? '0' + num : num;
}

// Start the timer when the page is loaded
window.onload = function() {
  startTimer();
};
