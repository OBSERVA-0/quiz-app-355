// // // quiz.js
// // // Global variables
// // let questions = [];
// // let currentQuestionIndex = 0;
// // let score = 0;
// // let selectedQuestions = [];
// // let numWrongAnswers = 0;
// // let hearts = 5;
// // let answerSelected = false;

// // // DOM elements
// // let questionElement = document.querySelector('.question');
// // let optionButtons = document.querySelectorAll('.option');
// // let quizContainer = document.querySelector('.quiz-container');
// // let feedbackElement;
// // let nextButton;

// // // 🔊 Sound Effects
// // const coinSounds = [
// //   new Audio('./sound/coinSound.mp3'),
// //   new Audio('./sound/coinSound.mp3'),
// //   new Audio('./sound/coinSound.mp3'),
// // ];
// // const uhOhSound = new Audio('./sound/uhOh.mp3');
// // const victorySound = new Audio('./sound/victory.mp3');

// // // document.addEventListener('DOMContentLoaded', () => {
// // //     fetchQuestions();

// // //     optionButtons.forEach(button => {
// // //         button.addEventListener('click', checkAnswer);
// // //     });

// // //     addNavigationButtons();

// // //     feedbackElement = document.createElement('div');
// // //     feedbackElement.className = 'feedback';
// // //     quizContainer.insertBefore(feedbackElement, quizContainer.firstChild);
// // // });


// // document.addEventListener('DOMContentLoaded', () => {
// //     // Move these inside:
// //     quizContainer = document.querySelector('.quiz-container');
// //     optionButtons = document.querySelectorAll('.option');
// //     questionElement = document.querySelector('.question');

// //     fetchQuestions();

// //     optionButtons.forEach(button => {
// //         button.addEventListener('click', checkAnswer);
// //     });

// //     addNavigationButtons();

// //     feedbackElement = document.createElement('div');
// //     feedbackElement.className = 'feedback';
// //     quizContainer.insertBefore(feedbackElement, quizContainer.firstChild);
// // }); // new line fix *****

// // // async function fetchQuestions() {
// // //     try {
// // //         const response = await fetch('quiz-questions/questions.json');
// // //         const allQuestions = await response.json();
// // //         selectedQuestions = getRandomQuestions(allQuestions, 10);
// // //         displayQuestion(0);
// // //     } catch (error) {
// // //         console.error('Error fetching questions:', error);
// // //         questionElement.textContent = 'Error loading questions. Please try again.';
// // //     }
// // // }

// // // function getRandomQuestions(questions, count) {
// // //     const shuffled = [...questions].sort(() => 0.5 - Math.random());
// // //     return shuffled.slice(0, count);
// // // }
// // // In public/js/quiz.js

// // async function fetchQuestions() {
// //     try {
// //         console.log("Attempting to fetch questions from /api/questions..."); // For debugging
// //         // ---> CHANGE THIS LINE <---
// //         const response = await fetch('/api/questions?count=10'); // Fetch from your backend API
// //                                                             // You can adjust count or add other params here
// //                                                             // e.g., /api/questions?count=15&category=9
// //         if (!response.ok) {
// //             // If the API response is not OK (e.g., 401, 404, 500)
// //             let errorMsg = `Error loading questions. Status: ${response.status}`;
// //             try {
// //                 const errData = await response.json(); // Try to get error message from backend
// //                 errorMsg = errData.message || errorMsg;
// //             } catch (e) { /* Ignore if error response isn't JSON */ }
// //             throw new Error(errorMsg);
// //         }

// //         const questionsFromApi = await response.json();
// //         console.log("Questions received from API:", questionsFromApi); // For debugging

// //         if (!questionsFromApi || questionsFromApi.length === 0) {
// //             throw new Error("No questions received from the API.");
// //         }
        
// //         selectedQuestions = questionsFromApi; // API now returns the selected count and format
// //         // No need for getRandomQuestions if the backend handles selection & formatting
// //         // selectedQuestions = getRandomQuestions(questionsFromApi, 10); // Remove or adapt if backend doesn't randomize/count

