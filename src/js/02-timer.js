import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateCountdownDisplay(timeObject) {
  dataDays.textContent = addLeadingZero(timeObject.days);
  dataHours.textContent = addLeadingZero(timeObject.hours);
  dataMinutes.textContent = addLeadingZero(timeObject.minutes);
  dataSeconds.textContent = addLeadingZero(timeObject.seconds);
}

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const dateTimePicker = document.querySelector('#datetime-picker');

const startButton = document.querySelector('[data-start]');

let countdownInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pickedDate = selectedDates[0];
    if (pickedDate > new Date()) {
      startButton.disabled = false;
    } else {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    }
  },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener('click', () => {
  const targetDate = new Date(dateTimePicker.value).getTime();
  const currentDate = new Date().getTime();
  let dateToCount = targetDate - currentDate;

  if (!isNaN(targetDate) && dateToCount > 0) {
    startButton.disabled = true;

    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(() => {
      const timeObject = convertMsToTime(dateToCount);
      updateCountdownDisplay(timeObject);

      dateToCount -= 1000; // Odejmujemy 1000 ms (1 sekunda) od pozostałego czasu

      if (dateToCount <= 0) {
        clearInterval(countdownInterval);
        startButton.disabled = false;
      }
    }, 1000); // Aktualizuj co sekundę
  }
});

function convertMsToTime(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
