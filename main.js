let inputUN = document.querySelector("#input__UserName");
let btnUN = document.querySelector("#btnUN");

const mediaText = document.querySelector("#mediaText");
mediaText.textContent = "Version: 0.15.5.1";

class btnClickCreate {
	constructor(startCost, name, index, id, update) {
		this.cost = startCost;
		this.updateCost = this.cost;
		this.updateNum10 = 0;
		this.updateNum100 = 0;
		this.name = name;
		this.index = index;
		this.id = id;
		this.update = update;
		this.bonus = 0;
	}

	NumFix = () => {
		if (this.updateNum10 >= 10 || this.updateNum100 >= 100) {
			if (this.updateNum10 >= 10) {
				this.updateNum10 = 0;
			}
			if (this.updateNum100 >= 100) {
				this.updateNum100 = 0;
			}
		}
	};

	ArgNumFix = (argNum, arg = false, mode) => {
		if (arg) {
			if (mode == 10) {
				return argNum - this.updateNum10;
			} else if (mode == 100) {
				return argNum - this.updateNum100;
			} else {
				return argNum;
			}
		} else {
			return argNum;
		}
	};

	CostFix = (argNum, arg = false, mode) => {
		this.NumFix();
		let newUpdateCost = this.cost;
		let newBonus = this.update;
		let newUpdateReCost = newUpdateCost;

		if (arg) {
			argNum = this.ArgNumFix(argNum, arg, mode);
		}

		for (let index = 0; index < argNum; index++) {
			if (index == 0) {
				newUpdateCost += newBonus;
			} else {
				newUpdateCost += newBonus + newUpdateReCost;
			}
			newUpdateReCost += newBonus;
		}

		return newUpdateCost;
	};

	UpdateCostFunc = (clicks, num, arg = false, argBonus = 1, mode) => {
		this.NumFix();
		num = this.ArgNumFix(num, arg, mode);
		for (let index = 0; index < num; index++) {
			this.bonus += argBonus;
			this.cost += this.update;
			this.updateNum100 += 1;
			this.updateNum10 += 1;
			this.NumFix();
		}
		return clicks - this.updateCost;
	};

	start = () => {
		this.bonus += 1;
		this.NumFix();
		this.updateNum100 += 1;
		this.updateNum10 += 1;
	};
}

let clicks = 0,
	clicksDB = 0,
	scoreDB = clicks,
	usernameDB = "Guest";

const userDB = {
	user: usernameDB,
	score: scoreDB,
};

const idleCol2 = document.querySelector("#idleCol2"),
	idleCol3 = document.querySelector("#idleCol3"),
	showAlertLogin = document.querySelector("#showAlertLogin"),
	showToastLogin = document.querySelector("#showToastLogin");

function userNameInput() {
	btnUN.onclick = () => {
		if (inputUN.value == "" || inputUN.value == null || inputUN.value == undefined) {
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
				}
				showToastLogin.classList.add("show");
				showAlertLogin.textContent = `Your Username: ${newUserName.toUpperCase()}`;
				userDB.user = newUserName.toUpperCase();
				setTimeout(() => {
					showToastLogin.classList.remove("show");
					inputUN.removeAttribute("disabled");
					btnUN.removeAttribute("disabled");
					setTimeout(() => {
						showAlertLogin.classList.add("hide");
					}, 300);
				}, 2000);
			}, 200);
		}
	};

	inputUN.onkeyup = (e) => {
		if (inputUN.value == "" || inputUN.value == null || inputUN.value == undefined) {
			userDB.user = "Guest";
		} else {
			if (e.key == "Enter") {
				showAlertLogin.classList.remove("hide");
				inputUN.setAttribute("disabled", null);
				btnUN.setAttribute("disabled", null);

				let inUN = inputUN.value;
				let newUserName = inUN;
				if (inUN.length > 10) {
					newUserName = `${inUN.substring(0, 11)}...`;
				}
				setTimeout(() => {
					showToastLogin.classList.add("show");
					showAlertLogin.textContent = `Your Username: ${newUserName.toUpperCase()}`;
					userDB.user = newUserName.toUpperCase();
					setTimeout(() => {
						showToastLogin.classList.remove("show");
						inputUN.removeAttribute("disabled");
						btnUN.removeAttribute("disabled");
						setTimeout(() => {
							showAlertLogin.classList.add("hide");
						}, 300);
					}, 2000);
				}, 200);
			}
		}
	};
}

