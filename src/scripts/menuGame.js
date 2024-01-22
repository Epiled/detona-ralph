import state from "./engine.js";

const toggles = {
  view: {
    containers: document.querySelectorAll('[data-toggle]'),
    btnToggle: document.querySelectorAll('[data-btn-toggle]'),
  },
  values: {
    ativo: null,
  },
  actions: {
    iniciar: init
  }
}

function handleToggle(tipo) {
  const tipoSelecionado = tipo.dataset.btnToggle;

  const selecionado = Array.from(toggles.view.containers).find((element) =>
    element.dataset.toggle === tipoSelecionado
  );

  if (selecionado != toggles.values.ativo) {
    toggles.view.containers.forEach(container => {
      container.classList.remove('active');
    })
    selecionado.classList.toggle('active');
    state.actions.pause();
  } else {
    selecionado.classList.toggle('active');
    state.actions.resumeGame();
  }

  toggles.values.ativo = selecionado;
}

function init() {
  toggles.view.btnToggle.forEach(btn => {
    btn.addEventListener('click', () => {
      state.actions.pause();
      handleToggle(btn);
    })
  })
}

export default toggles;