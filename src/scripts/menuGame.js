import state from "./engine.js";

const menu = {
  view: {
    containers: document.querySelectorAll('[data-toggle]'),
    btnToggle: document.querySelectorAll('[data-btn-toggle]'),
  },
  values: {
    exibindoMenu: false,
    ativo: null,
    menusFechados: true,
  },
  actions: {
    iniciar: init,
    checkMenus: checkStateMenus,
  }
}

// Verifica e Exibi o menu ativo
function handleMenuAtivo(selecionado) {
  if (selecionado != menu.values.ativo) {
    menu.view.containers.forEach(container => {
      container.classList.remove('active');
    })
    selecionado.classList.toggle('active');
    menu.values.exibindoMenu = true;
  } else {
    selecionado.classList.toggle('active');
    menu.values.exibindoMenu = false;
  }
}

// Determina se o jogo deve resumir ou não
function handleResumeGame(selecionado) {
  if (selecionado.classList.contains("active")) {
    state.actions.pause();
  } else if (!selecionado.classList.contains("active") && state.values.gameIniciado) {
    state.actions.resumeGame();
  } 
}

// Adquiri os elemntos para verificações
function handleToggle(tipo) {
  const tipoSelecionado = tipo.dataset.btnToggle;

  const selecionado = Array.from(menu.view.containers).find((element) =>
    element.dataset.toggle === tipoSelecionado
  );

  selecionado.dataset.menuOpen == 'false' ? selecionado.dataset.menuOpen = 'true' : selecionado.dataset.menuOpen = 'false'

  handleMenuAtivo(selecionado);
  menu.values.ativo = selecionado;
  handleResumeGame(selecionado)
}

function checkStateMenus() {
  const listaConvertida = Array.from(menu.view.containers)
  const estadosMenus = listaConvertida.some(item => item.dataset.menuOpen === 'true');
  menu.values.menusFechados = !estadosMenus;
}

// Prepara os menus
function init() {
  menu.view.btnToggle.forEach(btn => {
    btn.addEventListener('click', () => {
      state.actions.pause();
      handleToggle(btn);
      checkStateMenus();
    })
  })
}

export default menu;