console.log("Welcome to Tic Tac Toe");
//let music=new Audio("music.mp3");
let audioturn = new Audio("ting.mp3");
let gameover = new Audio("gameover.wav");
let turn = "X";
let end = false;

//timer

// Timer variables
let timerX, timerO;
let timerXSeconds = 0, timerOSeconds = 0;
let pauseTimeX = false, pauseTimeO = false;

// Function to update timer for Player X
function updateTimerX() {
    if (!pauseTimeX) {
        timerXSeconds++;
        let minutes = Math.floor(timerXSeconds / 60);
        let seconds = timerXSeconds % 60;
        document.getElementById("timerX").innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    if (timerXSeconds === 60) {
        clearInterval(timerX);
        document.getElementById("timerX").innerText = "Time's Up!";
        gameover.play();
        end = true;
        return;
    }
    if (timerXSeconds === 61) {
        // Ensure the timer stops after displaying "Time's Up!"
        clearInterval(timerX);
        return;
    }
}

// Function to update timer for Player O
function updateTimerO() {
    if (!pauseTimeO) {
        timerOSeconds++;
        let minutes = Math.floor(timerOSeconds / 60);
        let seconds = timerOSeconds % 60;
        document.getElementById("timerO").innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    if (timerOSeconds === 60) {
        clearInterval(timerO);
        setTimeout(() => {
            timerO = setInterval(updateTimerO, 1000); // Resume timer after one minute
        }, 60000);
        timerOSeconds = 0;
        pauseTimeO = true;
    }
}

// Reset timers
function resetTimers() {
    clearInterval(timerX);
    clearInterval(timerO);
    timerXSeconds = 0;
    timerOSeconds = 0;
    document.getElementById("timerX").innerText = "00:00";
    document.getElementById("timerO").innerText = "00:00";
    pauseTimeX = false;
    pauseTimeO = false;
}

// Start timers when the game starts
function startTimers() {
    resetTimers();
    timerX = setInterval(updateTimerX, 1000); // Update Player X's timer every second
    timerO = setInterval(updateTimerO, 1000); // Update Player O's timer every second
}

// Call startTimers() function at the beginning of the game
startTimers();
// Function to change turn
function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    document.querySelector('.info').innerText = "Turn for " + turn; // Update the turn information
    return turn;
}



//Function to check win

const checkWin = () => {
    let boxtexts = document.getElementsByClassName('boxText');
    let wins = [
        [0, 1, 2, -6, -6, 0], //good
        [3, 4, 5, -6, 0, 0],  //good
        [6, 7, 8, -6, 7, 0],  //good
        [0, 3, 6, -12.5, 0, 90],  //good
        [1, 4, 7, -6, 0, 90], //good
        [2, 5, 8, 0.5, 0, 90],//good
        [0, 4, 8, -8, -1.5, 47],
        [2, 4, 6, -10, 4, 135]
    ];

    wins.forEach(e => {
        if (
            boxtexts[e[0]].innerText !== '' &&
            boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
            boxtexts[e[0]].innerText === boxtexts[e[2]].innerText
        ) {
            let winner = boxtexts[e[0]].innerText; // Determine the winner ('X' or 'O')
            document.querySelector('.info').innerText = winner + " Won!";
            gameover.play();
            end = true;


            // //line set
            // document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            // document.querySelector(".line").style.width = "25vw";



            
            // Apply winning effect to the winning boxes
            for (let i = 0; i < 3; i++) {
                document.querySelector(`.box:nth-child(${e[i] + 1})`).classList.add('winning-box');
            }



            pauseTimeX = true;
            pauseTimeO = true;

        }
    });

    // Check if nobody wins
    let filledBoxes = Array.from(boxtexts).every(box => box.innerText !== '');
    if (filledBoxes && !end) {
        document.querySelector('.info').innerText = "It's a draw!";
        end = true;
    }

    if (end) {
        return;
    }

}

//Game Logic

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxText');
    element.addEventListener('click', () => {

        if (boxtext.innerText === '' && !end) {
            boxtext.innerText = turn;
            changeTurn();
            audioturn.play();
            setTimeout(function () {
                audioturn.pause();
                audioturn.currentTime = 0;
            }, 1000); // Setting duration to 0.01 seconds
            checkWin();
            //document.getElementsByClassName("info")[0].innerText="Turn for "+ turn;


        }
    }

    )

})
// Function to reset the game
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxText');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X"; // Reset the turn to "X"
    end = false;
    document.querySelector('.info').innerText = "Turn for " + turn; // Update the turn information

        // Remove the winning-box class from all boxes
        let boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
            box.classList.remove('winning-box');
        });

    // document.querySelector(".line").style.width = "0";
    // Start timers again
    startTimers();

});


