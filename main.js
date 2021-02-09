let inputUN = document.querySelector('#input__UserName');
let btnUN = document.querySelector('#btnUN');

let clicks = 0,
    scoreDB = clicks,
    usernameDB = "Guest";

const userDB = {
    user: usernameDB,
    score: scoreDB
};

const idleCol2 = document.querySelector("#idleCol2"),
      idleCol3 = document.querySelector("#idleCol3"),
      showAlertLogin = document.querySelector("#showAlertLogin"),
      showToastLogin = document.querySelector('#showToastLogin');

function userNameInput() {
    btnUN.onclick = () => {
        if (inputUN.value == "" || inputUN.value == null || inputUN.value == undefined ) {
            userDB.user = "Guest";
        } else { 
            showAlertLogin.classList.remove("hide");
            setTimeout(() => {
                inputUN.setAttribute("disabled", null);
                btnUN.setAttribute("disabled", null);
                
                let inUN = inputUN.value;
                let newUserName = inUN;
                if (inUN.length > 10) {
                    newUserName = `${inUN.substring(0, 11)}...`;
                };
                showToastLogin.classList.add("show");
                showAlertLogin.textContent = `Your Username: ${newUserName.toUpperCase()}`;
                userDB.user = newUserName.toUpperCase();
            }, 200)
            setTimeout(() => {
                showToastLogin.classList.remove("show");
                inputUN.removeAttribute("disabled");
                btnUN.removeAttribute("disabled");
            }, 2000)
        };
    };

    inputUN.onkeyup = (e) => {
        if (inputUN.value == "" || inputUN.value == null || inputUN.value == undefined ) {
            userDB.user = "Guest";
        } else { 
            if (e.key == "Enter") {
                inputUN.setAttribute("disabled", null);
                btnUN.setAttribute("disabled", null);

                let inUN = inputUN.value;
                let newUserName = inUN;
                if (inUN.length > 10) {
                    newUserName = `${inUN.substring(0, 11)}...`;
                };
                setTimeout(() => {
                    showToastLogin.classList.add("show");
                    showAlertLogin.textContent = `Your Username: ${newUserName.toUpperCase()}`;
                    userDB.user = newUserName.toUpperCase();
                }, 200)
                setTimeout(() => {
                    showToastLogin.classList.remove("show");
                    inputUN.removeAttribute("disabled");
                    btnUN.removeAttribute("disabled");
                }, 2000)
            };
        };
    };
};

userNameInput();

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
      mediaText = document.querySelector("#mediaText"),
      idleCol4 = document.querySelector("#idleCol4");

const btnradio1 = document.querySelector("#btnradio1"),
      btnradio2 = document.querySelector("#btnradio2"),
      btnradio3 = document.querySelector("#btnradio3"),
      btnradio4 = document.querySelector("#btnradio4");

const gameModeChenge = ["Classic", "10sec", "15sec", "idle"];
let gmNum = 0;
let gameMode = gameModeChenge[gmNum];

function btnRadioOnClick() {
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
};

btnRadioOnClick();

let gameModeFunc = () => {
    gameMode =  gameModeChenge[gmNum];
    timeout =  gmNumberFix();
};

button.onclick = start;

let themeWinterOn = true;

winterButton.addEventListener( "click" , themeChenge);

function themeChenge() {

    restartButton.classList.toggle("winter__restart");
    winterButton.classList.toggle("winter__restart");
    button.classList.toggle("winter__button");
    bodyHtml.classList.toggle("winter");
    mediaText.classList.toggle("winter");
    exitButton.classList.toggle("winter__restart");
    if (themeWinterOn) {
        winterButton.innerHTML = `LIGHT <i class="bi bi-toggle-on"></i>`;
        themeWinterOn = false;
    } else {
        winterButton.innerHTML = `LIGHT <i class="bi bi-toggle-off"></i>`;
        themeWinterOn = true;
    }
    
};

themeChenge()

timeDisplay.textContent = '0:00';
display.textContent = `CLICKS: 0`;

function restart() {
    clicks = 0;
    timerout = 5000;
    restartButton.setAttribute("disabled", null);
    inputUN.removeAttribute("disabled");
    btnUN.removeAttribute("disabled");
    button.textContent = "START GAME";
    display.textContent = `CLICKS: 0`;
    button.onclick = start;
    restartButton.onclick = false;
};

function  gmNumberFix() {

    if (gmNum == 0 || gmNum == 1 || gmNum == 2) {
        if(gmNum == 0) {
            timerout = 5000;
            return timerout;
        } else if (gmNum == 1) {
            timerout = 10000;
            return timerout;
        } else {
            timerout = 15000;
            return timerout;
        }
    }
    else {
        return null;
    };
};

let clicksResult = 0; 
let clicksBonus = 0; 

