//1
const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body')
}
let timerId = null;

refs.startBtn.addEventListener('click', () => {
    timerId = setInterval(() => getRandomHexColor(), 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
});

refs.stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;
});


function getRandomHexColor() {
    return refs.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
