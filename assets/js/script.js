//4 Coding Quiz questions with 4 possible answers
const questions = [
    {
        question: "What does the keyword '" + "this" + "' refer to in JavaScript?",
        answers: ["Refers to the current HTML element", "Refers to the current function", "Refers to the current object", " Refers to the global object"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "What is the purpose of the '" + "git clone" + "'command in Git?",
        answers: ["To create a new Git repository", "To create a local copy of an existing Git repository", "To merge two branches in Git", "To delete a Git repository"],
        correctAnswer: "To create a local copy of an existing Git repository"
    },
    {
        question: "In HTML, which tag is used to create a hyperlink?",
        answers: ["<link>", "<a>", "<href>", "<hyperlink>"],
        correctAnswer: "<a>"
    },
    {
        question: "What does the CSS property '" + "display: none;" + " do?",
        answers: ["Hides an element from the page without affecting layout", "Removes an element from the DOM", "Shows an element on the page", "Makes an element semi-transparent"],
        correctAnswer: "Hides an element from the page without affecting layout"
    }
    

];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

const quizStart = document.getElementById("quiz-start");
const quizContainer = document.getElementById("quiz");
const questionDisplay = document.getElementById("question");
const answersDisplay = document.getElementById("answers");
const wrongAnswerDisplay = document.getElementById("wrongAnswer");
const correctAnswerDisplay = document.getElementById("correctAnswer");
const timerDisplay = document.getElementById("time-left");
const gameOverScreen = document.getElementById("game-over");
const initialsForm = document.getElementById("initials-form");
const highscoresList = document.getElementById("highscores");
const highscoresLink = document.getElementById("highscores-link");

function startQuiz() {
    quizStart.classList.add("hidden");
    startTimer();
    showQuestion();
    quizContainer.classList.remove("hidden");
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionDisplay.textContent = currentQuestion.question;
    answersDisplay.innerHTML = "";
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(answer));
        answersDisplay.appendChild(button);
    });
}

function checkAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            gameOver();
        }
    } else {
        wrongAnswerDisplay.classList.remove("hidden");
        setTimeout(() => {
            wrongAnswerDisplay.classList.add("hidden");
        }, 1000);
        currentQuestionIndex++; // Move to the next question even if the answer is wrong
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            gameOver();
        }
    }
}
//if user does not anwser the quiz with 60 second it goes to this or complete the quiz 
function gameOver() {
    quizContainer.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");
    clearInterval(timerInterval);
    initialsForm.addEventListener("submit", saveHighscore);
    highscoresLink.classList.remove("hidden");
}

//once, user submit the intitials, it saves to local storage with key 'Scores' with intial and score
function saveHighscore(event) {
    event.preventDefault();
    const initials = document.getElementById("initials").value.toUpperCase();
    const score = timeLeft;
    const highscoreData = JSON.parse(localStorage.getItem("Scores")) || [];
    highscoreData.push({ initials, score });
    highscoreData.sort((a, b) => b.score - a.score);
    localStorage.setItem("Scores", JSON.stringify(highscoreData));
    displayHighscores();
}

//displying all the data from local storage from key 'scores' and adding html elements <li> to highscoresList
function displayHighscores() {
    const highscoreData = JSON.parse(localStorage.getItem("Scores")) || [];
    highscoresList.innerHTML = highscoreData.map(data => `<li>${data.initials}: <span>${data.score}</span></li>`).join('');
}

highscoresLink.addEventListener("click", () => {
    gameOverScreen.classList.add("hidden");
    quizStart.classList.add("hidden");
    quizContainer.classList.add("hidden");
    highscoresList.classList.remove("hidden");
});

document.getElementById("start-button").addEventListener("click", startQuiz);
