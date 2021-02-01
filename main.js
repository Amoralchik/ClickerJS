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
      restartButton = document.querySelector('#restart');

button.onclick = start;
restartButton.onclick = restart;

function restart() {
    clicks = 1;
    timerout = 5000;
    restartButton.classList.add("hide")
    button.textContent = "Start Game";
    display.textContent = ``;
    button.onclick = start;
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

        clearInterval(interval);
        clearTimeout(timeout);
    }, timeout);
}

function formatTime(ms) {
    return Number.parseFloat(ms / 1000).toFixed(2);
};