// //         displayQuestion(0);

// //     } catch (error) {
// //         console.error('Error fetching questions:', error);
// //         if (questionElement) { // Check if element exists
// //             questionElement.textContent = error.message || 'Error loading questions. Please try again.';
// //         }
// //     }
// // }

// // // function displayQuestion(index) {
// // //     if (index >= selectedQuestions.length) {
// // //         endQuiz();
// // //         return;
// // //     }

// // //     answerSelected = false;
// // //     const question = selectedQuestions[index];
// // //     questionElement.textContent = question.question;

// // //     optionButtons[0].textContent = `A. ${question.A}`;
// // //     optionButtons[1].textContent = `B. ${question.B}`;
// // //     optionButtons[2].textContent = `C. ${question.C}`;
// // //     optionButtons[3].textContent = `D. ${question.D}`;

// // //     optionButtons.forEach(button => {
// // //         button.classList.remove('correct', 'incorrect', 'selected');
// // //         button.disabled = false;
// // //     });

// // //     feedbackElement.textContent = '';
// // //     feedbackElement.className = 'feedback';

// // //     updateQuestionCounter(index);

// // //     if (nextButton) {
// // //         nextButton.style.display = 'none';
// // //     }
// // // }
// // // In public/js/quiz.js

// // // Modify your displayQuestion function:
// // function displayQuestion(index) {
// //     if (index >= selectedQuestions.length) {
// //         endQuiz();
// //         return;
// //     }

// //     answerSelected = false;
// //     const question = selectedQuestions[index];
// //     questionElement.textContent = question.question;

// //     // Option buttons (assuming they are in an array/NodeList called optionButtons)
// //     const optionsData = [question.A, question.B, question.C, question.D];

// //     optionButtons.forEach((button, i) => {
// //         button.classList.remove('correct', 'incorrect', 'selected');
// //         button.disabled = false;

// //         if (optionsData[i]) { // If option data exists for this button
// //             button.textContent = `${String.fromCharCode(65 + i)}. ${optionsData[i]}`;
// //             button.style.display = 'block'; // Show the button
// //         } else {
// //             button.style.display = 'none'; // Hide button if no option (e.g., for C & D in boolean)
// //             button.textContent = '';
// //         }
// //     });

// //     feedbackElement.textContent = '';
// //     feedbackElement.className = 'feedback';
// //     updateQuestionCounter(index);

// //     if (nextButton) {
// //         nextButton.style.display = 'none';
// //     }
// // }

// // // ... rest of your quiz.js ...

// // function updateQuestionCounter(index) {
// //     let counterElement = document.querySelector('.question-counter');
// //     if (!counterElement) {
// //         counterElement = document.createElement('div');
// //         counterElement.className = 'question-counter';
// //         const questionBox = document.querySelector('.question-box');
// //         if (questionBox) {
// //             questionBox.prepend(counterElement);
// //         }
// //     }

// //     counterElement.textContent = `Question ${index + 1} of ${selectedQuestions.length}`;
// // }

// // function addNavigationButtons() {
// //     const navDiv = document.createElement('div');
// //     navDiv.className = 'navigation';

// //     nextButton = document.createElement('button');
// //     nextButton.textContent = 'Next Question';
// //     nextButton.className = 'nav-button next-button';
// //     nextButton.style.display = 'none';
// //     nextButton.addEventListener('click', () => {
// //         if (answerSelected) {
// //             currentQuestionIndex++;
// //             displayQuestion(currentQuestionIndex);
// //         } else {
// //             feedbackElement.textContent = 'Please select an answer before proceeding.';
// //             feedbackElement.className = 'feedback warning-feedback';
// //         }
// //     });

// //     navDiv.appendChild(nextButton);
// //     quizContainer.appendChild(navDiv);
// // }