userNameInput();

let timeout = 5000;

let scoreTop1 = [];
let scoreTop2 = [];
let scoreTop3 = [];

const display = document.querySelector("#display"),
	timeDisplay = document.querySelector("#time__display"),
	button = document.querySelector("#buttonGame"),
	counter = document.querySelector("#counter"),
	restartButton = document.querySelector("#restart"),
	winterButton = document.querySelector("#winter"),
	bodyHtml = document.querySelector("#body"),
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
}

btnRadioOnClick();

let gameModeFunc = () => {
	gameMode = gameModeChenge[gmNum];
	timeout = gmNumberFix();
};

button.onclick = start;

let themeWinterOn = true;

winterButton.addEventListener("click", themeChenge);

const dataTime = new Date();

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
}

if (dataTime.getHours() >= 7 && dataTime.getHours() <= 18) {
	themeChenge();
}

timeDisplay.textContent = "0:00";
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
}

function gmNumberFix() {
	if (gmNum == 0 || gmNum == 1 || gmNum == 2) {
		if (gmNum == 0) {
			timerout = 5000;
			return timerout;
		} else if (gmNum == 1) {
			timerout = 10000;
			return timerout;
		} else {
			timerout = 15000;
			return timerout;
		}
	} else {
		return null;
	}
}

let clicksResult = 0;
let clicksBonus = 0;

