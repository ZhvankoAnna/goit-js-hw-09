import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInputEl = document.querySelector('[datetime-picker]');
const outputDayEl = document.querySelector('[data-days]');
const outputHoursEl = document.querySelector('[data-hours]');
const outputMinutesEl = document.querySelector('[data-minutes]');
const outputSecondsEl = document.querySelector('[data-seconds]');
const startBtnEl = document.querySelector('[data-start]');
let chooseDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    chooseDate = fp.selectedDates[0].getTime();

    if (chooseDate < new Date().getTime()) {
      return Notify.failure('Please choose a date in the future');
    }
    startBtnEl.removeAttribute('disabled');
  },
};

startBtnEl.setAttribute('disabled', 'disabled');

const fp = flatpickr('#datetime-picker', options);


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function handleStartBtnClick() {
  const intervalId = setInterval(() => {
    const difference = Math.floor((chooseDate - new Date().getTime())/1000);
    console.log(difference)
    if (difference <= 0) {
      clearInterval(intervalId);
    }

    const timerData = convertMs(chooseDate - new Date().getTime());
    const { days, hours, minutes, seconds } = timerData;

    outputDayEl.textContent = days < 10 ? days.toString().padStart(2, 0) : days;
    outputHoursEl.textContent =
      hours < 10 ? hours.toString().padStart(2, 0) : hours;
    outputMinutesEl.textContent =
      minutes < 10 ? minutes.toString().padStart(2, 0) : minutes;
    outputSecondsEl.textContent =
      seconds < 10 ? seconds.toString().padStart(2, 0) : seconds;
  }, 1000);
}

startBtnEl.addEventListener('click', handleStartBtnClick);