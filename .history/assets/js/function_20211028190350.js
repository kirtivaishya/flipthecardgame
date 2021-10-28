const deck = document.querySelector(".deck");
let opened = [];
let matched = [];
const modal = document.getElementById("modal-content");
const reset = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".play-again-btn");
const movesCount = document.querySelector(".moves-counter");

let moves = 0;
const trophy = document.querySelectorAll(".fa-trophy");
let starCount = 3;
const timeCounter = document.querySelector(".timer");
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;
let handler = null;

const deckCardsEasy=["badge1.PNG","badge1.PNG","badge2.PNG","badge2.PNG",
"badge3.PNG","badge3.PNG"];
const deckCardsMedium=["badge1.PNG","badge1.PNG","badge2.PNG","badge2.PNG",
"badge3.PNG","badge3.PNG","badge4.PNG","badge4.PNG",
"badge5.PNG","badge5.PNG",];
const deckCards=["badge1.PNG","badge1.PNG","badge2.PNG","badge2.PNG",
"badge3.PNG","badge3.PNG","badge4.PNG","badge4.PNG",
"badge5.PNG","badge5.PNG","badge6.PNG","badge6.PNG",
"badge7.PNG","badge7.PNG","badge8.PNG","badge8.PNG"];


const displayCards=()=>{
    deckCards.forEach(card => {
        const listCardTag= document.createElement("li");
        listCardTag.classList.add("card");      
        const imgTag= document.createElement("img");
        listCardTag.appendChild(imgTag);
        //  imgTag.classList.add("img");
        imgTag.setAttribute("src","./assets/images/"+card);
       deck.appendChild(listCardTag);     
    });
    initflip()
    playAgain.addEventListener('click',(event)=>{
        modal.style.display = "none";
        resetGame();
        displayCards();
    });
    reset.addEventListener('click',(event)=>{
        resetGame();
    });
    
}

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
            },2000); 
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
    const subheading =document.createElement("h3");
  
    if (deckCards.length===moves ) {
        subheading.innerHTML= `you played awesome !! ${moves} moves in ${minutes}:${seconds}`;
        trophy[0].display="block";
        trophy[1].display="block";
        trophy[2].display="block";
    } else if(deckCards.length<moves && seconds<60) {
        subheading.innerHTML= `you played good !! ${moves} in ${minutes}:${seconds}`;
        trophy[0].display="block";
        trophy[1].display="block";
    }else if(deckCards.length<moves && minutes>2) {
        subheading.innerHTML= `you played fair !! ${moves} in ${minutes}:${seconds}`;
        trophy[0].display="block";
        
    }
    modal.appendChild(subheading);
   
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

    const handleClearInterval = () => {
        if (handler === null) {
            alert("There is no interval to clear");
        } else {
            clearInterval(handler);
        }
    }
}

const updateMoves=()=>{
    movesCount.innerHTML=moves;
}

const resetGame=()=>{
  timeStart = false;
  seconds = 0;
  minutes = 0;
  timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";
  moves=0;
  movesCount.innerHTML=moves;
  opened = [];
    matched.forEach(element => {
        element.remove();
    });
  
  matched = [];
  
}
displayCards();
    