// // function updateHearts() {
// //     const heartsToDim = Math.floor(numWrongAnswers / 2);
// //     const heartImages = document.querySelectorAll('.hearts img');

// //     heartImages.forEach((heart, index) => {
// //         if (index < heartsToDim) {
// //             heart.classList.add('dimmed');
// //             heart.style.opacity = '0.3';
// //         } else {
// //             heart.classList.remove('dimmed');
// //             heart.style.opacity = '1';
// //         }
// //     });

// //     if (heartsToDim >= hearts) {
// //         endQuiz();
// //     }
// // }

// // function checkAnswer(event) {
// //     optionButtons.forEach(button => button.classList.remove('selected'));
// //     event.target.classList.add('selected');
// //     answerSelected = true;

// //     const selectedOption = event.target.textContent[0];
// //     const correctAnswer = selectedQuestions[currentQuestionIndex].answer;
// //     optionButtons.forEach(button => button.disabled = true);

// //     if (selectedOption === correctAnswer) {
// //         feedbackElement.textContent = 'Correct!';
// //         feedbackElement.className = 'feedback correct-feedback';
// //         score++;
// //         event.target.classList.add('correct');

// //         // 🔊 Play random coin sound
// //         const sound = coinSounds[Math.floor(Math.random() * coinSounds.length)];
// //         sound.currentTime = 0;
// //         sound.play();
// //     } else {
// //         feedbackElement.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
// //         feedbackElement.className = 'feedback incorrect-feedback';
// //         event.target.classList.add('incorrect');

// //         numWrongAnswers++;
// //         updateHearts();

// //         optionButtons.forEach(button => {
// //             if (button.textContent[0] === correctAnswer) {
// //                 button.classList.add('correct');
// //             }
// //         });

// //         // 🔊 Play uh-oh sound
// //         uhOhSound.currentTime = 0;
// //         uhOhSound.play();
// //     }

// //     if (currentQuestionIndex === selectedQuestions.length - 1) {
// //         nextButton.textContent = 'See Results';
// //     }
// //     nextButton.style.display = 'block';
// // }

// // function endQuiz() {
// //     // 🔊 Play victory sound
// //     victorySound.currentTime = 0;
// //     victorySound.play();

// //     localStorage.setItem('quizScore', score);
// //     localStorage.setItem('totalQuestions', selectedQuestions.length);
// //     window.location.href = 'result.html';
// // }

// // let timer;
// // let seconds = 0;
// // let minutes = 0;
// // let timerInterval;

// // const savedTime = localStorage.getItem('countdownTime');
// // let countdownTime = savedTime ? parseInt(savedTime) : 10 * 60 * 1000;

// // function startTimer() {
// //     timerInterval = setInterval(() => {
// //         countdownTime -= 1000;
// //         if (countdownTime <= 0) {
// //             clearInterval(timerInterval);
// //             countdownTime = 0;
// //             window.location.href = 'result.html';
// //         }
// //         updateTimerDisplay(countdownTime);
// //     }, 1000);
// // }

// // function updateTimerDisplay(time) {
// //     const minutes = Math.floor(time / (1000 * 60));
// //     const seconds = Math.floor((time % (1000 * 60)) / 1000);
// //     const formattedTime = `${pad(minutes)}:${pad(seconds)}`;
// //     const timerDisplay = document.getElementById('timer-display');
// //     if (timerDisplay) {
// //         timerDisplay.innerText = formattedTime;
// //     }
// // }

// // function pad(num) {
// //     return num < 10 ? '0' + num : num;
// // }

// // window.onload = function() {
// //     startTimer();
// // };



// // quiz.js
// // Global variables
// let questions = [];
// let currentQuestionIndex = 0;
// let score = 0;
// let selectedQuestions = [];
// let numWrongAnswers = 0;
// let hearts = 5;
// let answerSelected = false;

// let questionElement;
// let optionButtons;
// let quizContainer;
// let feedbackElement;
// let nextButton;

