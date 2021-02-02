let clicks = 1,
    scoreDB = clicks,
    usernameDB = prompt("Your UserName", "unknown user");

const userDB = {
    user: usernameDB,
    score: scoreDB
};

let scoreTop = [];

let timerout = 5000

const timeout = timerout;

const display = document.querySelector('#display'),
      timeDisplay = document.querySelector('#time__display')
      button = document.querySelector('#button'),
      counter = document.querySelector('#counter'),
      restartButton = document.querySelector('#restart'),
      winterButton = document.querySelector('#winter'),
      bodyHtml = document.querySelector("#body"),
      mediaText = document.querySelector("#mediaText");

button.onclick = start;

let themeWinterOn = true;

winterButton.onclick = () => {
    if (themeWinterOn) {
        restartButton.classList.add("winter__restart")
        winterButton.classList.add("winter__restart")
        button.classList.add("winter__button")
        bodyHtml.classList.add("winter")
        mediaText.classList.add("winter")
        themeWinterOn = false;
    } else {
        restartButton.classList.remove("winter__restart")
        winterButton.classList.remove("winter__restart")
        button.classList.remove("winter__button")
        bodyHtml.classList.remove("winter")
        mediaText.classList.remove("winter")
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

function start() {
    const startTime = Date.now();

    button.textContent = "Clicker";

    timeDisplay.textContent = formatTime(timeout);

    button.onclick = (() => {
        clicks += 1;
        display.textContent = ` Clicks: ${Math.trunc(clicks)}`;
        scoreDB = Math.trunc(clicks)
    });

    const interval = setInterval(() => {
        const delta = Date.now() - startTime;
        timeDisplay.textContent = formatTime(timeout - delta);
    }, 100);

    setTimeout(() => {
        button.onclick = null;
        timeDisplay.textContent = '';
        button.textContent = 'Game Over';

        userDB.score = Math.trunc(clicks);
        scoreTop.push({user: userDB.user ,score: userDB.score});
        
        function sortByAge(arr) {
            arr.sort((a, b) => a.score < b.score ? 1 : -1);
        }
        
        sortByAge(scoreTop)

        counter.innerHTML = '';
        for (let item = 0; item < scoreTop.length && item < 10; item++) {
            counter.innerHTML += `<li class=""> ${scoreTop[item].user} - score: ${scoreTop[item].score} </li>`;   
        };  

        restartButton.classList.remove("hide")
        restartButton.onclick = restart;

        clearInterval(interval);
        clearTimeout(timeout);
    }, timeout);
}

function formatTime(ms) {
    return Number.parseFloat(ms / 1000).toFixed(2);
};
