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
//block scope only accessed inside scope 
let currentQuestionIndex = 0;
//set time to 60 seconds
let timeLeft = 60;
let timerInterval;
//set value to 0 to start and laster use thes variable to caculate scores
var correctAnswer = 0;
var wrongAnswer = 0;
var scoresPercentage = 0;


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
//var can change the vaiable
var gameOverHeading = document.getElementById("game-over-heading");
var titleHeading = document.getElementById("Title-heading");
var titleDescription = document.getElementById("Title-Description");
var titleDescription = document.getElementById("High-Scores_Display");
var titleDescription = document.getElementById("Goback-button");
var titleDescription = document.getElementById("Title-Description");



console.log(titleHeading.textContent)
console.log (titleDescription.textContent)
//function startQuiz
function startQuiz() {
    //when quiz starts titleheading and title description to "", I used it intead of hidden classlist to show other options.
    titleHeading.textContent = "";
    titleDescription.textContent = "";

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
// show contents  from questions function
function showQuestion() {

    const currentQuestion = questions[currentQuestionIndex];
    questionDisplay.textContent = currentQuestion.question;
    answersDisplay.innerHTML = "";
   
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
      
        //button.addEventListener("click", () => checkAnswer(answer));
     
        button.addEventListener("click", function() {
            checkAnswer(answer);
        });
        answersDisplay.appendChild(button);
    });
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
    
    
    console.log(combinedScores)
    //if Quiz question are not answered within 60 second Message
    if (combinedScores !== 4 ){
        gameOverHeading.textContent = "Time has passed, You faild the quiz, Please try again !"
    //if Quiz is completed Message with scores    
    } else{
    gameOverHeading.textContent = gameOverHeading.textContent + " Correct Answers: " + correctAnswer + " Wrong Answers: " + wrongAnswer + " Your Grades for This Quiz: " + scoresPercentage + " %";
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
   const highscoreData = JSON.parse(localStorage.getItem("Scores")) || [];
   highscoreData.push({ initials, score });
   highscoreData.sort((a, b) => b.score - a.score);
   localStorage.setItem("Scores", JSON.stringify(highscoreData));
   displayHighscores();
}

//displying all the data from local storage from key 'scores' and adding html elements <li> to highscoresList
//function displayHighscores() {
   // const highscoreData = JSON.parse(localStorage.getItem("Scores")) || [];
    //used to map to change the contents, learned 3-26-2024 applying a function to it and then 
    //returns a new array containing the results of applying the function to each element of the original
  //  highscoresList.innerHTML = highscoreData.map(data => `<li>${data.initials}: <span>${data.score} % </span></li>`).join('');
//}

   // highscoresLink.addEventListener("click", () => {
   // gameOverScreen.classList.add("hidden");
   /// quizStart.classList.add("hidden");
   // quizContainer.classList.add("hidden");
   // highscoresList.classList.remove("hidden");
//});


function displayHighscores() {
    const highscoreData = JSON.parse(localStorage.getItem("Scores")) || [];
    let html = ''; // Initialize an empty string to store the HTML content

    // Iterate over each item in highscoreData
    for (let i = 0; i < highscoreData.length; i++) {
        const data = highscoreData[i];
        // Concatenate the HTML content for each item
        html += '<li>' + data.initials + ': <span>' + data.score + ' % </span></li>';
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

   // startQuiz()


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

   // Clear the highscores list
   highscoresList.innerHTML = "";

}

function clearLocalStorages(){

    //Remove the "Scores" key from local storage
    localStorage.removeItem("Scores");

    // Clear the highscores list
    highscoresList.innerHTML = "";

   
}




//triger event when user click on start-button
document.getElementById("start-button").addEventListener("click", startQuiz);

document.getElementById("Goback-button").addEventListener("click", goBack);

document.getElementById("Clear-button").addEventListener("click", clearLocalStorages);