// // 🔊 Sound Effects
// const coinSounds = [
//   new Audio('./sound/coinSound.mp3'),
//   new Audio('./sound/coinSound.mp3'),
//   new Audio('./sound/coinSound.mp3'),
// ];
// const uhOhSound = new Audio('./sound/uhOh.mp3');
// const victorySound = new Audio('./sound/victory.mp3');

// document.addEventListener('DOMContentLoaded', () => {
//     questionElement = document.querySelector('.question');
//     optionButtons = document.querySelectorAll('.option');
//     quizContainer = document.querySelector('.quiz-container');

//     feedbackElement = document.createElement('div');
//     feedbackElement.className = 'feedback';
//     quizContainer.insertBefore(feedbackElement, quizContainer.firstChild);

//     optionButtons.forEach(button => {
//         button.addEventListener('click', checkAnswer);
//     });

//     addNavigationButtons();
//     fetchQuestions();
// });

// // Fetch questions from backend API
// async function fetchQuestions() {
//     try {
//         console.log("Attempting to fetch questions from /api/questions...");
//         const response = await fetch('/api/questions?count=10');

//         if (!response.ok) {
//             let errorMsg = `Error loading questions. Status: ${response.status}`;
//             try {
//                 const errData = await response.json();
//                 errorMsg = errData.message || errorMsg;
//             } catch (e) {}
//             throw new Error(errorMsg);
//         }

//         const questionsFromApi = await response.json();
//         console.log("Questions received from API:", questionsFromApi);

//         if (!questionsFromApi || questionsFromApi.length === 0) {
//             throw new Error("No questions received from the API.");
//         }

//         selectedQuestions = questionsFromApi;
//         displayQuestion(0);

//     } catch (error) {
//         console.error('Error fetching questions:', error);
//         if (questionElement) {
//             questionElement.textContent = error.message || 'Error loading questions. Please try again.';
//         }
//     }
// }

// function displayQuestion(index) {
//     if (index >= selectedQuestions.length) {
//         endQuiz();
//         return;
//     }

//     answerSelected = false;
//     const question = selectedQuestions[index];
//     questionElement.textContent = question.question;

//     const optionsData = [question.A, question.B, question.C, question.D];

//     optionButtons.forEach((button, i) => {
//         button.classList.remove('correct', 'incorrect', 'selected');
//         button.disabled = false;

//         if (optionsData[i]) {
//             button.textContent = `${String.fromCharCode(65 + i)}. ${optionsData[i]}`;
//             button.style.display = 'block';
//         } else {
//             button.style.display = 'none';
//             button.textContent = '';
//         }
//     });

//     feedbackElement.textContent = '';
//     feedbackElement.className = 'feedback';
//     updateQuestionCounter(index);

//     if (nextButton) {
//         nextButton.style.display = 'none';
//     }
// }

// function updateQuestionCounter(index) {
//     let counterElement = document.querySelector('.question-counter');
//     if (!counterElement) {
//         counterElement = document.createElement('div');
//         counterElement.className = 'question-counter';
//         const questionBox = document.querySelector('.question-box');
//         if (questionBox) {
//             questionBox.prepend(counterElement);
//         }
//     }
//     counterElement.textContent = `Question ${index + 1} of ${selectedQuestions.length}`;
// }

// function addNavigationButtons() {
//     const navDiv = document.createElement('div');
//     navDiv.className = 'navigation';

//     nextButton = document.createElement('button');
//     nextButton.textContent = 'Next Question';
//     nextButton.className = 'nav-button next-button';
//     nextButton.style.display = 'none';
//     nextButton.addEventListener('click', () => {
//         if (answerSelected) {
//             currentQuestionIndex++;
//             displayQuestion(currentQuestionIndex);
//         } else {
//             feedbackElement.textContent = 'Please select an answer before proceeding.';
//             feedbackElement.className = 'feedback warning-feedback';
//         }
//     });

