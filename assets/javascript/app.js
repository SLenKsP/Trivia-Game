var answered = 0;
var notAnswered = 0;
var correct = 0;
var notCorrect = 0;
var total = 0;
var timeLeft = 10;
var remainingTime;
// trivia game object
var trivia = {
  // style page
  mainPageStyle: function() {
    $(".container").addClass("bg-dark text-primary");
  },
  // set header text
  headerText: function() {
    return "Trivia Game";
  },
  // write header to html
  setHeader: function() {
    var headerTag = $("<h1 class= text-center>");
    $("#header").append(headerTag.text(this.headerText()));
    $(headerTag).addClass("display-1");
  },
  // trivia questions - currently placeholder
  triviaQuestions: [
    {
      question: " favorite car",
      options: ["accord", "benz", "camry"],
      correctAnswer: "accord"
    },
    {
      question: "favorite city",
      options: ["london", "newyork", "anand"],
      correctAnswer: "london"
    },
    {
      question: "favorite fruit",
      options: ["watermelon", "mango", "orange"],
      correctAnswer: "watermelon"
    },
    {
      question: "favorite cologne",
      options: ["fehrenheit", "sauvage", "la nuit de'lomme"],
      correctAnswer: "fehrenheit"
    } /*
    {
      question: "",
      options: [],
      correctAnswer: ""
    },
    {
      question: "",
      options: [],
      correctAnswer: ""
    },
    {
      question: "",
      options: [],
      correctAnswer: ""
    },
    {
      question: "",
      options: [],
      correctAnswer: ""
    }*/
  ],
  // setting up done button after all questions answered or not answered
  setDoneBtn: function() {
    $("#content").append(
      "<button id='done' type='button' class='btn btn-primary'>Done"
    );
  },
  // add questions to html
  loadQuestions: function() {
    total = this.triviaQuestions.length;
    notAnswered = total;
    var form = $("<form class= questions>");
    for (var j = 0; j < this.triviaQuestions.length; j++) {
      var questionTag = $("<h3>");
      form.append(questionTag.text(this.triviaQuestions[j].question));
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
        form.append(lbl);
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
      trivia.loadQuestions();
      trivia.checkRadio();
    });
  },
  // starting up a timer
  startTimer: function() {
    var timerLine = $("<h2 id='timer' class= 'text-center'> ");
    remainingTime = setInterval(countDown, 1000);
    console.log("timer");
    function countDown() {
      console.log("timer again");
      if (timeLeft === 0) {
        $("form").addClass("d-none");
        $("#done").addClass("d-none");
        clearTimeout(remainingTime);
        trivia.showSummary();
      } else {
        --timeLeft;
        $("#content").prepend(
          timerLine.text(`Remaining time is ${timeLeft} seconds`)
        );
      }
    }
  },
  // click don actions
  clickDone: function() {
    $("#done").on("click", function() {
      clearTimeout(remainingTime);
      trivia.showSummary();
      $("form").addClass("d-none");
      $(this).addClass("d-none");
    });
  },
  // check the clicked answered
  checkRadio: function() {
    $("input:radio").click(function() {
      answered++;
      notAnswered--;
      var correctAns = $(this).attr("name");
      $(`input:radio[name= ${correctAnswer}]`).attr("disabled", true);
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
    $(".container").append(summary);
  },
  // reload the game (not working)
  gameReload: function() {
    console.log("resetting everything");
    $("form").trigger("reset");
    trivia.resetData();
    // clearTimeout(remainingTime);
    $("#startBtn").removeClass("d-none");
    // $("#content").removeClass("d-none");
    $("#summary").hide();
  },
  // reset data (not working)
  resetData: function() {
    answered = 0;
    notAnswered = 0;
    correct = 0;
    notCorrect = 0;
    total = 0;
    timeLeft = 10;
    remainingTime;
    $("#timer").text("");
  },
  // initiate the game
  gameInit: function() {
    this.mainPageStyle();
    this.setHeader();
    this.clickStart();
  }
};
// load js
$(document).ready(function() {
  trivia.gameInit();
});
