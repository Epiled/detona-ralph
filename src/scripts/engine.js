const state = {
  view: {
    timeLeft: document.querySelector('[data-time]'),
    score: document.querySelector('[data-score]'),
    squares: document.querySelectorAll('[data-square]'),
    enemy: document.querySelector('[data-enemy]'),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: null,
    results: 0,
    curretTime: 60,
  },
  actions: {
    countDownTimerId: setInterval(countDown, 1000),
    timeId: setInterval(randomSquare, 1000),
  }
}

function resetTimePosition() {
  randomSquare();
  clearInterval(state.actions.timeId);
  state.actions.timeId = setInterval(randomSquare, 1000);
}

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timeId);
    console.log("Game Over!");
    alert("Game Over! O seu resultado foi: " + state.values.results);
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
        playSound('hit');
        resetTimePosition();
      }
    });
  });
}


function init() {
  addListenerHitBox();
}

init();