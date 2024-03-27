This Coding Quiz challenges included HTML, CSS and Javascrips
on intitial page, I included View Highscores link where users can able to see high scores anytime,
thinking it will help to compare your scores to others. 
There are 4 coding related quiz challenge and 4 possible answers that needs to be anwsered
within 60 seconds, there are penalty of 10 seconds subtraction WHEN user answer a question incorrectly
calculation of grades are based on how many question are correct in %
I put trcking to check how many questions are correct and how many are not
using these variables var correctAnswer, var wrongAnswer 
for example if user got 3 correct answers, it will score as 75% and if user got only 1 correct answer,
he or she will recieve 25% grades.
When user does not answer within time frame, users will get 0% and forced to put Initials. 
I added special time tracking on these <div> to display text content based on answers for 1 second and disappear 
<div id="wrongAnswer" class="hidden">Wrong Answer!</div>
<div id="correctAnswer" class = "hidden">Correct Answer!</div>
It was not required but I thought this application can be presented better with this.
once quiz is done results will show like this.

Correct Answers: 1 Wrong Answers: 3 Your Grades for This Quiz: 25 %. Finished In: 27 Seconds

and user needs to put their Initials, then it saves to local storage with key under 'scores' (initials convert to upper-case)
{
  "initials": "DD",
  "score": 50,
  "finished: 37
}

and after this screen displays previous inputed information with sorted order from high to low 

HighScores
DD: 50% (Completed the Quiz in: 38 seconds)
DD: 50% (Completed the Quiz in: 37 seconds)
ER: 25% (Completed the Quiz in: 28 seconds)
DD: 25% (Completed the Quiz in: 28 seconds)

and go back and clear highscores button shows to start over or clear local storeage values
I have reviewed Acceptance Criteria list and everthing looks good.
I spent extra hours adding more functions to enhanced the code as much as I can to make my application presentable.













GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## Acceptance Criteria Simplified

This project is about creating a quiz game. You will need to do the following:

* Have a list of questions for the player. Each question should have at least 4 answers with one being correct. Have at least 2 questions, though more is encouraged!
* When the user clicks the start button, show them the first question.
* As the user answers questions, move them to the next question until all questions are out.
* When no more questions are left, Show the game over screen.
* Add in a timer. The timer should start as soon as the start button is clicked, and tick down each second. It should show in the top right corner of the page.
* When the user choses an incorrect answer, take some time off the timer. How much is up to you.
* When the timer reaches 0, show the game over screen.
* Show the last timer value as the player's score on the game over screen.
* Give the player the ability to enter their initials, then save them to localstorage along with the score from the game over screen. You should save the data in a format that allows multiple high scores to be saved.
* Once the player saves their highscore, show the highscores as a list on the page
* Add a link to the top left corner. When clicked, go directly to the highscore list.