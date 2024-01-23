import toggles from "./menuGame.js";

const state = {
  view: {
    timeLeft: document.querySelector('[data-time]'),
    score: document.querySelector('[data-score]'),
    squares: document.querySelectorAll('[data-square]'),
    enemy: document.querySelector('[data-enemy]'),
    life: document.querySelector('[data-life]'),
    start: document.querySelector('[data-start]'),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: null,
    results: 0,
    curretTime: 60,
    pause: true,
  },
  actions: {
    countDownTimerId: null,
    timeId: null,
    pause: pauseGame,
    resumeGame: resumeGame,
  }
}

function resetTimePosition() {
  clearInterval(state.actions.timeId);
  setTimeout(() => {
    randomSquare();
    state.actions.timeId = setInterval(randomSquare, 1000);
  }, 1000);
}

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timeId);

    console.log("Game Over!");
   // alert("Game Over! O seu resultado foi: " + state.values.results);
  }
}

function playSound(audioname) {
  let audio = new Audio(`./src/assets/sounds/${audioname}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach(square => {
    square.removeAttribute('data-enemy');
    square.classList.remove('hit');
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];

  randomSquare.setAttribute('data-enemy', true);
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
      if (square.id === state.values.hitPosition) {
        state.values.results++;
        state.view.score.textContent = state.values.results;
        state.values.hitPosition = null;
        console.log(
        )
        square.classList.add('hit');
        playSound('hit');
        resetTimePosition();
      }
    });
  });
}

function startGame() {
  state.actions.countDownTimerId = setInterval(countDown, 1000);
  state.actions.timeId = setInterval(randomSquare, 1000);
  state.view.start.setAttribute('disabled', true);
  state.values.pause = false;
}

function pauseGame() {
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.actions.timeId);
  state.values.pause = true;
}

function resumeGame() {
  startGame()
}

function init() {
  toggles.actions.iniciar();

  // Adicione event listeners aos botões
  state.view.start.addEventListener('click', startGame);
// document.getElementById('pauseButton').addEventListener('click', pauseGame);

  addListenerHitBox();
}

init();

export default state;