const deck = document.querySelector(".deck");
let opened = [];
let matched = [];
const modal = document.getElementById("modal");
const reset = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".play-again-btn");
const movesCount = document.querySelector(".moves-counter");
let moves = 0;
const star = document.getElementById("star-rating").querySelectorAll(".star");
let starCount = 3;
const timeCounter = document.querySelector(".timer");
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

const deckCards=["badge1.PNG","badge1.PNG","badge2.PNG","badge2.PNG",
"badge3.PNG","badge3.PNG","badge4.PNG","badge4.PNG",
"badge5.PNG","badge5.PNG","badge6.PNG","badge6.PNG",
"badge7.PNG","badge7.PNG","badge8.PNG","badge8.PNG"];



