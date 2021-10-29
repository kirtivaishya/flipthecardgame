const deck = document.querySelector(".deck");
let opened = [];
let matched = [];
const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");
const reset = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".play-again-btn");
const mediumLevel = document.querySelector(".medium-level");
const hardLevel = document.querySelector(".hard-level");
const movesCount = document.querySelector(".moves-counter");
const level =document.querySelector(".level-counter");

let moves = 0;
const trophy = document.querySelectorAll(".fa-trophy");
let starCount = 3;
const timeCounter = document.querySelector(".timer");
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;
let handler = null;
let audiotheme = new Audio('./assets/sound/harry_potter_loop.mp3');
let audioclapping = new Audio('./assets/sound/Applause-SoundBible.com-151138312.mp3');
const deckCardsEasy=["badge1.PNG","badge3.PNG","badge2.PNG","badge2.PNG",
"badge3.PNG","badge1.PNG"];
const deckCardsMedium=["badge4.PNG","badge1.PNG","badge2.PNG","badge5.PNG",
"badge3.PNG","badge5.PNG","badge1.PNG","badge4.PNG",
"badge3.PNG","badge2.PNG","badge6.PNG","badge6.PNG"];
const deckCardsHard=["badge8.PNG","badge1.PNG","badge3.PNG","badge2.PNG",
"badge3.PNG","badge6.PNG","badge4.PNG","badge4.PNG",
"badge7.PNG","badge5.PNG","badge2.PNG","badge6.PNG",    
"badge7.PNG","badge5.PNG","badge1.PNG","badge8.PNG"];
let deckCards=["badge1.PNG","badge1.PNG","badge2.PNG","badge2.PNG",
"badge3.PNG","badge3.PNG","badge4.PNG","badge4.PNG",
"badge5.PNG","badge5.PNG","badge6.PNG","badge6.PNG",
"badge7.PNG","badge7.PNG","badge8.PNG","badge8.PNG"];


const displayCards=()=>{
    switch (level.textContent) {
        case "1":
            deckCards=shuffle(deckCardsEasy);
            deck.classList.add("deck__easy");
        break;
        case "2":
            deckCards=shuffle(deckCardsMedium);
            deck.classList.add("deck__medium");
        break;
        case "3":
            deckCards=shuffle(deckCardsHard);
            deck.classList.add("deck__hard");
        break;
    
        default:
            deckCards=deckCardsHard;
            deck.classList.add("deck__hard");
            break;
    }
    deckCards.forEach(card => {
        const listCardTag= document.createElement("li");
        listCardTag.classList.add("card");      
        const imgTag= document.createElement("img");
        listCardTag.appendChild(imgTag);
        //  imgTag.classList.add("img");
        imgTag.setAttribute("src","./assets/images/"+card);
       deck.appendChild(listCardTag);     
    });
}
const startGame=()=>{
    audiotheme.play();
    displayCards();
    initflip();  
} 
    playAgain.addEventListener('click',(event)=>{
        modal.style.display = "none";
        resetGame();
        startGame();
       
    });
    mediumLevel.addEventListener('click',(event)=>{
        modal.style.display = "none";
        level.innerHTML="2";
        resetGame();
        startGame();
       
    });
    hardLevel.addEventListener('click',(event)=>{
        modal.style.display = "none";
        level.innerHTML="3";
        resetGame();
        startGame();
       
    });
    reset.addEventListener('click',(event)=>{
        resetGame();
        startGame();
    });
    
// }


const initflip=()=>{
    const cards = document.querySelectorAll(".card");
    cards.forEach((card ,index)=> {
        card.addEventListener('click',(event)=>{
           event.preventDefault();
           card.classList.add("flip");
        //    deck.classList.add("flip");
        handleTimerStart();
        moves++
        console.log("moves"+moves);
        updateMoves();
         console.log(card.childNodes[0].src);
       
        opened.push(card);
       
        if(opened.length>=2){
            let openedPreviousCard=opened[opened.length-2];
           
            if(opened.length==2 && card.childNodes[0].src===openedPreviousCard.childNodes[0].src){
                 matched.push(card,openedPreviousCard);
                opened.shift();
                opened.shift();
                console.log("Matched"+matched);
           }else if(opened.length==2 && card.childNodes[0].src!=openedPreviousCard.childNodes[0].src){
           const fliptime= setTimeout(()=>{  
            opened.forEach(element => {
                    removeFlip(element);
                });
              
               opened=[];
            },1000); 
           }
        }
        if(matched.length===deckCards.length){
        finished(moves);
        }
        });
    });
 }

 const removeFlip=(card)=> card.classList.remove("flip");

 const finished=(moves)=>{
    modal.style.display="block";
    audioclapping.play();
    const subheading =document.createElement("h3");
  
    if (deckCards.length===moves ) {
        subheading.innerHTML= `you played awesome !! ${moves} moves in ${minutes}:${seconds}`;
      
    } else if(deckCards.length<moves && seconds<60) {
        subheading.innerHTML= `you played good !! ${moves} in ${minutes}:${seconds}`;

        trophy[0].firstElementChild.classList.remove("fa-trophy");
    }else if(deckCards.length<moves && minutes>2) {
        subheading.innerHTML= `you played fair !! ${moves} in ${minutes}:${seconds}`;
       
        trophy[0].firstElementChild.classList.remove("fa-trophy");
        trophy[1].firstElementChild.classList.remove("fa-trophy");
        
    }
    modalContent.appendChild(subheading);
   
 }


  const handleTimerStart = () => {
    const time = setInterval(() => {
        seconds++;
        // if (seconds === 0) {
        //     clearInterval(time);
        // }
        if (seconds === 60) {
            minutes++;
            seconds = 0;
          }
       // timerDisplay.innerHTML = secondsRemaining;
       // secondsRemaining --;
        timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: " + minutes + " Mins " + seconds + " Secs" ;
    }, 1000);    

}

const updateMoves=()=>{
    movesCount.innerHTML=moves;
}
function removeCard() {
    // As long as <ul> deck has a child node, remove it
    while (deck.hasChildNodes()) {
      deck.removeChild(deck.firstChild);
    }
  }
const resetGame=()=>{
  timeStart = false;
  seconds = 0;
  minutes = 0;
  timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";
  moves=0;
  movesCount.innerHTML=moves;
  opened = [];
  removeCard();
  matched = [];
  clearInterval(handler);

  
}
const shuffle=(array)=> {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
  }

startGame();
    



