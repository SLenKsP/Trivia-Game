var answered = 0;
var notAnswered = 0;
var correct = 0;
var notCorrect = 0;
var total = 0;
var timeLeft = 100;
var remainingTime;
// trivia game object
var trivia = {
  // style page
  mainPageStyle: function() {
    $(".container-fluid").addClass("text-light");
  },
  // set header text
  headerText: function() {
    return "Trivia";
  },
  // write header to html
  setHeader: function() {
    var headerTag = $("<h1 class= 'text-center text-danger'>");
    $("#header").append(headerTag.text(this.headerText()));
    $(headerTag).addClass("display-1");
  },
  setRules: function() {
    var sectionHead = $("<ol><h1 class='text-warning'>Remember...</h1>");
    var line1 = $(
      "<li><h4 class='text-danger'>You can pick only one option</h4></li>"
    );
    var line2 = $(
      "<li><h4 class='text-danger'>Once you select an option, others will be disabled</h4></li>"
    );
    sectionHead.append(line1, line2);
    $("#rules").append(sectionHead);
  },
  setTimerLine: function() {
    var timerLine = $(
      "<h2 id='timer' class= 'text-center text-warning pb-2 mb-4'>Time Remaining: <span class = 'font-weight-bold text-light'>" +
        timeLeft +
        "</span> seconds.</h2> "
    );

    $("#content").append(timerLine);
  },
  // trivia questions - currently placeholder
  triviaQuestions: [
    {
      question: "What type of Language javascript is?",
      options: [
        "Scripting",
        "Programming",
        "Scripting and Programming",
        "Application"
      ],
      correctAnswer: "Scripting"
    },
    {
      question: "Which was the first browser to support JavaScript?",
      options: ["Mozilla Firefox", "Netscape", "Google Chrome", "IE"],
      correctAnswer: "Netscape"
    },
    {
      question: "JavaScript is ______ Side scripting language.",
      options: ["Server", "Client", "ISP", "Browser"],
      correctAnswer: "Browser"
    },
    {
      question: "The external JavaScript file must contain <script> tag.",
      options: ["True", "False"],
      correctAnswer: "False"
    },
    {
      question:
        "JavaScript code between a pair of “script” tags are called ______",
      options: ["Non-inline", "External", "Referenced", "Inline"],
      correctAnswer: "Inline"
    },
    {
      question:
        "Which of the following attribute can hold the JavaScript version?",
      options: ["LANGUAGE", "SCRIPT", "VERSION", "None of the above"],
      correctAnswer: "LANGUAGE"
    },
    {
      question:
        "Which of the following is not considered a JavaScript operator?",
      options: ["new", "this", "delete", "typeof"],
      correctAnswer: "this"
    },
    {
      question:
        "Which method of an Array object adds and/or removes elements from an array.",
      options: ["Reverse", "Shift", "Slice", "Splice"],
      correctAnswer: "Splice"
    },
    {
      question: "Using which statement you can test for a specific condition.",
      options: ["select", "if", "switch", "for"],
      correctAnswer: "if"
    },
    {
      question: "Is it possible to nest functions in JavaScript?",
      options: ["True", "False"],
      correctAnswer: "True"
    }
  ],
  // setting up done button after all questions answered or not answered
  setDoneBtn: function() {
    $("#content").append(
      "<button id='done' type='button' class='btn text-info'><h1 class='display-4'>Done</h4>"
    );
  },
  // add questions to html
  loadQuestions: function() {
    total = this.triviaQuestions.length;
    notAnswered = total;
    var form = $("<form class= 'questions text-center'>");

    for (var j = 0; j < this.triviaQuestions.length; j++) {
      var questionBlock = $("<div>");
      form.append(questionBlock);
      var questionTag = $("<h3 class='pt-0'>");
      questionBlock.append(
        "<hr>",
        questionTag.text(j + 1 + " : " + this.triviaQuestions[j].question)
      );
      for (var k = 0; k < this.triviaQuestions[j].options.length; k++) {
        var radioBtn = $(
          '<input class="p-2 mx-2" type="radio" data-type="answer" name = ' +
            this.triviaQuestions[j].correctAnswer +
            ">"
        );
        var lbl = $("<label class='mx-4'>");
        lbl.text(this.triviaQuestions[j].options[k]);
        radioBtn.attr("value", this.triviaQuestions[j].options[k]);
        lbl.prepend(radioBtn);
        questionBlock.append(lbl);
      }
    }
    $("#content").append(form);
    form.addClass("text-center");
    $("#content").append(trivia.setDoneBtn());
    trivia.clickDone();
  },
  // click start to  play the game
  clickStart: function() {
    $("#startBtn").click(function(e) {
      e.preventDefault();
      $(this).addClass("d-none");
      trivia.startTimer();
      trivia.setTimerLine();
      trivia.loadQuestions();
      trivia.checkRadio();
    });
  },
  // starting up a timer
  startTimer: function() {
    remainingTime = setInterval(countDown, 1000);
    console.log("timer");
    function countDown() {
      console.log("timer again");
      if (timeLeft === 0) {
        $("form").addClass("d-none");
        $("#done").addClass("d-none");
        $("form").remove();
        $("#timer").remove();
        $("#done").remove();
        clearTimeout(remainingTime);
        trivia.showSummary();
      } else {
        --timeLeft;
        // $("#content").prepend;
        $("span").text(timeLeft);
      }
    }
  },
  // click done actions
  clickDone: function() {
    $("#done").on("click", function() {
      clearTimeout(remainingTime);
      trivia.showSummary();
      $("#timer").remove();
      $("form").remove();
      $(this).remove();
    });
  },
  // check the clicked answered
  checkRadio: function() {
    $("input:radio").click(function() {
      answered++;
      notAnswered--;
      var correctAns = $(this).attr("name");
      $(`input:radio[name= ${correctAns}]`).attr("disabled", true);
      var selectedAnswer = $(this).attr("value");
      console.log("correct answer: " + correctAns);
      console.log("selected Answer: " + selectedAnswer);
      if (selectedAnswer === correctAns) {
        correct++;
        console.log("correct: " + correct);
      } else {
        notCorrect++;
        console.log("wrong: " + notCorrect);
      }
    });
  },
  setRestartBtn: function() {
    $("#content").append(
      "<button id='restart' type='button' class='btn text-light'>Restart"
    );
  },
  // setting up summary page
  showSummary: function() {
    var summary = $("<div id='summary'>");
    var summaryTitle = $("<h3>");
    console.log("answered Value: " + answered);
    summary.append(`<h3>Total: ${total}`);
    summary.append(`<h3>Answered: ${answered}`);
    summary.append(`<h3>Not Answered: ${notAnswered}`);
    summary.append(`<h3>Correct: ${correct}`);
    summary.append(`<h3>Wrong: ${notCorrect}`);
    summary.append(
      "<button id='restart' type='button' class='btn text-light d-block mx-auto'><h1 class='display-4 text-info'>Restart</h4>"
    );
    $(".container-fluid").append(summary);
    trivia.gameReload();
  },
  // reload the game (not working)
  gameReload: function() {
    $("#restart").click(function(e) {
      e.preventDefault();
      console.log("resetting everything");
      $("form").trigger("reset");
      trivia.resetData();
      // clearTimeout(remainingTime);
      $("#startBtn").removeClass("d-none");
      $("#content").removeClass("d-none");
      $("#summary").remove();
      $(this).remove();
    });
  },
  // reset data (not working)
  resetData: function() {
    answered = 0;
    notAnswered = 0;
    correct = 0;
    notCorrect = 0;
    total = 0;
    timeLeft = 100;
    remainingTime;
    $("#timer").text("");
  },
  // initiate the game
  gameInit: function() {
    this.mainPageStyle();
    this.setRules();
    this.setHeader();
    this.clickStart();
  }
};
// load js
$(document).ready(function() {
  trivia.gameInit();
});
