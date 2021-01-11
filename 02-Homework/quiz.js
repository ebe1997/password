//Question & Answer Object
<script language ="javascript" ></script>
var quizQuestions = {
  questions: [
    "What term do you use to declare a variable?",
    "What does 2 + 2 equal?",
    'What does "2" + "2" - "2" equal?',
    "What character opens an array?",
    "What character closes an object?",
    "An array allows you to store multiple values in a single variable?",
    "array.length provides a number equal to:",
    "JavaScript can be embedded in the html file or in it's own file?",
    "What does JSON stand for?",
    "When was JavaScript created?",
    'What is the proper syntax of a "for" loop?',
    "What is the difference between do while and while loops?",
    "Inside what HTML element is JavaScript put?",
    "What is the correct place to insert JavaScript?",
    'How do you write "Hello World" in an alert box?',
  ],
  choices: [
    ["var", "variable"],
    ["4", "22", "44", "undefined"],
    ["20", "2", "222", "4"],
    ["[", "{", "(", "A"],
    ["}", "]", ")", "?"],
    ["True", "False"],
    [
      "The total number of objects in the array",
      "The final index number of the array",
      "NaN",
      "The last entry in a array",
    ],
    ["True", "False"],
    [
      "JavaScript Object Notation",
      "JavaScript Oriented Notation",
      "Jumbo Shift Object Notion",
      "Jumbotron Score On Notation",
    ],
    ["1995", "2005", "2015", "2020"],
    [
      "for (var i = 0; i &lt; arr.length; i++)",
      "for (var i = 1; i < arr.length; i++)",
      "for i = 0; i++; i < arr.length",
      "for (var i = 0; i > arr.length; i--)",
    ],
    [
      "A do while loop executes the script block once before entering the while loop",
      "A do while look executes the script block at the same time as the while clause",
      "A while loop executes after a script block is run",
      "There is no difference",
    ],
    ["html", "javascript", "script", "js"],
    [
      "The head section",
      "The body section",
      "Both the head and the body section",
    ],
    [
      'alert("Hello World")',
      'msg("Hello World")',
      'alertbox("Hello World")',
      'msgbox("Hello World")',
    ],
  ],
  correctAnswer: [
    "var",
    "4",
    "20",
    "[",
    "}",
    "True",
    "The total number of objects in the array",
    "True",
    "JavaScript Object Notation",
    "1995",
    "for (var i = 0; i &lt; arr.length; i++)",
    "A do while loop executes the script block once before entering the while loop",
    "script",
    "The body section",
    'alert("Hello World")',
  ],
};

//Variable Declaration
//Random Question Index
var qIndex = [];
//Random Answer Index
var aIndex = [];
//Start Time
var testDuration = 120;
//Score Variable
var score = 0;
// Declares Timer Element Variable
var timeEl = document.querySelector(".timer");
// Declares Score Element Variable
var scoreEl = document.querySelector(".score");
// Declares variable to determine if questions were answered before timer was up
var qOrT = false;
// Declare FinalScores variable to keep list of final scores for leader board
var highScores = []
if (JSON.parse(localStorage.getItem("highScores") !== null)) { highScores = JSON.parse(localStorage.getItem("highScores")); }

// Unique Random Array Number Generator
//https://stackoverflow.com/questions/8378870/generating-unique-random-numbers-integers-between-0-and-x
function uniqueRandoms(qty, min, max) {
  var rnd,
    arr = [];
  do {
    do {
      rnd = Math.floor(Math.random() * max) + min;
    } while (arr.includes(rnd));
    arr.push(rnd);
  } while (arr.length < qty);
  return arr;
}

// Populates the Random Question Index Array
qIndex = uniqueRandoms(
  quizQuestions.questions.length,
  0,
  quizQuestions.questions.length
);

// Ask Random Question
function askQuestion() {
  if (qIndex.length > 0) {
    var questionDiv = $("#question-container");
    questionDiv.append(
      '<p id="question">' + quizQuestions.questions[qIndex[0]] + "</p>"
    );
  } else {
    outOfQuestions();
  }
}

//Function for action when out of questions
function outOfQuestions() {
  qOrT = true;
  timeEl.textContent = "";
  testDuration = 0;
  var endDiv =
    '<li><button type="button" class="btn btn-dark" id="completedButton">You\'ve Completed The Test!</button></li>';
  $("#answer-buttons").append(endDiv);
}

// Removed Question from Screen
function deleteQuestion() {
  $("#question").replaceWith("");
}

// Removes Index Number from qIndex so Questions don't get asked again.
function removeQuestion() {
  qIndex.splice(0, 1);
}

// Function orders answer choices randomly
function randomAnswerIndex() {
  if (qIndex.length > 0) {
    aIndex = uniqueRandoms(
      quizQuestions.choices[qIndex[0]].length,
      0,
      quizQuestions.choices[qIndex[0]].length
    );
  }
}

// Function displays question choices
function provideChoices() {
  if (qIndex.length > 0) {
    for (var i = 0; i < quizQuestions.choices[qIndex[0]].length; i++) {
      var choiceDiv =
        '<li><button type="button" class="btn btn-dark" id="answerChoices">';
      choiceDiv = choiceDiv + quizQuestions.choices[qIndex[0]][aIndex[i]];
      $("#answer-buttons").append(choiceDiv);
    }
  }
}

// Deletes answers from Screen
function deleteAnswers() {
  if (qIndex.length > 0) {
    for (var i = 0; i < quizQuestions.choices[qIndex[0]].length; i++) {
      $("#answerChoices").replaceWith("");
      $("#correct-answer").replaceWith("");
      $("#wrong-answer").replaceWith("");
    }
  }
}