//     navDiv.appendChild(nextButton);
//     quizContainer.appendChild(navDiv);
// }

// function updateHearts() {
//     const heartsToDim = Math.floor(numWrongAnswers / 2);
//     const heartImages = document.querySelectorAll('.hearts img');

//     heartImages.forEach((heart, index) => {
//         heart.style.opacity = index < heartsToDim ? '0.3' : '1';
//     });

//     if (heartsToDim >= hearts) {
//         endQuiz();
//     }
// }

// function checkAnswer(event) {
//     optionButtons.forEach(button => button.classList.remove('selected'));
//     event.target.classList.add('selected');
//     answerSelected = true;

//     const selectedOption = event.target.textContent[0];
//     const correctAnswer = selectedQuestions[currentQuestionIndex].answer;
//     optionButtons.forEach(button => button.disabled = true);

//     if (selectedOption === correctAnswer) {
//         feedbackElement.textContent = 'Correct!';
//         feedbackElement.className = 'feedback correct-feedback';
//         score++;
//         event.target.classList.add('correct');
//         const sound = coinSounds[Math.floor(Math.random() * coinSounds.length)];
//         sound.currentTime = 0;
//         sound.play();
//     } else {
//         feedbackElement.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
//         feedbackElement.className = 'feedback incorrect-feedback';
//         event.target.classList.add('incorrect');
//         numWrongAnswers++;
//         updateHearts();

//         optionButtons.forEach(button => {
//             if (button.textContent[0] === correctAnswer) {
//                 button.classList.add('correct');
//             }
//         });

//         uhOhSound.currentTime = 0;
//         uhOhSound.play();
//     }

//     if (currentQuestionIndex === selectedQuestions.length - 1) {
//         nextButton.textContent = 'See Results';
//     }
//     nextButton.style.display = 'block';
// }

// function endQuiz() {
//     victorySound.currentTime = 0;
//     victorySound.play();
//     localStorage.setItem('quizScore', score);
//     localStorage.setItem('totalQuestions', selectedQuestions.length);
//     window.location.href = 'result.html';
// }

// // Timer Logic
// let timerInterval;
// let countdownTime = localStorage.getItem('countdownTime')
//     ? parseInt(localStorage.getItem('countdownTime'))
//     : 10 * 60 * 1000;

// function startTimer() {
//     timerInterval = setInterval(() => {
//         countdownTime -= 1000;
//         if (countdownTime <= 0) {
//             clearInterval(timerInterval);
//             countdownTime = 0;
//             window.location.href = 'result.html';
//         }
//         updateTimerDisplay(countdownTime);
//     }, 1000);
// }

// function updateTimerDisplay(time) {
//     const minutes = Math.floor(time / (1000 * 60));
//     const seconds = Math.floor((time % (1000 * 60)) / 1000);
//     const formattedTime = `${pad(minutes)}:${pad(seconds)}`;
//     const timerDisplay = document.getElementById('timer-display');
//     if (timerDisplay) {
//         timerDisplay.innerText = formattedTime;
//     }
// }

// function pad(num) {
//     return num < 10 ? '0' + num : num;
// }

// window.onload = function () {
//     startTimer();
// };



// quiz.js
// Global variables
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];
let numWrongAnswers = 0;
let hearts = 5; // Initial number of hearts
let answerSelected = false;

// Declare variables for DOM elements; will be assigned in DOMContentLoaded
let questionElement;
let optionButtons; // This will be a NodeList
let quizContainer;
let feedbackElement;
let nextButton;
let timerDisplay;

// 🔊 Sound Effects - Ensure paths are correct relative to quiz.html
const coinSounds = [
    new Audio('./sound/coinSound.mp3'),
    new Audio('./sound/coinSound.mp3'),
    new Audio('./sound/coinSound.mp3'),
];
const uhOhSound = new Audio('./sound/uhOh.mp3');
const victorySound = new Audio('./sound/victory.mp3');

