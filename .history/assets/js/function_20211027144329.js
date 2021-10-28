const deck = document.querySelector(".deck");
let opened = [];
let matched = [];
const modal = document.getElementById("modal");
const reset = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".play-again-btn");
const movesCount = document.querySelector(".moves-counter");
const cards = document.querySelectorAll("card");
let moves = 0;
const star = document.querySelectorAll(".fa-trophy");
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


const displayCards=()=>{
    // cards.forEach(card => {
        const listCardTag= document.createElement("li");
        listCardTag.classList.add("card");      
        const imgTag= document.createElement("img");
        listCardTag.appendChild(imgTag);
        //  imgTag.classList.add("img");
        imgTag.setAttribute("src","./assets/images/"+deckCards[0]);
       deck.appendChild(listCardTag);

        // });
    // cards.forEach(card => {
    //     card.addEventListener('click',function(event){
    //         event.preventDefault();
           
    // });
}
displayCards();
    



