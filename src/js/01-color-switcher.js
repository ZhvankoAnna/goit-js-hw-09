const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
let intervalId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

function handleStartBtnClick(e) {
    startBtnEl.setAttribute("disabled", "disabled");
    stopBtnEl.removeAttribute("disabled");

    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
}

function handleStopBtnClick(e) {
    stopBtnEl.setAttribute("disabled", "disabled");
    startBtnEl.removeAttribute("disabled");

    clearInterval(intervalId);
}

startBtnEl.addEventListener('click', handleStartBtnClick);
stopBtnEl.addEventListener('click', handleStopBtnClick);