document.addEventListener('DOMContentLoaded', () => {
    // Assign DOM elements now that the DOM is fully loaded
    questionElement = document.querySelector('.question');
    optionButtons = document.querySelectorAll('.option');
    quizContainer = document.querySelector('.quiz-container');
    timerDisplay = document.getElementById('timer-display');

    // --- CRITICAL SAFETY CHECKS ---
    if (!quizContainer) {
        console.error("CRITICAL ERROR (quiz.js): Element with class '.quiz-container' was NOT FOUND in quiz.html when DOMContentLoaded fired. Quiz cannot initialize.");
        document.body.innerHTML = "<h1 style='color:red; text-align:center; font-family: sans-serif; padding: 20px;'>Quiz Initialization Error: Main quiz container missing. Please check quiz.html structure and ensure it's not cached.</h1>";
        return; // Stop all further script execution for the quiz
    }
    if (!questionElement) {
        console.error("CRITICAL ERROR (quiz.js): Element with class '.question' was NOT FOUND. Questions cannot be displayed.");
        quizContainer.innerHTML = "<p style='color:red; text-align:center;'>Error: Question display area missing.</p>";
        return; // Stop further script execution
    }
    if (!optionButtons || optionButtons.length === 0) {
        console.error("CRITICAL ERROR (quiz.js): No elements with class '.option' found. Answer buttons will not work.");
        // Quiz might still load questions but won't be interactive
    }
    if (!timerDisplay) {
        console.warn("Warning (quiz.js): Timer display element with ID 'timer-display' not found. Timer will not be visible.");
    }
    // --- END SAFETY CHECKS ---

    // Create and insert feedback element
    feedbackElement = document.createElement('div');
    feedbackElement.className = 'feedback';
    quizContainer.insertBefore(feedbackElement, quizContainer.firstChild); // This was the error line

    // Add event listeners to option buttons
    if (optionButtons) {
        optionButtons.forEach(button => {
            button.addEventListener('click', checkAnswer);
        });
    }

    addNavigationButtons(); // This function also uses quizContainer
    fetchQuestions();       // This function calls displayQuestion

    // Initialize and start the timer
    countdownTime = localStorage.getItem('countdownTime')
        ? parseInt(localStorage.getItem('countdownTime'))
        : 10 * 60 * 1000; // Default 10 minutes

    if (isNaN(countdownTime) || countdownTime <= 0) {
        console.warn("Invalid countdownTime from localStorage or default, resetting to 10 minutes.");
        countdownTime = 10 * 60 * 1000;
    }
    startTimer();
});

// Fetch questions from backend API
async function fetchQuestions() {
    if (!questionElement) { // Should have been caught by safety check, but good to be defensive
        console.error("fetchQuestions called, but questionElement is not available.");
        return;
    }
    try {
        console.log("Attempting to fetch questions from /api/questions...");
        const urlParams = new URLSearchParams(window.location.search);
        const amount = urlParams.get('amount') || '10';
        const category = urlParams.get('category') || '';

        let apiEndpoint = `/api/questions?count=${encodeURIComponent(amount)}`;
        if (category) {
            apiEndpoint += `&category=${encodeURIComponent(category)}`;
        }

        const response = await fetch(apiEndpoint);

        if (!response.ok) {
            let errorMsg = `Error loading questions. Status: ${response.status}`;
            try {
                const errData = await response.json();
                errorMsg = errData.message || errorMsg;
            } catch (e) { /* Ignore if error response isn't JSON */ }
            throw new Error(errorMsg);
        }

        const questionsFromApi = await response.json();
        console.log("Questions received from API:", questionsFromApi);

        if (!questionsFromApi || questionsFromApi.length === 0) {
            throw new Error("No questions received from the API for the selected criteria.");
        }

        selectedQuestions = questionsFromApi;
        // Reset quiz state for new questions
        currentQuestionIndex = 0;
        score = 0;
        numWrongAnswers = 0;
        answerSelected = false;
        updateHearts(); // Reset hearts display

        displayQuestion(0);

    } catch (error) {
        console.error('Error fetching questions:', error);
        questionElement.textContent = error.message || 'Error loading questions. Please try again.';
        if (optionButtons) optionButtons.forEach(btn => btn.style.display = 'none');
        if(nextButton) nextButton.style.display = 'none';
    }
}

