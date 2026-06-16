import menu from "./menuGame.js";
import endGame from "./endGame.js";
import configGame from "./configGame.js";

const state = {
  view: {
    timeLeft: document.querySelector("[data-time]"),
    score: document.querySelector("[data-score]"),
    squares: document.querySelectorAll("[data-square]"),
    enemy: document.querySelector("[data-enemy]"),
    life: document.querySelector("[data-life]"),
    start: document.querySelector("[data-start]"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: null,
    results: 0,
    currentTime: 8,
    lives: 1,
    pause: true,
    gameStarted: false,
  },
  actions: {
    countDownTimerId: null,
    timeId: null,
    pause: pauseGame,
    resumeGame: startGame,
    next: nextRound,
  },
};

// Time to respawn Ralph
function resetTimePosition() {
  if (state.values.gameStarted) {
    clearInterval(state.actions.timeId);
    setTimeout(() => {
      randomSquare();
      state.actions.timeId = setInterval(randomSquare, 1000);
    }, 1000);
  }
}

// Countdown timer
function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timeId);

    state.values.lives--;
    state.view.life.textContent = `x${state.values.lives}`;

    endGame.actions.endGame();
  }

  if (state.values.lives == 0) {
    state.values.gameStarted = false;
    state.view.squares.forEach((square) => {
      square.removeAttribute("data-enemy");
      square.removeEventListener("mousedown", handleHit);
    });
  }
}

function nextRound() {
  state.values.currentTime = 5;
}

// Play sound effect
function playSound() {
  configGame.actions.hit();
}

// Update Ralph's position
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.removeAttribute("data-enemy");
    square.classList.remove("hit");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];

  randomSquare.setAttribute("data-enemy", true);
  state.values.hitPosition = randomSquare.id;
}

// Ralph's hitbox
function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", handleHit);
  });
}

function handleHit() {
  if (this.id === state.values.hitPosition) {
    state.values.results++;
    state.view.score.textContent = state.values.results;
    state.values.hitPosition = null;
    this.classList.add("hit");
    playSound("hit");
    if (state.gameStarted) {
      resetTimePosition();
    }
  }
}

// Start the Game
function startGame() {
  if (!menu.values.menusClosed) {
    return;
  }

  state.actions.countDownTimerId = setInterval(countDown, 1000);
  state.actions.timeId = setInterval(randomSquare, 1000);
  state.view.start.setAttribute("disabled", true);
  state.view.life.textContent = `x${state.values.lives}`;
  state.values.pause = false;
  state.values.gameStarted = true;
  configGame.actions.music();
}

// Pause the game
function pauseGame() {
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.actions.timeId);
  state.values.pause = true;
}

// Game setup
function init() {
  menu.actions.init();
  endGame.actions.init();

  // Add event listeners to buttons
  state.view.start.addEventListener("click", startGame);

  addListenerHitBox();
}

// Init app
init();

export default state;
