//2
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]')
}
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    if (selectedDates[0].getTime() < date.getTime()) {
      refs.startBtn.disabled = true;
      return Notiflix.Notify.warning("Please choose a date in the future");
    } else { refs.startBtn.disabled = false; };
  },
};

const timerflatpickr = flatpickr(refs.input, options);

function onStartBtnClick() {
    intervalId = setInterval(() => {
        const newDate = new Date();
        const selectedData = timerflatpickr.selectedDates[0];
        const timerData = selectedData.getTime() - newDate.getTime();
        if (timerData < 0) {
            clearInterval(intervalId);
            return;
        }
        const convertedData = convertMs(timerData);
        populateDate(convertedData);
        refs.startBtn.disabled = true;
    }, 1000)
};

refs.startBtn.addEventListener('click', onStartBtnClick);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function populateDate(config) {
  refs.dataDays.textContent = addLeadingZero(config.days);
  refs.dataHours.textContent = addLeadingZero(config.hours);
  refs.dataMinutes.textContent = addLeadingZero(config.minutes);
  refs.dataSeconds.textContent = addLeadingZero(config.seconds);
};