function displayQuestion(index) {
    if (!questionElement || !optionButtons || !feedbackElement) {
        console.error("displayQuestion called but critical DOM elements are missing.");
        return;
    }
    if (index >= selectedQuestions.length) {
        endQuiz();
        return;
    }

    answerSelected = false;
    const question = selectedQuestions[index];
    questionElement.textContent = question.question;

    const optionsData = [question.A, question.B, question.C, question.D];

    optionButtons.forEach((button, i) => {
        button.classList.remove('correct', 'incorrect', 'selected');
        button.disabled = false;

        if (optionsData[i]) {
            button.textContent = `${String.fromCharCode(65 + i)}. ${optionsData[i]}`;
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
            button.textContent = '';
        }
    });

    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    updateQuestionCounter(index);

    if (nextButton) {
        nextButton.style.display = 'none';
        if (index === selectedQuestions.length - 1) {
            nextButton.textContent = 'See Results';
        } else {
            nextButton.textContent = 'Next Question';
        }
    }
}

function updateQuestionCounter(index) {
    if (!quizContainer) return;
    let counterElement = quizContainer.querySelector('.question-counter');
    if (!counterElement) {
        counterElement = document.createElement('div');
        counterElement.className = 'question-counter'; // Style this class in quiz.css
        const questionBox = quizContainer.querySelector('.question-box');
        if (questionBox) {
            questionBox.prepend(counterElement);
        } else {
            // Fallback if .question-box isn't found, though it should be.
            quizContainer.insertBefore(counterElement, quizContainer.firstChild);
        }
    }
    if (selectedQuestions.length > 0) {
        counterElement.textContent = `Question ${index + 1} of ${selectedQuestions.length}`;
    } else {
        counterElement.textContent = '';
    }
}

function addNavigationButtons() {
    if (!quizContainer) return;
    if (quizContainer.querySelector('.navigation')) return; // Avoid adding multiple times

    const navDiv = document.createElement('div');
    navDiv.className = 'navigation'; // Style this class in quiz.css

    nextButton = document.createElement('button');
    nextButton.textContent = 'Next Question';
    nextButton.className = 'nav-button next-button'; // Style these classes
    nextButton.style.display = 'none';

    nextButton.addEventListener('click', () => {
        if (answerSelected) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        } else {
            if (feedbackElement) {
                feedbackElement.textContent = 'Please select an answer before proceeding.';
                feedbackElement.className = 'feedback warning-feedback'; // Style this for warnings
            }
        }
    });

    navDiv.appendChild(nextButton);
    quizContainer.appendChild(navDiv);
}

function updateHearts() {
    const heartImages = document.querySelectorAll('.hearts img');
    // if (heartImages.length === 0 && hearts > 0) {
    //     console.warn("Heart image elements not found for updating.");
    // } // This might be too noisy if hearts are optional.
    const heartsToDim = Math.floor(numWrongAnswers / 2); // Or your specific logic

    heartImages.forEach((heart, index) => {
        heart.style.opacity = index < heartsToDim ? '0.3' : '1';
    });

    if (heartsToDim >= hearts && selectedQuestions.length > 0 && currentQuestionIndex < selectedQuestions.length) {
        console.log("Out of hearts! Ending quiz.");
        endQuiz();
    }
}

