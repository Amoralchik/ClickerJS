
let clicks = 1,
    scoreDB = clicks,
    usernameDB = prompt("Your UserName", "unknown user");

const userDB = {
    user: usernameDB,
    score: scoreDB
};

let timeout = 5000;

let scoreTop = [];

const display = document.querySelector('#display'),
      timeDisplay = document.querySelector('#time__display')
      button = document.querySelector('#button'),
      counter = document.querySelector('#counter'),
      restartButton = document.querySelector('#restart'),
      winterButton = document.querySelector('#winter'),
      bodyHtml = document.querySelector("#body"),
      mediaText = document.querySelector("#mediaText"),
      gameModeSelector = document.querySelector("#gameMode");

const gameModeChenge = ["Classic", "10sec", "25sec", "idle"];
let gmNum = 0;
let gameMode = gameModeChenge[gmNum];

let gameModeFunc = () => {
    gmNum += 1;
    if (gmNum > 3) {
        gmNum = 0;
    };
    gameMode =  gameModeChenge[gmNum];
    gameModeSelector.innerHTML = `${gameMode}`;
    timeout =  gmNumberFix();
};

gameModeSelector.onclick = gameModeFunc;

button.onclick = start;

let themeWinterOn = true;

winterButton.addEventListener( "click" , themeChenge);

function themeChenge() {
    if (themeWinterOn) {
        restartButton.classList.add("winter__restart")
        winterButton.classList.add("winter__restart")
        button.classList.add("winter__button")
        bodyHtml.classList.add("winter")
        mediaText.classList.add("winter")
        gameModeSelector.classList.add("winter__restart")
        exitButton.classList.add("winter__restart");
        winterButton.textContent = "Light off";
        themeWinterOn = false;
    } else {
        restartButton.classList.remove("winter__restart")
        winterButton.classList.remove("winter__restart")
        button.classList.remove("winter__button")
        bodyHtml.classList.remove("winter")
        mediaText.classList.remove("winter")
        gameModeSelector.classList.remove("winter__restart")
        exitButton.classList.remove("winter__restart");
        winterButton.textContent = "Light on";
        themeWinterOn = true;
    }
    
};

function restart() {
    clicks = 1;
    timerout = 5000;
    restartButton.classList.add("hide")
    button.textContent = "Start Game";
    display.textContent = ``;
    button.onclick = start;
    restartButton.onclick = false;
};

function  gmNumberFix() {

    if (gmNum == 0 || gmNum == 1 || gmNum == 2) {
        if(gmNum == 0) {
            timerout = 5000;
        } else if (gmNum == 1) {
            timerout = 10000;
        } else {
            timerout = 25000;
        }
    };
    return timerout;
};

function start() {

    gameModeSelector.classList.add("hide")
    gameModeSelector.onclick = null;

    const startTime = Date.now();

    button.textContent = "Clicker";

    if (gmNum != 3) {
        timeDisplay.textContent = formatTime(timeout);;
    } else {
        timeDisplay.textContent = `idle `
    }

    button.onclick = (() => {
        clicks += 1;
        display.textContent = ` Clicks: ${Math.trunc(clicks)}`;
        scoreDB = Math.trunc(clicks)
    });

    if (gmNum != 3) {
        
        const interval = setInterval(() => {
            const delta = Date.now() - startTime;
            timeDisplay.textContent = formatTime(timeout - delta);
        }, 100);

        setTimeout(() => {
            button.onclick = null;
            timeDisplay.textContent = '';
            button.textContent = 'Game Over';

            endGameDB()

            gameModeSelector.classList.remove("hide")
            gameModeSelector.onclick = gameModeFunc;
            restartButton.classList.remove("hide")
            restartButton.onclick = restart;

            clearInterval(interval);
            clearTimeout(timeout);
        }, timeout);
    } else {
        const exitButton = document.querySelector('#exitButton');
        exitButton.classList.remove("hide");

        exitButton.onclick = exitIdle;
        
        function exitIdle() {
            button.onclick = null;
            button.textContent = 'Game Over';

            exitButton.onclick = null;
            exitButton.classList.add("hide");

            gameModeSelector.classList.remove("hide")
            gameModeSelector.onclick = gameModeFunc;

            endGameDB();
            clearTimeout(timeout);
            restart();
        }
    };
}

function formatTime(ms) {
    return Number.parseFloat(ms / 1000).toFixed(2);
};

function endGameDB() {
    userDB.score = Math.trunc(clicks);
    scoreTop.push({user: userDB.user, score: userDB.score, game: gameModeChenge[gmNum]});
    
    function sortByAge(arr) {
        arr.sort((a, b) => a.score < b.score ? 1 : -1);
    }
    

    
    sortByAge(scoreTop)

    counter.innerHTML = '';
    for (let item = 0; item < scoreTop.length && item < 10; item++) {
        counter.innerHTML += `
        <li class="">
        ${scoreTop[item].user} - score: ${scoreTop[item].score} |
        Game mode: ${scoreTop[item].game} 
        </li>`;   
    };  
};