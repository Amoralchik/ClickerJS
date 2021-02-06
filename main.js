
let clicks = 1,
    scoreDB = clicks,
    usernameDB = prompt("Your UserName", "unknown user");

const userDB = {
    user: usernameDB,
    score: scoreDB
};

let timeout = 5000;

let scoreTop1 = [];
let scoreTop2 = [];
let scoreTop3 = [];

const display = document.querySelector('#display'),
      timeDisplay = document.querySelector('#time__display')
      button = document.querySelector('#button'),
      counter = document.querySelector('#counter'),
      restartButton = document.querySelector('#restart'),
      winterButton = document.querySelector('#winter'),
      bodyHtml = document.querySelector("#body"),
      mediaText = document.querySelector("#mediaText");

const btnradio1 = document.querySelector("#btnradio1"),
      btnradio2 = document.querySelector("#btnradio2"),
      btnradio3 = document.querySelector("#btnradio3"),
      btnradio4 = document.querySelector("#btnradio4");

const gameModeChenge = ["Classic", "10sec", "15sec", "idle"];
let gmNum = 0;
let gameMode = gameModeChenge[gmNum];

btnradio1.onclick = () => {
    gmNum = 0;
    gameModeFunc();
};

btnradio2.onclick = () => {
    gmNum = 1;
    gameModeFunc();
};

btnradio3.onclick = () => {
    gmNum = 2;
    gameModeFunc();
};

btnradio4.onclick = () => {
    gmNum = 3;
    gameModeFunc();
};

let gameModeFunc = () => {
    gameMode =  gameModeChenge[gmNum];
    timeout =  gmNumberFix();
};

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
        exitButton.classList.add("winter__restart");
        winterButton.textContent = "LIGHT OFF";
        themeWinterOn = false;
    } else {
        restartButton.classList.remove("winter__restart")
        winterButton.classList.remove("winter__restart")
        button.classList.remove("winter__button")
        bodyHtml.classList.remove("winter")
        mediaText.classList.remove("winter")
        exitButton.classList.remove("winter__restart");
        winterButton.textContent = "LIGHT ON";
        themeWinterOn = true;
    }
    
};

function restart() {
    clicks = 1;
    timerout = 5000;
    restartButton.setAttribute("disabled", null);
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
            timerout = 15000;
        }
    };
    return timerout;
};

restartButton.setAttribute("disabled", null);

function start() {

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


            restartButton.removeAttribute("disabled");
            restartButton.onclick = restart;

            clearInterval(interval);
            clearTimeout(timeout);
        }, timeout);
    } else {
        const exitButton = document.querySelector('#exitButton');
        exitButton.removeAttribute("disabled");

        exitButton.onclick = exitIdle;
        
        function exitIdle() {
            button.onclick = null;
            button.textContent = 'Game Over';

            timeDisplay.textContent = '';

            exitButton.onclick = null;
            exitButton.setAttribute("disabled", null);

            clearTimeout(timeout);
            restart();
        }
    };
}

function formatTime(ms) {
    return Number.parseFloat(ms / 1000).toFixed(2);
};

function sortTop(arr) {
    arr.sort((a, b) => a.score < b.score ? 1 : -1);
}

function endGameDB() {
    userDB.score = Math.trunc(clicks);
    
    if (gmNum == 0) {
        scoreTop1.push({user: userDB.user, score: userDB.score, game: gameModeChenge[gmNum]});
        
        sortTop(scoreTop1)

        top1.innerHTML = '';
        for (let item = 0; item < scoreTop1.length && item < 10; item++) {
            top1.innerHTML += `
            <li class="list-group-item bg-transparent">
            ${item + 1} ${scoreTop1[item].user} - score: ${scoreTop1[item].score}
            </li>`;   
        };
    } 
    else if (gmNum == 1) {
        scoreTop2.push({user: userDB.user, score: userDB.score, game: gameModeChenge[gmNum]});
        
        sortTop(scoreTop2)

        top2.innerHTML = '';
        for (let item = 0; item < scoreTop2.length && item < 10; item++) {
            top2.innerHTML += `
            <li class="list-group-item bg-transparent">
            ${item} ${scoreTop2[item].user} - score: ${scoreTop2[item].score}
            </li>`;   
        };
    } 
    else {
        scoreTop3.push({user: userDB.user, score: userDB.score, game: gameModeChenge[gmNum]});
        
        sortTop(scoreTop3)

        top3.innerHTML = '';
        for (let item = 0; item < scoreTop3.length && item < 10; item++) {
            top3.innerHTML += `
            <li class="list-group-item bg-transparent">
            ${item} ${scoreTop3[item].user} - score: ${scoreTop3[item].score} 
            </li>`;   
        };
    };
};