function checkAnswer(event) {
    if (answerSelected) return; // Prevent re-answering

    answerSelected = true;
    optionButtons.forEach(button => {
        button.classList.remove('selected');
        button.disabled = true;
    });
    event.target.classList.add('selected');

    const selectedOptionLetter = event.target.textContent.charAt(0);
    const currentQ = selectedQuestions[currentQuestionIndex];
    const correctAnswerLetter = currentQ.answer;

    if (selectedOptionLetter === correctAnswerLetter) {
        feedbackElement.textContent = 'Correct!';
        feedbackElement.className = 'feedback correct-feedback';
        score++;
        event.target.classList.add('correct');
        try {
            const sound = coinSounds[Math.floor(Math.random() * coinSounds.length)];
            if(sound) { sound.currentTime = 0; sound.play().catch(e=>console.warn("Sound play error", e)); }
        } catch(e) { console.warn("Sound error", e); }
    } else {
        feedbackElement.textContent = `Incorrect. The correct answer is ${correctAnswerLetter}. ${currentQ[correctAnswerLetter] || ''}`;
        feedbackElement.className = 'feedback incorrect-feedback';
        event.target.classList.add('incorrect');
        numWrongAnswers++;
        updateHearts();

        optionButtons.forEach(button => {
            if (button.textContent.charAt(0) === correctAnswerLetter) {
                button.classList.add('correct');
            }
        });
        try {
            if(uhOhSound) { uhOhSound.currentTime = 0; uhOhSound.play().catch(e=>console.warn("Sound play error", e)); }
        } catch(e) { console.warn("Sound error", e); }
    }

    if (nextButton) { // Ensure nextButton exists
        if (currentQuestionIndex === selectedQuestions.length - 1) {
            nextButton.textContent = 'See Results';
        }
        nextButton.style.display = 'block';
    }
}

async function endQuiz() {
    console.log(`Quiz ended. Final Score: ${score}/${selectedQuestions.length}`);
    try {
        if (victorySound) {
            victorySound.currentTime = 0;
            victorySound.play().catch(e => console.warn("Victory sound play failed:", e));
        }
    } catch(e) { console.warn("Error with victory sound:", e); }

    const quizResultData = {
        score: score,
        totalQuestions: selectedQuestions.length > 0 ? selectedQuestions.length : 0 // Ensure totalQuestions is not undefined if array is empty
    };

    console.log("Attempting to POST to /api/quizzes/submit with data:", quizResultData); // DEBUG

    try {
        const response = await fetch('/api/quizzes/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizResultData)
        });
        if (response.ok) {
            const result = await response.json();
            console.log('Quiz results submitted successfully to server:', result);
        } else {
            const errData = await response.json().catch(() => ({ message: "Server returned non-JSON error or no body." }));
            console.error('Error submitting quiz results to server:', response.status, errData.message || response.statusText);
        }
    } catch (error) {
        console.error("Network or other error submitting quiz results:", error);
    } finally {
        localStorage.setItem('quizScore', score);
        localStorage.setItem('totalQuestions', selectedQuestions.length > 0 ? selectedQuestions.length : 0);
        window.location.href = 'result.html';
    }
}

// Timer Logic
let timerInterval;
let countdownTime; // Initialized in DOMContentLoaded

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    if (!timerDisplay) { // Check if timer display exists before starting
        console.warn("Timer cannot start: timerDisplay element not found.");
        return;
    }

    updateTimerDisplay(countdownTime);

    timerInterval = setInterval(() => {
        countdownTime -= 1000;
        if (countdownTime < 0) {
            clearInterval(timerInterval);
            countdownTime = 0;
            if (selectedQuestions.length > 0 && currentQuestionIndex < selectedQuestions.length) {
                console.log("Timer ran out! Ending quiz.");
                endQuiz();
            }
        }
        updateTimerDisplay(countdownTime);
    }, 1000);
}

function updateTimerDisplay(time) {
    if (!timerDisplay) return;
    const minutes = Math.floor(Math.max(0, time) / (1000 * 60));
    const seconds = Math.floor(Math.max(0, time) % (1000 * 60) / 1000);
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Removed global window.onload for startTimer as it's handled in DOMContentLoaded

