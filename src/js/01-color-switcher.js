function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

const bodyColor = document.body;

let idInterval = null;
startButton.addEventListener('click', () => {
  if (idInterval === null)
    idInterval = setInterval(() => {
      bodyColor.style.backgroundColor = getRandomHexColor();
    }, 1000);
  console.log(idInterval);
  startButton.disabled = true;
  stopButton.disabled = false;
});
stopButton.addEventListener('click', () => {
  clearInterval(idInterval);
  idInterval = null;
  startButton.disabled = false;
  stopButton.disabled = true;
});
