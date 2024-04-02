import state from "./engine.js";
import menu from "./menuGame.js";

const endGame = {
  view: {
    container: document.querySelector('[data-endGame]'),
    botao: document.querySelector('[data-btnEndGame]'),
    message: document.querySelector('[data-endGame-message]'),
    pontuacao: document.querySelector('[data-endGame-pontuacao]'),
    boxPontuacao: document.querySelector('[data-box-user]'),
  },
  actions: {
    endGame: handleProximaFase,
    iniciar: init,
  },
};

function handleProximaFase() {
  endGame.view.pontuacao.textContent = state.values.results;
  endGame.view.container.classList.toggle('active');

  if (state.values.lifes <= 0) {
    endGame.view.message.textContent = 'Game Over!';
    endGame.view.botao.textContent = 'Ok';

    // Remover event listener anterior para evitar duplicações
    endGame.view.botao.removeEventListener('click', handleClick);
    // Adicionar novo event listener para fechar o container e exibir a caixa de pontuação
    endGame.view.botao.addEventListener('click', () => {
      console.log("teste");
      endGame.view.container.classList.toggle('active');
      endGame.view.boxPontuacao.classList.toggle('active');
    });
  }
}

const handleClick = () => {
  endGame.view.container.classList.remove('active');
  state.actions.proximo();
  state.actions.resumeGame();
};

function init() {
  endGame.view.botao.addEventListener('click', handleClick);
}

export default endGame;