function start() {
	btnDisable();
	inputUN.setAttribute("disabled", null);
	btnUN.setAttribute("disabled", null);
	const startTime = Date.now();

	button.textContent = "CLICK";

	if (gmNum != 3) {
		timeDisplay.textContent = formatTime(timeout);
	} else {
		timeDisplay.textContent = `GEMS PER SECOND: 0`;
	}

	button.onclick = () => {
		clicks += 1;
		clicksResult = clicks;
		display.textContent = ` CLICKS: ${clicksResult}`;
		scoreDB = clicksResult;
	};

	if (gmNum != 3) {
		const interval = setInterval(() => {
			const delta = Date.now() - startTime;
			timeDisplay.textContent = formatTime(timeout - delta);
		}, 100);

		setTimeout(() => {
			button.onclick = null;
			timeDisplay.textContent = "0:00";
			button.textContent = "GAME OVER";

			endGameDB();

			btnDisable();
			restartButton.removeAttribute("disabled");
			restartButton.onclick = restart;

			clearInterval(interval);
			clearTimeout(timeout);
		}, timeout);
	} else {
		display.textContent = ` GEMS: 0`;

		// timeDisplay.textContent = `GEMS PER SECOND: `;
		//.toLocaleString()

		let startIdle = true;

		button.onclick = null;

		idleCol3.classList.add("hide");
		idleCol2.classList.add("hide");

		idleCol4.classList.remove("hide");

		const exitButton = document.querySelector("#exitButton");
		exitButton.removeAttribute("disabled");

		exitButton.onclick = exitIdle;

		const listBtn1 = document.querySelector("#list-btn-1"),
			listBtn5 = document.querySelector("#list-btn-5"),
			listBtn7 = document.querySelector("#list-btn-7");

		let btnCreated3 = new btnClickCreate(0, listBtn7, 1, 3, 1000),
			btnCreated2 = new btnClickCreate(9500, listBtn5, 1, 2, 500),
			btnCreated1 = new btnClickCreate(95, listBtn1, 1, 1, 5);

		const btnIdGroupUpg = document.querySelector("#btnIdGroupUpg"),
			btnUpgId = btnIdGroupUpg.querySelectorAll("input");

		const PlabelUpgrade = document.querySelector("#PlabelUpgrade"),
			displayClicks = document.querySelector("#display__clicks");

		listBtn1.setAttribute("disabled", null);
		listBtn5.setAttribute("disabled", null);
		listBtn7.setAttribute("disabled", null);

		button.onclick = () => {
			clicks += btnCreated1.bonus;
			clicksDB += btnCreated1.bonus;
			clicksResult = clicks;
			display.textContent = ` GEMS: ${clicksResult.toLocaleString()}`;
			scoreDB = clicksResult;
			clicksUpdateUpdata();
			statDBUpdata();
		};

		listBtn1.textContent = ` Buy Upgrade: `;
		listBtn5.textContent = ` Buy Upgrade: `;
		PlabelUpgrade.textContent = ` Lvl:  `;
		listBtn7.textContent = ` Buy Upgrade: `;

		let nextButtonActive = false;
		let minerGemsClicks = 0;
		let minerGemsOn = false;
		let btnUpdataNum = 0;

		const intervalID = setInterval(() => {
			if (gmNum == 3) {
				clicks += btnCreated2.bonus + minerGemsClicks;
				clicksDB += btnCreated2.bonus + minerGemsClicks;
				clicksResult = clicks;
				timeDisplay.textContent = ` GEMS PER SECOND: ${(btnCreated2.bonus + minerGemsClicks).toLocaleString()} `;
				display.textContent = `GEMS: ${clicksResult.toLocaleString()}`;
				clicksUpdateUpdata();
				statDBUpdata();
			}
		}, 1000);

		if (startIdle) {
			clicksUpdateUpdata();
			startIdle = false;
		}

		function clicksUpdateUpdata() {
			// console.log( debagNum );

			function btnClickUpdata(btn) {
				btn.index = letbiHight(btn);
				btn.NumFix();
			}

			btnUpgId[4].onclick = () => {
				if (!nextButtonActive) {
					nextButtonActive = true;
				} else {
					nextButtonActive = false;
				}
				clicksUpdateUpdata();
			};

			btnClickUpdata(btnCreated3);
			btnClickUpdata(btnCreated2);
			btnClickUpdata(btnCreated1);

			PlabelUpgrade.textContent = ` Lvl: ${btnCreated1.bonus.toLocaleString()} `;
			displayClicks.textContent = ` Gems per click: ${btnCreated1.bonus.toLocaleString()} `;

			if (btnUpdataNum == 0) {
				btnUpdataNum = 0;
				btnCreated1.updateCost = btnCreated1.CostFix(1);
				listBtn1.textContent = ` Buy Upgrade: 1 per: ${btnCreated1.updateCost.toLocaleString()}`;
			}

			function listBtnFunc() {
				btnUpgId[0].onclick = () => {
					btnNumFix(0, 1);
					clicksUpdateUpdata();
				};
				btnUpgId[1].onclick = () => {
					btnNumFix(1, 10);
					clicksUpdateUpdata();
				};
				btnUpgId[2].onclick = () => {
					btnNumFix(2, 100);
					clicksUpdateUpdata();
				};
				btnUpgId[3].onclick = () => {
					btnNumFix(3, btnCreated1.index);
					clicksUpdateUpdata();
				};

				if (btnUpdataNum == 0 || btnUpdataNum == 1 || btnUpdataNum == 2 || btnUpdataNum == 3) {
					if (btnUpdataNum == 0) {
						btnNumFix(0, 1);
					} else if (btnUpdataNum == 1) {
						btnNumFix(1, 10);
					} else if (btnUpdataNum == 2) {
						btnNumFix(2, 100);
					} else {
						btnNumFix(3, 1, true);
					}
				}

				function btnNumFix(arg, num, numfix = false) {
					btnUpdataNum = arg;

					function btnUpdate(...btn) {
						for (let index = 0; index < btn.length; index++) {
							if (numfix == true) {
								num = btn[index].index;
							}

							if (nextButtonActive) {
								btn[index].NumFix;
								if (btnUpdataNum == 2) {
									btn[index].updateCost = btn[index].CostFix(num, true, 100);
									btn[index].name.textContent = ` Buy Upgrade: ${btn[index].ArgNumFix(num, true, 100).toLocaleString()} per: ${btn[index].updateCost.toLocaleString()}`;
								} else if (btnUpdataNum == 1) {
									btn[index].updateCost = btn[index].CostFix(num, true, 10);
									btn[index].name.textContent = ` Buy Upgrade: ${btn[index].ArgNumFix(num, true, 10).toLocaleString()} per: ${btn[index].updateCost.toLocaleString()}`;
								} else {
									btn[index].updateCost = btn[index].CostFix(num);
									btn[index].name.textContent = ` Buy Upgrade: ${btn[index].ArgNumFix(num, false).toLocaleString()} per: ${btn[index].updateCost.toLocaleString()}`;
								}
							} else {
								btn[index].updateCost = btn[index].CostFix(num);
								btn[index].name.textContent = ` Buy Upgrade: ${num.toLocaleString()} per: ${btn[index].updateCost.toLocaleString()}`;
							}
						}
					}
					btnUpdate(btnCreated1, btnCreated2, btnCreated3);
				}
			}

			listBtnFunc();

			function letbiHight(btn) {
				let whileSetTrue = true;
				let indexClicks = 1;
				let updateCostWhile = btn.updateCost;

				while (whileSetTrue) {
					if (clicks >= updateCostWhile) {
						indexClicks += 1;
						updateCostWhile = btn.CostFix(indexClicks);
					} else {
						indexClicks -= 1;
						if (indexClicks <= 0) {
							return 1;
						} else {
							return indexClicks;
						}
					}
				}
			}

			function clicksBtnUpdate() {
				function updateBtnClick(btn, num, argBonus, mode = false) {
					if (nextButtonActive) {
						return btn.UpdateCostFunc(clicks, num, true, argBonus, mode);
					} else {
						return btn.UpdateCostFunc(clicks, num, false, argBonus);
					}
				}

				if (clicks >= btnCreated1.updateCost) {
					btnCreated1.name.removeAttribute("disabled");
					btnCreated1.name.onclick = () => {
						if (btnUpdataNum == 0) {
							clicks = updateBtnClick(btnCreated1, 1, 1);
						} else if (btnUpdataNum == 1) {
							clicks = updateBtnClick(btnCreated1, 10, 1, 10);
						} else if (btnUpdataNum == 2) {
							clicks = updateBtnClick(btnCreated1, 100, 1, 100);
						} else {
							clicks = updateBtnClick(btnCreated1, btnCreated1.index, 1);
						}

						display.textContent = `GEMS: ${clicks.toLocaleString()}`;
						clicksUpdateUpdata();
						clicksBtnUpdate();
					};
				} else {
					btnCreated1.name.setAttribute("disabled", null);
				}

				if (clicks >= btnCreated2.updateCost) {
					btnCreated2.name.removeAttribute("disabled");
					btnCreated2.name.onclick = () => {
						if (btnUpdataNum == 0) {
							clicks = updateBtnClick(btnCreated2, 1, 100);
						} else if (btnUpdataNum == 1) {
							clicks = updateBtnClick(btnCreated2, 10, 100, 10);
						} else if (btnUpdataNum == 2) {
							clicks = updateBtnClick(btnCreated2, 100, 100, 100);
						} else {
							clicks = updateBtnClick(btnCreated2, btnCreated2.index, 1);
						}

						if (minerGemsOn != true) {
							minerGemsOn = true;
						}

						display.textContent = `GEMS: ${clicks.toLocaleString()}`;
						clicksUpdateUpdata();
						clicksBtnUpdate();
					};
				} else {
					btnCreated2.name.setAttribute("disabled", null);
				}

				if (clicks >= btnCreated3.updateCost) {
					btnCreated3.name.removeAttribute("disabled");
					btnCreated3.name.onclick = () => {
						if (btnUpdataNum == 0) {
							clicks = updateBtnClick(btnCreated3, 1, 1);
						} else if (btnUpdataNum == 1) {
							clicks = updateBtnClick(btnCreated3, 10, 1, 10);
						} else if (btnUpdataNum == 2) {
							clicks = updateBtnClick(btnCreated3, 100, 1, 100);
						} else {
							clicks = updateBtnClick(btnCreated3, btnCreated3.index, 100);
						}

						if (minerGemsOn != true) {
							minerGemsOn = true;
						}

						console.log(btnCreated3.bonus + minerGemsClicks);

						display.textContent = `GEMS: ${clicks.toLocaleString()}`;
						clicksUpdateUpdata();
						clicksBtnUpdate();
					};
				} else {
					btnCreated3.name.setAttribute("disabled", null);
				}
			}

			function gamsMineUpdata() {
				if (minerGemsOn) {
					minerGemsClicks = btnCreated1.bonus * btnCreated3.bonus;
					timeDisplay.textContent = ` GEMS PER SECOND: ${(btnCreated2.bonus + minerGemsClicks).toLocaleString()} `;
				}
			}

			clicksBtnUpdate();
			statDBUpdata();
			gamsMineUpdata();

			if (startIdle) {
				startIdle = false;
				btnCreated1.start();
				clicksUpdateUpdata();
				listBtnFunc();
			}
		}

		function statDBUpdata() {
			const listStatistic = document.querySelector("#list-statistic");
			listStatistic.textContent = ` Total Gems mined: ${clicksDB.toLocaleString()} `;
		}

		function exitIdle() {
			idleCol4.classList.add("hide");

			idleCol3.classList.remove("hide");
			idleCol2.classList.remove("hide");

			button.onclick = null;
			button.textContent = "GAME OVER";

			timeDisplay.textContent = "0:00";

			btnDisable();
			exitButton.onclick = null;
			exitButton.setAttribute("disabled", null);

			clearInterval(intervalID);
			clearTimeout(timeout);
			restart();
			clicksResult = 0;
			clicksBonus = 0;
			clicksDB = 0;
		}
	}
}

