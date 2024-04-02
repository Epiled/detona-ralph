import menu from "./menuGame.js";
import endGame from "./endGame.js";
import configGame from "./configGame.js";

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
    lifes: 3,
    pause: true,
    gameIniciado: false,
  },
  actions: {
    countDownTimerId: null,
    timeId: null,
    pause: pauseGame,
    resumeGame: startGame,
    proximo: proximoRound,
  }
}

// Tempo para reposicionar o Ralph
function resetTimePosition() {
  if (state.values.gameIniciado) {
    clearInterval(state.actions.timeId);
    setTimeout(() => {
      randomSquare();
      state.actions.timeId = setInterval(randomSquare, 1000);
    }, 1000);
  }
}

// Cronômetro de tempo
function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timeId);

    state.values.lifes--;
    state.view.life.textContent = `x${state.values.lifes}`;

    endGame.actions.endGame();
  }

  if (state.values.lifes == 0) {
    state.values.gameIniciado = false;
    state.view.squares.forEach((square) => {
      square.removeAttribute('data-enemy');
      square.removeEventListener('mousedown', handleHit);
    });
  }
}

function proximoRound() {
  state.values.curretTime = 5;
}

// Toca um audio
function playSound() {
  configGame.actions.hit();
}

// Altera a posição do Ralph
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

// HitBox do Ralph
function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener('mousedown', handleHit);
  });
}

function handleHit() {
  if (this.id === state.values.hitPosition) {
    state.values.results++;
    state.view.score.textContent = state.values.results;
    state.values.hitPosition = null;
    this.classList.add('hit');
    playSound('hit');
    if (state.gameIniciado) {
      resetTimePosition();
    }
  }
}

// Começa o Jogo
function startGame() {
  if (menu.values.menusFechados) {
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.actions.timeId = setInterval(randomSquare, 1000);
    state.view.start.setAttribute('disabled', true);
    state.view.life.textContent = `x${state.values.lifes}`;
    state.values.pause = false;
    state.values.gameIniciado = true;
    configGame.actions.music();
  }
}

// Pausa o Jogo
function pauseGame() {
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.actions.timeId);
  state.values.pause = true;
}

// Preparação para começar o jogo
function init() {
  menu.actions.iniciar();
  endGame.actions.iniciar();

  // Adicione event listeners aos botões
  state.view.start.addEventListener('click', startGame);

  addListenerHitBox();
}

// Inicia a aplicação
init();

export default state;