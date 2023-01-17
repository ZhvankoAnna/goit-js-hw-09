import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
let position = null;
let amount = null;
let delay = null;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  });
}

function handleSubmitBtn(e) {
  e.preventDefault();

  delay = +formEl.elements.delay.value;
  const step = +formEl.elements.step.value;
  amount = +formEl.elements.amount.value;

  for (let i = 1; i <= amount; i++) {
    position = i;

    createPromise(position, delay)
        .then(({ position, delay }) => {
          console.log(delay);
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
      delay += step;
  }
  formEl.reset()
}

formEl.addEventListener('submit', handleSubmitBtn);
