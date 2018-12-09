const timeOut = 15; //  timeout amount
const numQuestions = 5; // number of questions

var correctAnswers = 0;
var incorrectAnswers = 0;
var countDownTimerID;
var countDownTime = timeOut;
var currentQuestion = 0; //index of current question, initalized to 0;

var triviaQuestions = [
    {
        question: "What animal is Winnie the Pooh?",
        answer: "bear",
        choices: ["lion", "dog", "fox", "bear"],
        image: ["assets/images/pooh photo.jpg"]
    },
    {
        question: "Where does Winnie the Pooh live?",
        answer: "The Hundred Acre Woods",
        choices: ["Into the Woods", "Whispering Woods", "Enchanted Forest", "The Hundred Acre Woods"],
        image: ["assets/images/100 acre woods 2.jpg"]
    },
    {
        question: "Who is Christopher Robin?",
            answer: "The main character",
            choices: ["A stuff animal", "The park ranger", "The donkey", "The main character"],
            image: ["assets/images/Christopher Robin 2.jpg"]
        },

        {
            question: "Who is Madeline?",
            answer: "Christopher Robin's daughter",
            choices: ["the mom", "the caretaker", " the receptionist", "Christopher Robin's daughter"],
           image: ["assets/images/Madeline.jpg"]
        },

        {
            question: "Where does Christopher Robin live in the movie?",
            answer: "London",
            choices: ["Ireland", "Manchester", "London", "Scotland"],
           image: ["assets/images/Christopher Robin.jpg"]
        }
]


function counter() {

    // Has time run out?
    if (countDownTime != 0) {
        // decrement countDownTime
        countDownTime--;
        $("#count_down").text(countDownTime);
    }
    else {
        stop_countDownTimer();
        // Need to do the same thing as wrong answer
        choice_selected(-1);
    }
}

function reset_countDownTime() {
    countDownTime = timeOut;
    $("#count_down").text(countDownTime);
}

function stop_countDownTimer() {
    clearInterval(countDownTimerID);
}

function setCountDownTimer() {
    countDownTimerID = setInterval(counter, 1000); // count ever 1 second
}

function restart_game() {
    reset_countDownTime();
    setCountDownTimer();
    show_hide_elements(true);
}

function show_hide_elements(game_start) {
    // start button hit
    if (game_start === true) {
        currentQuestion = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        $("#total_correct").text(correctAnswers);
        $("#total_incorrect").text(incorrectAnswers);
        $("#status").hide();

        $("#question").show();
        $(".link").show();
        $("#count_down").show();
        $("#start").hide();
    }
    // game ended or initial start (before button hit)
    else {
        $("#start").show();
        $("#question").hide();
        $(".link").hide();
        $("#count_down").empty();
    }
}

function display_next_question_and_choices(index) {
    $("#question").text(triviaQuestions[index].question);
    $("#question").show();

    $("#choice_1").text(triviaQuestions[index].choices[0]);
    $("#choice_2").text(triviaQuestions[index].choices[1]);
    $("#choice_3").text(triviaQuestions[index].choices[2]);
    $("#choice_4").text(triviaQuestions[index].choices[3]);
}

function choice_selected(user_choice) {

    var statusText;

    stop_countDownTimer();

    // need to check if user clicked on correct answer
    if (user_choice === -1) { // question timed-out
        console.log("answer timed out");
        incorrectAnswers++;
        $("#total_incorrect").text(incorrectAnswers);
        statusText = "Timed Out! Correct Answer was " + triviaQuestions[currentQuestion].answer;
        $("#statusText").text(statusText);
        $("#image").attr('src', triviaQuestions[currentQuestion].image);
    }
    else if (triviaQuestions[currentQuestion].choices[user_choice] === triviaQuestions[currentQuestion].answer) {
        // if correct need to do following:
        // 1. show correct text/image
        // 2. increment correctAnswers
        // 3. hide choices
        console.log("answered correctly");
        correctAnswers++;
        $("#total_correct").text(correctAnswers);
        statusText = "Correct!  Answer was " + triviaQuestions[currentQuestion].answer;
        $("#statusText").text(statusText);
        $("#image").attr('src', triviaQuestions[currentQuestion].image);
    }
    else {
        console.log("answered incorrectly");
        incorrectAnswers++;
        $("#total_incorrect").text(incorrectAnswers);
        statusText = "Incorrect!  Correct Answer was " + triviaQuestions[currentQuestion].answer;
        $("#statusText").text(statusText);
        $("#image").attr('src', triviaQuestions[currentQuestion].image);
    }

    $("#statusText").show();
    $(".link").hide();
    $("#count_down").empty();
    $("#image").show();

    if (currentQuestion < (numQuestions - 1)) {
        // start next set of questions after some timeout
        setTimeout(function () {
            currentQuestion++;
            display_next_question_and_choices(currentQuestion);
            $(".link").show();
            $("#statusText").empty();
            $("#image").hide();
            reset_countDownTime();
            setCountDownTimer();
            $("#count_down").show();
        }, 3000);
    }
    else {
        // show status after 3 seconds
        setTimeout(function () {
            $("#question").hide();
            $("#statusText").empty();
            $("#image").hide();
            $("#status").show();
        }, 3000);

        // end game and give option to start again after 10 seconds
        setTimeout(function () {
            show_hide_elements(false);
        }, 10000);
    }
}

// Main part of JS
$(document).ready(function () {
    // on start need to hide question, choice & timer elements
    show_hide_elements(false);
    $("#status").hide();

    $("#start").on("click", function () {
        console.log("start button clicked");

        // hide start buttom, show question, choices, timer
        restart_game();

        // set text for first question & choices
        display_next_question_and_choices(currentQuestion);

    });

    $(".link").on("click", function () {
        var user_choice = parseInt($(this).val());
        console.log("Clicked a choice, value=" + user_choice);

        choice_selected(user_choice);

    });

});
