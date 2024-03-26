const questions = [
    {
        question: "What does HTML stand for?",
        answers: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "Which of the following is a JavaScript data type?",
        answers: ["Boolean", "Number", "String", "All of the above"],
        correctAnswer: "All of the above"
    }
];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

const quizStart = document.getElementById("quiz-start");
const quizContainer = document.getElementById("quiz");
const questionDisplay = document.getElementById("question");
const answersDisplay = document.getElementById("answers");
const feedbackDisplay = document.getElementById("feedback");
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
        feedbackDisplay.classList.remove("hidden");
        setTimeout(() => {
            feedbackDisplay.classList.add("hidden");
        }, 1000);
        currentQuestionIndex++; // Move to the next question even if the answer is wrong
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            gameOver();
        }
    }
}

function gameOver() {
    quizContainer.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");
    clearInterval(timerInterval);
    initialsForm.addEventListener("submit", saveHighscore);
    highscoresLink.classList.remove("hidden");
}

function saveHighscore(event) {
    event.preventDefault();
    const initials = document.getElementById("initials").value.toUpperCase();
    const score = timeLeft;
    const highscoreData = JSON.parse(localStorage.getItem("highscores")) || [];
    highscoreData.push({ initials, score });
    highscoreData.sort((a, b) => b.score - a.score);
    localStorage.setItem("highscores", JSON.stringify(highscoreData));
    displayHighscores();
}

function displayHighscores() {
    const highscoreData = JSON.parse(localStorage.getItem("highscores")) || [];
    highscoresList.innerHTML = highscoreData.map(data => `<li>${data.initials}: <span>${data.score}</span></li>`).join('');
}

highscoresLink.addEventListener("click", () => {
    gameOverScreen.classList.add("hidden");
    quizStart.classList.add("hidden");
    quizContainer.classList.add("hidden");
    highscoresList.classList.remove("hidden");
});

document.getElementById("start-button").addEventListener("click", startQuiz);
