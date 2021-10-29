"use strict";

var deck = document.querySelector(".deck");
var opened = [];
var matched = [];
var modal = document.getElementById("modal");
var modalContent = document.querySelector(".modal-content");
var reset = document.querySelector(".reset-btn");
var playAgain = document.querySelector(".play-again-btn");
var mediumLevel = document.querySelector(".medium-level");
var hardLevel = document.querySelector(".hard-level");
var movesCount = document.querySelector(".moves-counter");
var level = document.querySelector(".level-counter");
var moves = 0;
var trophy = document.querySelectorAll(".fa-trophy");
var starCount = 3;
var timeCounter = document.querySelector(".timer");
var time;
var minutes = 0;
var seconds = 0;
var timeStart = false;
var handler = null;
var audiotheme = new Audio('./assets/sound/harry_potter_loop.mp3');
var audioclapping = new Audio('./assets/sound/Applause-SoundBible.com-151138312.mp3');
var deckCardsEasy = ["badge1.PNG", "badge3.PNG", "badge2.PNG", "badge2.PNG", "badge3.PNG", "badge1.PNG"];
var deckCardsMedium = ["badge4.PNG", "badge1.PNG", "badge2.PNG", "badge5.PNG", "badge3.PNG", "badge5.PNG", "badge1.PNG", "badge4.PNG", "badge3.PNG", "badge2.PNG", "badge6.PNG", "badge6.PNG"];
var deckCardsHard = ["badge8.PNG", "badge1.PNG", "badge3.PNG", "badge2.PNG", "badge3.PNG", "badge6.PNG", "badge4.PNG", "badge4.PNG", "badge7.PNG", "badge5.PNG", "badge2.PNG", "badge6.PNG", "badge7.PNG", "badge5.PNG", "badge1.PNG", "badge8.PNG"];
var deckCards = ["badge1.PNG", "badge1.PNG", "badge2.PNG", "badge2.PNG", "badge3.PNG", "badge3.PNG", "badge4.PNG", "badge4.PNG", "badge5.PNG", "badge5.PNG", "badge6.PNG", "badge6.PNG", "badge7.PNG", "badge7.PNG", "badge8.PNG", "badge8.PNG"];

var displayCards = function displayCards() {
  switch (level.textContent) {
    case "1":
      deckCards = shuffle(deckCardsEasy);
      deck.classList.add("deck__easy");
      break;

    case "2":
      deckCards = shuffle(deckCardsMedium);
      deck.classList.add("deck__medium");
      break;

    case "3":
      deckCards = shuffle(deckCardsHard);
      deck.classList.add("deck__hard");
      break;

    default:
      deckCards = deckCardsHard;
      deck.classList.add("deck__hard");
      break;
  }

  deckCards.forEach(function (card) {
    var listCardTag = document.createElement("li");
    listCardTag.classList.add("card");
    var imgTag = document.createElement("img");
    listCardTag.appendChild(imgTag); //  imgTag.classList.add("img");

    imgTag.setAttribute("src", "./assets/images/" + card);
    deck.appendChild(listCardTag);
  });
};

var startGame = function startGame() {
  audiotheme.play();
  displayCards();
  initflip();
};

playAgain.addEventListener('click', function (event) {
  modal.style.display = "none";
  resetGame();
  startGame();
});
mediumLevel.addEventListener('click', function (event) {
  modal.style.display = "none";
  level.innerHTML = "2";
  resetGame();
  startGame();
});
hardLevel.addEventListener('click', function (event) {
  modal.style.display = "none";
  level.innerHTML = "3";
  resetGame();
  startGame();
});
reset.addEventListener('click', function (event) {
  resetGame();
  startGame();
}); // }

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
          }, 1000);
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
  audioclapping.play();
  var subheading = document.createElement("h3");

  if (deckCards.length === moves) {
    subheading.innerHTML = "you played awesome !! ".concat(moves, " moves in ").concat(minutes, ":").concat(seconds);
  } else if (deckCards.length < moves && seconds < 60) {
    subheading.innerHTML = "you played good !! ".concat(moves, " in ").concat(minutes, ":").concat(seconds);
    trophy[0].firstElementChild.classList.remove("fa-trophy");
  } else if (deckCards.length < moves && minutes > 2) {
    subheading.innerHTML = "you played fair !! ".concat(moves, " in ").concat(minutes, ":").concat(seconds);
    trophy[0].firstElementChild.classList.remove("fa-trophy");
    trophy[1].firstElementChild.classList.remove("fa-trophy");
  }

  modalContent.appendChild(subheading);
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
};

var updateMoves = function updateMoves() {
  movesCount.innerHTML = moves;
};

function removeCard() {
  // As long as <ul> deck has a child node, remove it
  while (deck.hasChildNodes()) {
    deck.removeChild(deck.firstChild);
  }
}

var resetGame = function resetGame() {
  timeStart = false;
  seconds = 0;
  minutes = 0;
  timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";
  moves = 0;
  movesCount.innerHTML = moves;
  opened = [];
  removeCard();
  matched = [];
  clearInterval(handler);
};

var shuffle = function shuffle(array) {
  var currentIndex = array.length,
      temporaryValue,
      randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

startGame();