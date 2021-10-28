"use strict";

var deck = document.querySelector(".deck");
var opened = [];
var matched = [];
var modal = document.getElementById("modal");
var reset = document.querySelector(".reset-btn");
var playAgain = document.querySelector(".play-again-btn");
var movesCount = document.querySelector(".moves-counter");
var moves = 0;
var star = document.querySelectorAll(".fa-trophy");
var starCount = 3;
var timeCounter = document.querySelector(".timer");
var time;
var minutes = 0;
var seconds = 0;
var timeStart = false;
var handler = null;
var deckCardsEasy = ["badge1.PNG", "badge1.PNG", "badge2.PNG", "badge2.PNG", "badge3.PNG", "badge3.PNG"];
var deckCardsMedium = ["badge1.PNG", "badge1.PNG", "badge2.PNG", "badge2.PNG", "badge3.PNG", "badge3.PNG", "badge4.PNG", "badge4.PNG", "badge5.PNG", "badge5.PNG"];
var deckCards = ["badge1.PNG", "badge1.PNG", "badge2.PNG", "badge2.PNG", "badge3.PNG", "badge3.PNG", "badge4.PNG", "badge4.PNG", "badge5.PNG", "badge5.PNG", "badge6.PNG", "badge6.PNG", "badge7.PNG", "badge7.PNG", "badge8.PNG", "badge8.PNG"];

var displayCards = function displayCards() {
  deckCards.forEach(function (card) {
    var listCardTag = document.createElement("li");
    listCardTag.classList.add("card");
    var imgTag = document.createElement("img");
    listCardTag.appendChild(imgTag); //  imgTag.classList.add("img");

    imgTag.setAttribute("src", "./assets/images/" + card);
    deck.appendChild(listCardTag);
  });
  initflip();
  playAgain.addEventListener('click', function (event) {
    modal.style.display = "none";
    resetGame();
    displayCards();
  });
  reset.addEventListener('click', function (event) {
    resetGame();
  });
};

var initflip = function initflip() {
  var cards = document.querySelectorAll(".card");
  cards.forEach(function (card, index) {
    card.addEventListener('click', function (event) {
      event.preventDefault();
      card.classList.add("flip"); //    deck.classList.add("flip");

      handleTimerStart();
      moves++;
      console.log("moves" + moves);
      updateMoves();
      console.log(card.childNodes[0].src);
      opened.push(card);

      if (opened.length >= 2) {
        var openedPreviousCard = opened[opened.length - 2];

        if (opened.length == 2 && card.childNodes[0].src === openedPreviousCard.childNodes[0].src) {
          matched.push(card, openedPreviousCard);
          opened.shift();
          opened.shift();
          console.log("Matched" + matched);
        } else if (opened.length == 2 && card.childNodes[0].src != openedPreviousCard.childNodes[0].src) {
          var fliptime = setTimeout(function () {
            opened.forEach(function (element) {
              removeFlip(element);
            });
            opened = [];
          }, 2000);
        }
      }

      if (matched.length === deckCards.length) {
        finished(moves);
      }
    });
  });
};

var removeFlip = function removeFlip(card) {
  return card.classList.remove("flip");
};

var finished = function finished(moves) {
  modal.style.display = "block";
};

var handleTimerStart = function handleTimerStart() {
  var time = setInterval(function () {
    seconds++; // if (seconds === 0) {
    //     clearInterval(time);
    // }

    if (seconds === 60) {
      minutes++;
      seconds = 0;
    } // timerDisplay.innerHTML = secondsRemaining;
    // secondsRemaining --;


    timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: " + minutes + " Mins " + seconds + " Secs";
  }, 1000);

  var handleClearInterval = function handleClearInterval() {
    if (handler === null) {
      alert("There is no interval to clear");
    } else {
      clearInterval(handler);
    }
  };
};

var updateMoves = function updateMoves() {
  movesCount.innerHTML = moves;
};

var resetGame = function resetGame() {
  timeStart = false;
  seconds = 0;
  minutes = 0;
  timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";
  moves = 0;
  movesCount.innerHTML = moves;
  opened = [];
  matched.forEach(function (element) {
    element.remove();
  });
  matched = [];
};

displayCards();