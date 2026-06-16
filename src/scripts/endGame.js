import state from "./engine.js";

const endGame = {
  view: {
    container: document.querySelector("[data-endGame]"),
    button: document.querySelector("[data-endGame-btn]"),
    message: document.querySelector("[data-endGame-message]"),
    score: document.querySelector("[data-endGame-score]"),
    boxScore: document.querySelector("[data-box-user]"),
  },
  actions: {
    endGame: handleNextLevel,
    init: init,
  },
};

function handleNextLevel() {
  endGame.view.score.textContent = state.values.results;
  endGame.view.container.classList.toggle("active");

  if (state.values.lives <= 0) {
    endGame.view.message.textContent = "Game Over!";
    endGame.view.button.textContent = "Ok";

    // Remove previous event listener to prevent duplication
    endGame.view.button.removeEventListener("click", handleClick);

    // Add new event listener to close container and show score box
    endGame.view.button.addEventListener("click", () => {
      endGame.view.container.classList.toggle("active");
      endGame.view.boxScore.classList.toggle("active");
    });
  }
}

const handleClick = () => {
  endGame.view.container.classList.remove("active");
  state.actions.next();
  state.actions.resumeGame();
};

function init() {
  endGame.view.button.addEventListener("click", handleClick);
}

export default endGame;
