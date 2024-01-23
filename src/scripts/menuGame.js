import state from "./engine.js";

const toggles = {
  view: {
    containers: document.querySelectorAll('[data-toggle]'),
    btnToggle: document.querySelectorAll('[data-btn-toggle]'),
  },
  values: {
    exibindoMenu: false,
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
    toggles.values.exibindoMenu = true;
  } else {
    selecionado.classList.toggle('active');
    toggles.values.exibindoMenu = false;
  }

  toggles.values.ativo = selecionado;
  if (selecionado.classList.contains("active")) {
    state.actions.pause();
  } else if (!selecionado.classList.contains("active") && state.values.pause) {
    state.actions.resumeGame();
  }
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