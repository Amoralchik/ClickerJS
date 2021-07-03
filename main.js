let inputUN = document.querySelector("#input__UserName");
let btnUN = document.querySelector("#btnUN");

const mediaText = document.querySelector("#mediaText");
mediaText.textContent = "Version: 0.15.7.2";

let totalLostGems = 0;

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
		this.level = 0;
		this.letBeNum = 1;
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
			this.level += 1;
			this.NumFix();
			totalLostGems -= this.cost;
		}
		return clicks - this.updateCost;
	};

	start = () => {
		this.bonus += 1;
		this.NumFix();
		this.level += 1;
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
	function setInputFunc() {
		setTimeout(() => {
			inputUN.setAttribute("disabled", null);
			btnUN.setAttribute("disabled", null);

			let inUN = inputUN.value;
			let newUserName = inUN;
			if (inUN.length > 10) {
				if (inUN.length == 10) {
					newUserName = inUN;
				} else {
					newUserName = `${inUN.substring(0, 10)}...`;
				}
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

	btnUN.onclick = () => {
		if (inputUN.value == "" || inputUN.value == null || inputUN.value == undefined) {
			userDB.user = "Guest";
		} else {
			showAlertLogin.classList.remove("hide");
			setInputFunc();
		}
	};

	inputUN.onkeyup = (e) => {
		if (inputUN.value == "" || inputUN.value == null || inputUN.value == undefined) {
			userDB.user = "Guest";
		} else {
			if (e.key == "Enter") {
				showAlertLogin.classList.remove("hide");
				setInputFunc();
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

const radioBtn = document.querySelector("#radioBtn"),
	btnRadio = radioBtn.querySelectorAll("input");

const gameModeChange = ["Classic", "10sec", "15sec", "idle"];
let gmNum = 0;
let gameMode = gameModeChange[gmNum];

function btnRadioOnClick() {
	btnRadio[0].onclick = () => {
		gmNum = 0;
		restart();
		gameModeFunc();
	};

	btnRadio[1].onclick = () => {
		gmNum = 1;
		restart();
		gameModeFunc();
	};

	btnRadio[2].onclick = () => {
		gmNum = 2;
		restart();
		gameModeFunc();
	};

	btnRadio[3].onclick = () => {
		gmNum = 3;
		restart();
		gameModeFunc();
	};
}

btnRadioOnClick();

let gameModeFunc = () => {
	gameMode = gameModeChange[gmNum];
	timeout = gmNumberFix();
};

button.onclick = start;

let themeWinterOn = true;

winterButton.addEventListener("click", themeChange);

const dataTime = new Date();

function themeChange() {
	bodyHtml.classList.toggle("winter");
	mediaText.classList.toggle("winter");
	if (themeWinterOn) {
		winterButton.innerHTML = `LIGHT <i class="bi bi-toggle-on"></i>`;
		themeWinterOn = false;
	} else {
		winterButton.innerHTML = `LIGHT <i class="bi bi-toggle-off"></i>`;
		themeWinterOn = true;
	}
}

if (dataTime.getHours() >= 7 && dataTime.getHours() <= 18) {
	themeChange();
}

timeDisplay.textContent = "0:00";
display.textContent = `CLICKS: 0`;

function restart() {
	clicks = 0;
	timerOut = 5000;
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
			timerOut = 5000;
			return timerOut;
		} else if (gmNum == 1) {
			timerOut = 10000;
			return timerOut;
		} else {
			timerOut = 15000;
			return timerOut;
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
			listBtn7 = document.querySelector("#list-btn-7"),
			listBtn8 = document.querySelector("#list-btn-8");

		let btnCreated3 = new btnClickCreate(0, listBtn7, 1, 3, 10000),
			btnCreated2 = new btnClickCreate(0, listBtn5, 1, 2, 1000),
			btnCreated1 = new btnClickCreate(50, listBtn1, 1, 1, 50),
			btnCreated4 = new btnClickCreate(0, listBtn8, 1, 4, 5000);

		const btnCreatedArr = [btnCreated1, btnCreated2, btnCreated3, btnCreated4];

		const btnIdGroupUpg = document.querySelector("#btnIdGroupUpg"),
			btnUpgId = btnIdGroupUpg.querySelectorAll("input");

		const PlabelUpgrade = document.querySelectorAll("p.text-center"),
			displayClicks = document.querySelector("#display__clicks");

		function idleStart(btnArr) {
			for (let i = 0; i < btnArr.length; i++) {
				btnArr[i].name.setAttribute("disabled", null);
				btnArr[i].name.textContent = ` Buy Upgrade: `;
			}
		}

		idleStart(btnCreatedArr);

		let randomNum = 0;

		function randomizeClick() {
			function getRandomInt(max) {
				return Math.floor(Math.random() * Math.floor(max));
			}

			let r = getRandomInt(100);

			if (r <= 10) {
				if (r > 5) {
					return 1.5;
				} else if (r <= 2) {
					return 2;
				} else {
					return 1.75;
				}
			} else {
				return 1;
			}
		}

		button.onclick = () => {
			randomNum = randomizeClick();
			clicks += Math.floor(btnCreated1.bonus * randomNum);
			clicksDB += Math.floor(btnCreated1.bonus * randomNum);
			clicksResult = clicks;
			display.textContent = ` GEMS: ${clicksResult.toLocaleString()}`;
			scoreDB = clicksResult;
			clicksUpdateUpdata();
			statDBUpdata();
		};

		function plabelUpgradeFunc(btnArr) {
			for (let i = 0; i < btnArr.length; i++) {
				PlabelUpgrade[i].textContent = ` Lvl: ${btnArr[i].level} `;
			}
		}

		plabelUpgradeFunc(btnCreatedArr);

		let nextButtonActive = false;
		let minerGemsClicks = 0;
		let minerGemsAdd = 0;
		let minerGemsOn = false;
		let btnUpdataNum = 0;

		const intervalID = setInterval(() => {
			if (gmNum == 3) {
				randomNum = randomizeClick();
				clicks += Math.floor((minerGemsAdd + minerGemsClicks) * randomNum);
				clicksDB += Math.floor((minerGemsAdd + minerGemsClicks) * randomNum);
				clicksResult = clicks;
				timeDisplay.textContent = ` GEMS PER SECOND: ${(minerGemsAdd + minerGemsClicks).toLocaleString()} `;
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
			plabelUpgradeFunc(btnCreatedArr);

			function btnClickUpdata(btnArr) {
				for (let i = 0; i < btnArr.length; i++) {
					btnArr[i].index = letBeHight(btnArr[i]);
					btnArr[i].NumFix();
				}
			}

			btnUpgId[4].onclick = () => {
				if (!nextButtonActive) {
					nextButtonActive = true;
				} else {
					nextButtonActive = false;
				}
				clicksUpdateUpdata();
			};

			btnClickUpdata(btnCreatedArr);

			displayClicks.textContent = ` Gems per click: ${btnCreated1.bonus.toLocaleString()} `;

			if (btnUpdataNum == 0) {
				btnUpdataNum = 0;
				btnCreated1.updateCost = btnCreated1.CostFix(1);
				listBtn1.textContent = ` Buy 1 Upgrades per: ${btnCreated1.updateCost.toLocaleString()}`;
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
					btnNumFix(3, 1, true);
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

				function btnNumFix(arg, num, numFix = false) {
					btnUpdataNum = arg;

					function btnUpdate(btn) {
						for (let index = 0; index < btn.length; index++) {
							if (numFix == true) {
								num = btn[index].index;
							}

							if (nextButtonActive) {
								btn[index].NumFix;
								if (btnUpdataNum == 2) {
									btn[index].updateCost = btn[index].CostFix(num, true, 100);
									btn[index].name.textContent = ` Buy ${btn[index]
										.ArgNumFix(num, true, 100)
										.toLocaleString()} Upgrades per: ${btn[index].updateCost.toLocaleString()}`;
								} else if (btnUpdataNum == 1) {
									btn[index].updateCost = btn[index].CostFix(num, true, 10);
									btn[index].name.textContent = ` Buy ${btn[index]
										.ArgNumFix(num, true, 10)
										.toLocaleString()} Upgrades per: ${btn[index].updateCost.toLocaleString()}`;
								} else {
									btn[index].updateCost = btn[index].CostFix(num);
									btn[index].name.textContent = ` Buy ${btn[index]
										.ArgNumFix(num, false)
										.toLocaleString()} Upgrades per: ${btn[index].updateCost.toLocaleString()}`;
								}
							} else {
								btn[index].updateCost = btn[index].CostFix(num);
								btn[index].name.textContent = ` Buy ${num.toLocaleString()} Upgrades per: ${btn[
									index
								].updateCost.toLocaleString()}`;
							}
						}
					}
					btnUpdate(btnCreatedArr);
				}
			}

			listBtnFunc();

			function letBeHight(btn) {
				let whileSetTrue = true;
				let indexClicks = btn.letBeNum;
				let updateCostWhile = btn.updateCost;

				while (whileSetTrue) {
					if (clicks >= updateCostWhile) {
						indexClicks += 1;
						updateCostWhile = btn.CostFix(indexClicks);
					} else {
						indexClicks -= 1;

						if (indexClicks <= 0) {
							btn.letBeNum = 1;
							return 1;
						} else if (clicks <= btn.updateCost) {
							btn.letBeNum = 1;
						} else {
							btn.letBeNum = indexClicks;
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

				function onClickUpdate(btn, argBonus = 1) {
					if (btnUpdataNum == 0) {
						clicks = updateBtnClick(btn, 1, argBonus);
					} else if (btnUpdataNum == 1) {
						clicks = updateBtnClick(btn, 10, argBonus, 10);
					} else if (btnUpdataNum == 2) {
						clicks = updateBtnClick(btn, 100, argBonus, 100);
					} else {
						clicks = updateBtnClick(btn, btn.index, argBonus);
					}
				}

				if (clicks >= btnCreated1.updateCost) {
					btnCreated1.name.removeAttribute("disabled");
					btnCreated1.name.onclick = () => {
						onClickUpdate(btnCreated1);
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
						onClickUpdate(btnCreated2, 100);

						if (minerGemsOn != true) {
							minerGemsOn = true;
						}

						display.textContent = `GEMS: ${clicks.toLocaleString()}`;
						clicksUpdateUpdata();
						clicksBtnUpdate();
						gamsMineUpdata();
					};
				} else {
					btnCreated2.name.setAttribute("disabled", null);
				}

				if (clicks >= btnCreated3.updateCost) {
					btnCreated3.name.removeAttribute("disabled");
					btnCreated3.name.onclick = () => {
						onClickUpdate(btnCreated3);

						if (minerGemsOn != true) {
							minerGemsOn = true;
						}

						display.textContent = `GEMS: ${clicks.toLocaleString()}`;
						clicksUpdateUpdata();
						clicksBtnUpdate();
						gamsMineUpdata();
					};
				} else {
					btnCreated3.name.setAttribute("disabled", null);
				}

				if (clicks >= btnCreated4.updateCost) {
					btnCreated4.name.removeAttribute("disabled");
					btnCreated4.name.onclick = () => {
						onClickUpdate(btnCreated4, 1000);

						if (minerGemsOn != true) {
							minerGemsOn = true;
						}

						display.textContent = `GEMS: ${clicks.toLocaleString()}`;
						clicksUpdateUpdata();
						clicksBtnUpdate();
						gamsMineUpdata();
					};
				} else {
					btnCreated4.name.setAttribute("disabled", null);
				}
			}

			function gamsMineUpdata() {
				if (minerGemsOn) {
					minerGemsClicks = btnCreated1.bonus * btnCreated3.bonus;
					minerGemsAdd = btnCreated2.bonus + btnCreated4.bonus;
					timeDisplay.textContent = ` GEMS PER SECOND: ${(minerGemsAdd + minerGemsClicks).toLocaleString()} `;
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

		function statDBUpdata(...btn) {
			const listStatistic = document.querySelector("#list-statistic");
			let levelDB = btnCreated1.level + btnCreated2.level + btnCreated3.level;

			listStatistic.innerHTML = `
			<ul>
				<li> Total Gems mined: ${clicksDB.toLocaleString()} </li>
				<li> Total Upgraded bought: ${levelDB.toLocaleString()} </li>
				<li> Total Gems lost: ${totalLostGems.toLocaleString()} </li>
			</ul>
			
			`;
		}

		function exitIdle() {
			idleCol4.classList.add("hide");

			idleCol3.classList.remove("hide");
			idleCol2.classList.remove("hide");

			button.onclick = null;
			button.textContent = "GAME OVER";

			timeDisplay.textContent = "0:00";
			displayClicks.textContent = "";

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

	function topAdd(scoreTop, topnum) {
		scoreTop.push({ user: userDB.user, score: userDB.score, game: gameModeChange[gmNum] });

		sortTop(scoreTop);

		topnum.innerHTML = "";

		for (let item = 0; item < scoreTop.length && item < 10; item++) {
			let elem = document.createElement("li"),
				contented = document.createTextNode(` ${scoreTop[item].user} - score: ${scoreTop[item].score}`);

			elem.classList.add("list-item");
			elem.appendChild(contented);

			topnum.append(elem);
		}
	}

	if (gmNum == 0) {
		topAdd(scoreTop1, top1);
	} else if (gmNum == 1) {
		topAdd(scoreTop2, top2);
	} else {
		topAdd(scoreTop3, top3);
	}
}

let btnDisableTrue = false;

function btnDisable() {
	if (btnDisableTrue) {
		btnUN.removeAttribute("disabled");
		inputUN.removeAttribute("disabled");
		for (let btn = 0; btn < btnRadio.length; btn++) {
			btnRadio[btn].removeAttribute("disabled");
		}
		btnDisableTrue = false;

		btnRadioOnClick();
		userNameInput();
	} else {
		btnUN.setAttribute("disabled", null);
		inputUN.setAttribute("disabled", null);
		for (let btn = 0; btn < btnRadio.length; btn++) {
			btnRadio[btn].setAttribute("disabled", null);
			btnRadio[btn].onclick = null;
		}
		btnUN.onclick = null;
		inputUN.onkeyup = null;
		btnDisableTrue = true;
	}
}
