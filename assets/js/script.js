//4 Coding Quiz questions with 4 possible answers
const questions = [
    {
        question: "What does the keyword '" + "this" + "' refer to in JavaScript?",
        answers: ["Refers to the current HTML element", "Refers to the current function", "Refers to the current object", " Refers to the global object"],
        correctAnswer: "Refers to the current object"
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
//set block scope only accessed inside scope 
let currentQuestionIndex = 0;
//set time to 60 seconds
let timeLeft = 60;
let timerInterval;
//set value to 0 to start and laster use thes variable to caculate scores
//var can change the vaiable
var correctAnswer = 0;
var wrongAnswer = 0;
var scoresPercentage = 0;
var gameOverHeading = document.getElementById("game-over-heading");
//getElementById from HTML
//const can not change variable, but array const can be changed
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
const titleHeading = document.getElementById("Title-heading");
const titleDescription = document.getElementById("Title-Description");
const startButton = document.getElementById("start-button")
const gobackButton = document.getElementById("Goback-button")
const clearButton =document.getElementById("Clear-button")
const highscoretext =document.getElementById("High-Scores_Display")

//show contents on titleheaing and titledescription at begining 
titleHeading.classList.remove("hidden")
titleDescription.classList.remove("hidden")

//function startQuiz
function startQuiz() {
    scoresPercentage = 0
   //hide contents on titleheaing and titledescription
   titleHeading.classList.add("hidden")
   titleDescription.classList.add("hidden")
   //console.log (quizTittle.innerHTML)
    quizStart.classList.add("hidden");
    startTimer();
    showQuestion();
    quizContainer.classList.remove("hidden");
}
//time function
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
       //if Quiz is not answered within 60 second, it goes to gamover()
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
    var answerOrder;  

    for (let i = 0; i < currentQuestion.answers.length; i++) {
        const answer = currentQuestion.answers[i];
        const button = document.createElement("button");
        answerOrder = i + 1  

        button.textContent = answerOrder +" "+ answer;
        button.addEventListener("click", function() {
            checkAnswer(answer);
        });
        answersDisplay.appendChild(button);
    }
}


function checkAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
        //if answer is correct display 'Correct Answer!" for one second
        correctAnswerDisplay.classList.remove("hidden");
        setTimeout(() => {
            correctAnswerDisplay.classList.add("hidden");
        }, 1000);
         //track counts of correct answers
        correctAnswer += 1
        // Move to the next question even if the answer is correct
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            gameOver();
        }
    } else {
         //if answer is wrong display 'wrong Answer!" for one second
        wrongAnswerDisplay.classList.remove("hidden");
        setTimeout(() => {
            wrongAnswerDisplay.classList.add("hidden");
        }, 1000);
        //track counts of wrong answers
        wrongAnswer += 1

        //WHEN I answer a question incorrectly, then time is subtracted from the clock(timeLeft) -10 seconds
        console.log  (timeLeft) 
        timeLeft = timeLeft - 10       
         
        // Move to the next question even if the answer is wrong
        currentQuestionIndex++; 
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            gameOver();
        }
    }
}
//if user does not anwser the quiz with 60 second it goes to this or complete the quiz 
function gameOver() {
    //Game over message with score information 
    var combinedScores = correctAnswer + wrongAnswer
    scoresPercentage = correctAnswer/(correctAnswer+wrongAnswer) * 100
    console.log ("scores: "+ scoresPercentage)
    gameOverHeading.textContent = "";
    console.log(combinedScores)
    //if Quiz question are not answered within 60 second Message
    if (combinedScores !== 4 ){
        gameOverHeading.textContent = "The time for the Quiz has passed, You faild the quiz, Please try again !"
        scoresPercentage = 0    
    //if Quiz is completed Message with scores    
    } else{
    gameOverHeading.textContent = gameOverHeading.textContent + " Correct Answers: " + correctAnswer + " Wrong Answers: " + wrongAnswer + " Your Grades for This Quiz: " + scoresPercentage + " %.  Finished In: " + timeLeft + " Seconds";
    }
    
    console.log("correct:" + correctAnswer);
    console.log("wrong:" + wrongAnswer);
    quizContainer.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");
    clearInterval(timerInterval);
    initialsForm.addEventListener("submit", saveHighscore);
    highscoresLink.classList.remove("hidden");
}

//once, user submit the intitials, it saves to local storage with key 'Scores' with intial and score info
function saveHighscore(event) {
    event.preventDefault();
    console.log ("scores: "+ scoresPercentage)
   const initials = document.getElementById("initials").value.toUpperCase();
   const score = scoresPercentage;
   const finished = timeLeft;
   const highscoreData = JSON.parse(localStorage.getItem("Scores")) || [];
   highscoreData.push({ initials, score,finished});
   //sorted by high scores
   highscoreData.sort((a, b) => b.score - a.score);
   localStorage.setItem("Scores", JSON.stringify(highscoreData));
   displayHighscores();
}


function displayHighscores() {
    gameOverScreen.classList.add("hidden");
    quizStart.classList.add("hidden");
    quizContainer.classList.add("hidden");
    highscoresList.classList.remove("hidden")
    gobackButton.classList.remove("hidden")
    clearButton.classList.remove("hidden")
    highscoretext.classList.remove("hidden")
    const highscoreData = JSON.parse(localStorage.getItem("Scores")) || [];
    let html = ''; // Initialize an empty string to store the HTML content
    // Iterate over each item in highscoreData
    for (let i = 0; i < highscoreData.length; i++) {
        const data = highscoreData[i];
        // Concatenate the HTML content for each item
       // html += '<li>' + data.initials + ': <span>' + data.score + ' % </span></li>';

        html += "<li>" + data.initials + ": <span>" + data.score + "% </span>" + "  (Completed the Quiz in: " + data.finished  + " seconds)</li>";
    }
    // Set the innerHTML of highscoresList with the concatenated HTML
    highscoresList.innerHTML = html;
}

highscoresLink.addEventListener("click", function() {
    gameOverScreen.classList.add("hidden");
    quizStart.classList.add("hidden");
    quizContainer.classList.add("hidden");
    highscoresList.classList.remove("hidden");
    displayHighscores(); // Call displayHighscores to update highscoresList
});

function goBack(){
   // Reset variables to initial state
   currentQuestionIndex = 0;
   timeLeft = 60;
   correctAnswer = 0;
   wrongAnswer = 0;
   scoresPercentage = 0;
   // Reset timer display
   timerDisplay.textContent = timeLeft;
   // Hide game over screen and show quiz start screen
   gameOverScreen.classList.add("hidden");
   quizStart.classList.remove("hidden");
   titleHeading.classList.remove("hidden")
   titleDescription.classList.remove("hidden") 
   gobackButton.classList.add("hidden")
   clearButton.classList.add("hidden")
   highscoretext.classList.add("hidden")
   // Clear the highscores list
   highscoresList.innerHTML = "";
}
function clearLocalStorages(){
    //Remove the "Scores" key from local storage
    localStorage.removeItem("Scores");
    // Clear the highscores list
    highscoresList.innerHTML = ""; 
}
//triger event when user click 
startButton.addEventListener("click", startQuiz);
gobackButton.addEventListener("click", goBack);
clearButton.addEventListener("click", clearLocalStorages);