// Counts Down Timer
function testCountdown() {
  timeEl.textContent = testDuration + " Seconds Left";
  var timerInterval = setInterval(function () {
    testDuration--;
    timeEl.textContent = testDuration + " Seconds Left";
    if (testDuration < 1) {
      timeEl.textContent = "";
      clearInterval(timerInterval);
      outOfTime();
    }
  }, 1000);
}

// Displays Player Score
function scoreDisplay() {
  scoreEl.textContent = "Score: " + score;
  var scoreInterval = setInterval(function () {
    scoreEl.textContent = "Score: " + score;
    if (qIndex.length === 0 || testDuration < 1) {
      scoreEl.textContent = "";
      clearInterval(scoreInterval);
    }
  }, 500);
}

// Alerts Times Up
function outOfTime() {
  deleteQuestion();
  deleteAnswers();
  removeQuestion();
  setTimeout(function () {
    timesUpButton();
  }, 200);
}

// Creates Time's Up Button
function timesUpButton() {
  if (qOrT === false) {
    testDuration = 0;
    var endDiv =
      '<li><button type="button" class="btn btn-dark" id="timesUpButton">Time\'s Up!</button></li>';
    $("#answer-buttons").append(endDiv);
  }
}

// Hides Sections After Click
function hide(hideEl) {
  var hide = document.getElementById(hideEl);
  hide.style.display = "none";
}

// Unhides Sections After Click
function unhide(unhideEl) {
  var unhide = document.getElementById(unhideEl);
  unhide.style.display = "block";
}

// Ends Quiz When Time's Up
$("#answer-buttons").on("click", "#timesUpButton", function () {
  hide("answer-buttons");
  var finalScore =
    '<h4 id="finalScore">Your Final Score Was ' + score + "!</h4>";
  $("#final-score").append(finalScore);
  unhide("finalScore");
  unhide("initForm");
});

// Ends Quiz When All Questions Are Answered
$("#answer-buttons").on("click", "#completedButton", function () {
  hide("answer-buttons");
  var finalScore =
    '<h4 id="finalScore">Your Final Score Was ' + score + "!</h4>";
  $("#final-score").append(finalScore);
  unhide("finalScore");
  unhide("initForm");
});

// Starts Quiz
$("#startEndButton").on("click", "#startButton", function () {
  hide("startEndButton");
  hide("leader-board");
  testCountdown();
  scoreDisplay();
  askQuestion();
  randomAnswerIndex();
  provideChoices();
});

// Answers Question & Moves On to Next Question
$("#answer-buttons").on("click", "#answerChoices", function () {
  var buttonText = $(this).html();
  if (buttonText === quizQuestions.correctAnswer[qIndex[0]]) {
    $(this).attr("id", "correct-answer");
    score++;
  } else {
    $(this).attr("id", "wrong-answer");
    testDuration = testDuration - 10;
  }

  if (qIndex.length > 0 && testDuration > 0) {
    setTimeout(function () {
      deleteQuestion();
      deleteAnswers();
      removeQuestion();
      askQuestion();
      randomAnswerIndex();
      provideChoices();
    }, 500);
  }
});

//Displays LeaderBoard only if objects exist
$(document).ready(function () {
  if (highScores.length !== 0) {
    unhide("leader-board");
  }
  for (i = 0; i < highScores.length; i++) {
    var leaderDiv = '<li>' + highScores[i].userName + ' - ' + highScores[i].userScore + '</li>';
    $("#leaderList").prepend(leaderDiv);
  }
});
var tim;       
var min = '${sessionScope.min}';
var sec = '${sessionScope.sec}';
var f = new Date();

function customSubmit(someValue){  
     document.questionForm.minute.value = min;   
     document.questionForm.second.value = sec; 
     document.questionForm.submit();  
     }  

function examTimer() {
    if (parseInt(sec) >0) {

        document.getElementById("showtime").innerHTML = "Time Remaining :"+min+" Minutes ," + sec+" Seconds";
        sec = parseInt(sec) - 1;                
        tim = setTimeout("examTimer()", 1000);
    }
    else {

        if (parseInt(min)==0 && parseInt(sec)==0){
            document.getElementById("showtime").innerHTML = "Time Remaining :"+min+" Minutes ," + sec+" Seconds";
             alert("Time Up");
             document.questionForm.minute.value=0;
             document.questionForm.second.value=0;
             document.questionForm.submit();

         }

        if (parseInt(sec) == 0) {				
            document.getElementById("showtime").innerHTML = "Time Remaining :"+min+" Minutes ," + sec+" Seconds";					
            min = parseInt(min) - 1;
            sec=59;
            tim = setTimeout("examTimer()", 1000);
        }

    }
}



document.querySelector("#init-submit").onclick = function () {
  var name = document.querySelector("#initialsInput").value;
  var userData = { "userName": name, "userScore": score };

  highScores.push(userData);

  localStorage.setItem("highScores", JSON.stringify(highScores));
}
request.getSession().setAttribute("totalNumberOfQuizQuestions",document.getElementsByTagName("totalQuizQuestions").item(0).getTextContent());
				request.getSession().setAttribute("quizDuration",document.getElementsByTagName("quizDuration").item(0).getTextContent());
				request.getSession().setAttribute("min",document.getElementsByTagName("quizDuration").item(0).getTextContent());
				request.getSession().setAttribute("sec",0);
< /script>