function formatTime(ms) {
	return Number.parseFloat(ms / 1000).toFixed(2);
}

function sortTop(arr) {
	arr.sort((a, b) => (a.score < b.score ? 1 : -1));
}

function endGameDB() {
	userDB.score = Math.trunc(clicks);
	clicksResult = 0;
	clicksBonus = 0;
	clicksDB = 0;

	if (gmNum == 0) {
		scoreTop1.push({ user: userDB.user, score: userDB.score, game: gameModeChenge[gmNum] });

		sortTop(scoreTop1);

		top1.innerHTML = "";
		for (let item = 0; item < scoreTop1.length && item < 10; item++) {
			top1.innerHTML += `
            <li class="list-group-item bg-transparent text-uppercase">
            ${item + 1}. ${scoreTop1[item].user} - score: ${scoreTop1[item].score}
            </li>`;
		}
	} else if (gmNum == 1) {
		scoreTop2.push({ user: userDB.user, score: userDB.score, game: gameModeChenge[gmNum] });

		sortTop(scoreTop2);

		top2.innerHTML = "";
		for (let item = 0; item < scoreTop2.length && item < 10; item++) {
			top2.innerHTML += `
            <li class="list-group-item bg-transparent text-uppercase">
            ${item + 1}. ${scoreTop2[item].user} - score: ${scoreTop2[item].score}
            </li>`;
		}
	} else {
		scoreTop3.push({ user: userDB.user, score: userDB.score, game: gameModeChenge[gmNum] });

		sortTop(scoreTop3);

		top3.innerHTML = "";
		for (let item = 0; item < scoreTop3.length && item < 10; item++) {
			top3.innerHTML += `
            <li class="list-group-item bg-transparent text-uppercase">
            ${item + 1}. ${scoreTop3[item].user} - score: ${scoreTop3[item].score} 
            </li>`;
		}
	}
}

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
}
