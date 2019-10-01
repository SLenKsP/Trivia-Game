var trivia = {
  mainPageStyle: function() {
    $(".container").addClass("bg-dark text-primary");
  },
  headerText: function() {
    return "Totally Trivial Trivia!";
  },
  setHeader: function() {
    var headerTag = $("<h1 class= text-center>");
    $("#header").append(headerTag.text(this.headerText()));
    $(headerTag).addClass("display-1");
  },
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
      options: ["water melon", "mango", "orange"],
      correctAnswer: ""
    },
    {
      question: "favorite cologne",
      options: ["dior fehrenheit", "sauvage", "la nuit de'lomme"],
      correctAnswer: "dior fehrenheit"
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
  showRestartBtn: function() {
    $("#content").append(
      "<button id='restart' type='button' class='btn btn-primary mx-auto d-block'>Restart"
    );
  },
  loadQuestions: function() {
    var content = $("<h3 class= questions>");
    for (var j = 0; j < this.triviaQuestions.length; j++) {
      var questionTag = $("<p>");
      content.append(questionTag.text(this.triviaQuestions[j].question));
      for (var k = 0; k < this.triviaQuestions[j].options.length; k++) {
        // var setOptions = $("<p class= d-inline>");
        // content.append(setOptions.text(this.triviaQuestions[j].options[k]));
        content.append(
          '<label><input type="radio" name="options" value="' +
            this.triviaQuestions[j].options[k] +
            '" class= "ml-2"/> ' +
            this.triviaQuestions[j].options[k] +
            "</label>"
        );
      }
    }
    $("#content").append(content);
    content.addClass("text-center");
    $("#content").append(trivia.showRestartBtn());
    trivia.clickRestart();
  },
  clickStart: function() {
    $("#startBtn").click(function(e) {
      e.preventDefault();
      $(this).remove();
      trivia.loadQuestions();
    });
  },
  clickRestart: function() {
    $("#restart").on("click", function() {
      location.reload();
      // alert("hi");
    });
  },

  gameInit: function() {
    this.mainPageStyle();
    this.setHeader();
    // this.loadQuestions();
    this.clickStart();
    this.clickRestart();
    // this.setTimeOut();
  }
};

$(document).ready(function() {
  //   $("questions").hide();
  trivia.gameInit();
});
