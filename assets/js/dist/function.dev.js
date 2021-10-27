"use strict";

var deck = document.querySelector(".deck");
var opened = [];
var matched = [];
var modal = document.getElementById("modal");
var reset = document.querySelector(".reset-btn");
var playAgain = document.querySelector(".play-again-btn");
var movesCount = document.querySelector(".moves-counter");
var moves = 0;
var star = document.getElementById("star-rating").querySelectorAll(".star");
var starCount = 3;
var timeCounter = document.querySelector(".timer");
var time;
var minutes = 0;
var seconds = 0;
var timeStart = false;
var deckCards = ["badge1.PNG", "badge1.PNG", "badge2.PNG", "badge2.PNG", "badge3.PNG", "badge3.PNG", "badge4.PNG", "badge4.PNG", "badge5.PNG", "badge5.PNG", "badge6.PNG", "badge6.PNG", "badge7.PNG", "badge7.PNG", "badge8.PNG", "badge8.PNG"];