import state from "./engine.js";

const menu = {
  view: {
    containers: document.querySelectorAll("[data-toggle]"),
    btnToggle: document.querySelectorAll("[data-btn-toggle]"),
  },
  values: {
    showMenu: false,
    active: null,
    menusClosed: true,
  },
  actions: {
    init: init,
    checkMenus: checkStateMenus,
  },
};

// Verify and show the active menu
function handleMenuActive(selected) {
  if (selected != menu.values.active) {
    menu.view.containers.forEach((container) => {
      container.classList.remove("active");
    });
    selected.classList.toggle("active");
    menu.values.showMenu = true;
  } else {
    selected.classList.toggle("active");
    menu.values.showMenu = false;
    selected.dataset.menuOpen = "false";
  }
  menu.actions.checkMenus();
}

// Determine if the game should resume
function handleResumeGame(selected) {
  if (selected.classList.contains("active")) {
    state.actions.pause();
  } else if (
    !selected.classList.contains("active") &&
    state.values.gameStarted
  ) {
    state.actions.resumeGame();
  }
}

// Retrieve elements for validation
function handleToggle(type) {
  const typeSelected = type.dataset.btnToggle;

  const selected = Array.from(menu.view.containers).find(
    (element) => element.dataset.toggle === typeSelected,
  );

  selected.dataset.menuOpen == "false"
    ? (selected.dataset.menuOpen = "true")
    : (selected.dataset.menuOpen = "false");

  handleMenuActive(selected);
  menu.values.active = selected;
  handleResumeGame(selected);
}

function checkStateMenus() {
  const listConverted = Array.from(menu.view.containers);
  const statesMenus = listConverted.some(
    (item) => item.dataset.menuOpen === "true",
  );
  menu.values.menusClosed = !statesMenus;
}

// Setup the menus
function init() {
  menu.view.btnToggle.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.actions.pause();
      handleToggle(btn);
      checkStateMenus();
    });
  });
}

export default menu;