function start() {

    btnDisable();
    inputUN.setAttribute("disabled", null);
    btnUN.setAttribute("disabled", null);
    const startTime = Date.now();

    button.textContent = "CLICK";

    if (gmNum != 3) {
        timeDisplay.textContent = formatTime(timeout);;
    } else {
        timeDisplay.textContent = `GEMS PER SECOND: 0`;
    }

    button.onclick = (() => {
        clicks += 1;
        clicksResult = clicks ;
        display.textContent = ` CLICKS: ${clicksResult}`;
        scoreDB = clicksResult;
    });

    if (gmNum != 3) {
        
        const interval = setInterval(() => {
            const delta = Date.now() - startTime;
            timeDisplay.textContent = formatTime(timeout - delta);
        }, 100);

        setTimeout(() => {
            button.onclick = null;
            timeDisplay.textContent = '0:00';
            button.textContent = 'GAME OVER';

            endGameDB()

            btnDisable()
            restartButton.removeAttribute("disabled");
            restartButton.onclick = restart;

            clearInterval(interval);
            clearTimeout(timeout);
        }, timeout);
    } else {

        // timeDisplay.textContent = `GEMS PER SECOND: `;

        button.onclick = null;

        idleCol3.classList.add("hide");
        idleCol2.classList.add("hide");

        idleCol4.classList.remove("hide");

        const exitButton = document.querySelector('#exitButton');
        exitButton.removeAttribute("disabled");

        exitButton.onclick = exitIdle;
        
        const listBtn1 = document.querySelector('#list-btn-1'),
              listBtn2 = document.querySelector('#list-btn-2'),
              listBtn3 = document.querySelector('#list-btn-3'),
              listBtn4 = document.querySelector('#list-btn-4');
              listBtn5 = document.querySelector('#list-btn-5');

        listBtn1.setAttribute('disabled', null);
        listBtn5.setAttribute('disabled', null);
      
        let clicksUpdateCost = 100;
        let UpdateCostNum;

        button.onclick = (() => {
            clicks += 1 + clicksBonus;
            clicksResult = clicks;
            display.textContent = ` GEMS: ${clicksResult}`;
            scoreDB = clicksResult;
            clicksUpdateUpdata();
            gamsMine();
        });
        
        listBtn1.textContent = ` Buy Upgrade: ${clicksUpdateCost}`;

        let btnUpdataNum = 0;

        let updateGemsMineCostNum = 1000;
        listBtn5.textContent = ` Buy Upgrade: ${updateGemsMineCostNum}`;

        let clicksGemsMine = 0;

        function gamsMine() {
            if (clicks >= updateGemsMineCostNum) {
                listBtn5.removeAttribute('disabled');
                listBtn5.onclick = () => {
                    clicksGemsMine += 1;
                    clicks = clicks - updateGemsMineCostNum;
                    updateGemsMineCostNum = Math.ceil(updateGemsMineCostNum * 1.25);
                    listBtn5.textContent = ` Buy Upgrade: ${updateGemsMineCostNum}`;
                    timeDisplay.textContent = ` GEMS PER SECOND: ${clicksGemsMine} `;
                    display.textContent = `GEMS: ${clicks}`;
                    clicksUpdateUpdata();
                    gamsMine();
                };
            } else {
                listBtn5.setAttribute('disabled', null);
            };
        };

        setInterval(() => {
            clicks += clicksGemsMine;
            clicksResult = clicks;
            timeDisplay.textContent = ` GEMS PER SECOND: ${clicksGemsMine} `;
            display.textContent = `GEMS: ${clicksResult}`;
        }, 1000)

        let clicksOnUpdate = 0

        function clicksUpdateUpdata() {

            const listBtnUpdataChenge = ["1", "10", "100"];

            if (btnUpdataNum == 0) {
                btnUpdataNum = 0;
                UpdateCostNum = clicksUpdateCost;
                listBtn1.textContent = ` Buy Upgrade: ${UpdateCostNum}`;
                btnUpdataFunc();
                UpdateCostFunc();
            };
            
            function listBtnFunc() {
                listBtn2.onclick = () => {
                    btnUpdataNum = 0;
                    UpdateCostNum = clicksUpdateCost;
                    listBtn1.textContent = ` Buy Upgrade: ${UpdateCostNum}`;
                    btnUpdataFunc();
                    UpdateCostFunc();
                };
                listBtn3.onclick = () => {
                    btnUpdataNum = 1;
                    UpdateCostNum = (clicksUpdateCost * 10);
                    listBtn1.textContent = ` Buy Upgrade: ${UpdateCostNum}`;
                    btnUpdataFunc();
                    UpdateCostFunc();
                };
                listBtn4.onclick = () => {
                    btnUpdataNum = 2;
                    UpdateCostNum = (clicksUpdateCost * 100);
                    listBtn1.textContent = ` Buy Upgrade: ${UpdateCostNum}`;
                    btnUpdataFunc();
                    UpdateCostFunc();
                };

                if (btnUpdataNum == 0 || btnUpdataNum == 1 || btnUpdataNum == 2) {
                    if (btnUpdataNum == 0) {
                        btnUpdataNum = 0;
                        UpdateCostNum = clicksUpdateCost;
                        listBtn1.textContent = ` Buy Upgrade: ${UpdateCostNum}`;
                        btnUpdataFunc();
                        UpdateCostFunc();
                    }
                    else if (btnUpdataNum == 1) {
                        btnUpdataNum = 1;
                        UpdateCostNum = (clicksUpdateCost * 10);
                        listBtn1.textContent = ` Buy Upgrade: ${UpdateCostNum}`;
                        btnUpdataFunc();
                        UpdateCostFunc();
                    }
                    else {
                        btnUpdataNum = 2;
                        UpdateCostNum = (clicksUpdateCost * 100);
                        listBtn1.textContent = ` Buy Upgrade: ${UpdateCostNum}`;
                        btnUpdataFunc();
                        UpdateCostFunc();
                    };
                };
            }

            listBtnFunc();

            function UpdateCostFunc() {
                if (clicks >= UpdateCostNum) {
                    listBtn1.removeAttribute('disabled');
                    listBtn1.onclick = () => {  
                        
                        if (btnUpdataNum == 0) { 
                            clicksBonus += 1; 
                            clicksOnUpdate += 1;
                            clicksUpdateCost += clicksBonus;
                        }
                        else if (btnUpdataNum == 1) {  
                            clicksOnUpdate += 10;
                            for (let index = 0; index < 10; index++) {
                                clicksBonus += 1;
                                clicksUpdateCost += clicksBonus;  
                            }
                        }
                        else { 
                            clicksOnUpdate += 100;
                            for (let index = 0; index < 100; index++) {
                                clicksBonus += 1;
                                clicksUpdateCost += clicksBonus;  
                            }
                        };

                        clicks =  clicks - UpdateCostNum;
                        UpdateCostNum = clicksUpdateCost;
                        display.textContent = ` GEMS: ${clicks}`;
                        listBtn1.textContent = ` Buy Upgrade: ${clicksUpdateCost}`;
                        clicksUpdateUpdata();
                        btnUpdataFunc();
                        UpdateCostFunc();
                        listBtnFunc();
                        gamsMine();
                    };
                } 
                else {
                    listBtn1.setAttribute('disabled', null);
                };
            };
            
            UpdateCostFunc();

            function btnUpdataFunc() {
                UpdateNum =  listBtnUpdataChenge[btnUpdataNum];
            };
        };

        function exitIdle() {
            idleCol4.classList.add("hide");
            
            idleCol3.classList.remove("hide");
            idleCol2.classList.remove("hide");

            button.onclick = null;
            button.textContent = 'GAME OVER';
            
            timeDisplay.textContent = '0:00';

            btnDisable()
            exitButton.onclick = null;
            exitButton.setAttribute("disabled", null);

            clearTimeout(timeout);
            restart();
            clicksResult = 0; 
            clicksBonus = 0; 
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
    clicksResult = 0; 
    clicksBonus = 0; 
    
    if (gmNum == 0) {
        scoreTop1.push({user: userDB.user, score: userDB.score, game: gameModeChenge[gmNum]});
        
        sortTop(scoreTop1)

        top1.innerHTML = '';
        for (let item = 0; item < scoreTop1.length && item < 10; item++) {
            top1.innerHTML += `
            <li class="list-group-item bg-transparent text-uppercase">
            ${item + 1}. ${scoreTop1[item].user} - score: ${scoreTop1[item].score}
            </li>`;   
        };
    } 
    else if (gmNum == 1) {
        scoreTop2.push({user: userDB.user, score: userDB.score, game: gameModeChenge[gmNum]});
        
        sortTop(scoreTop2)

        top2.innerHTML = '';
        for (let item = 0; item < scoreTop2.length && item < 10; item++) {
            top2.innerHTML += `
            <li class="list-group-item bg-transparent text-uppercase">
            ${item  + 1}. ${scoreTop2[item].user} - score: ${scoreTop2[item].score}
            </li>`;   
        };
    } 
    else {
        scoreTop3.push({user: userDB.user, score: userDB.score, game: gameModeChenge[gmNum]});
        
        sortTop(scoreTop3)

        top3.innerHTML = '';
        for (let item = 0; item < scoreTop3.length && item < 10; item++) {
            top3.innerHTML += `
            <li class="list-group-item bg-transparent text-uppercase">
            ${item  + 1}. ${scoreTop3[item].user} - score: ${scoreTop3[item].score} 
            </li>`;   
        };
    };
};

let btnDisableTrue = false;

function btnDisable() {
    if (btnDisableTrue) {
        btnUN.removeAttribute("disabled");
        inputUN.removeAttribute("disabled");
        btnradio1.removeAttribute("disabled");
        btnradio2.removeAttribute("disabled");
        btnradio3.removeAttribute("disabled");
        btnradio4.removeAttribute("disabled");
        btnDisableTrue = false;

        btnRadioOnClick();
        userNameInput();
        
    } else {  
        btnUN.setAttribute("disabled", null);
        inputUN.setAttribute("disabled", null);
        btnradio1.setAttribute("disabled", null);
        btnradio2.setAttribute("disabled", null);
        btnradio3.setAttribute("disabled", null);
        btnradio4.setAttribute("disabled", null);
        btnUN.onclick = null;
        inputUN.onkeyup = null;
        btnradio1.onclick = null;
        btnradio2.onclick = null;
        btnradio3.onclick = null;
        btnradio4.onclick = null;
        btnDisableTrue = true;
    }

};