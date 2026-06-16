import data from "../db/data.js";
import endGame from "./endGame.js";

// Check if a ranking is already defined
if (!window.localStorage.getItem("ranking")) {
  // Store data in localStorage
  window.localStorage.setItem("ranking", JSON.stringify(data));
}

const ranking = {
  view: {
    container: document.querySelector("[data-ranking]"),
    name: document.querySelector("[data-name]"),
    score: document.querySelector("[data-score]"),
    save: document.querySelector("[data-save-score]"),
  },
  values: {
    limitRanking: 10,
    list: getRanking,
  },
  actions: {
    save: saveScore,
  },
};

ranking.view.save.addEventListener("click", () => {
  ranking.actions.save();
});

function saveScore() {
  const dadosUser = getDataUser();
  updateRanking(dadosUser);

  const rankingUpdate = ranking.values.list();
  const valuesSorted = sortValues(rankingUpdate);
  buildRanking(valuesSorted);
  endGame.view.boxScore.classList.toggle("active");
}

function getDataUser() {
  const obj = {
    name: ranking.view.name.value,
    score: Number(ranking.view.score.textContent),
  };
  return obj;
}

function updateRanking(data) {
  const originalValues = ranking.values.list();
  const minorScore = minorFromRanking();

  let updateValues = [];

  if (Number(data.score) >= Number(minorScore.score)) {
    if (originalValues.length < ranking.values.limitRanking) {
      updateValues = [...originalValues, data];
    } else {
      originalValues.pop();
      updateValues = [...originalValues, data];
    }
  } else {
    updateValues = originalValues;
  }

  window.localStorage.setItem("ranking", JSON.stringify(updateValues));
}

function minorFromRanking() {
  const originalValues = ranking.values.list();

  let minorScore = Infinity;
  let indexMinorScore = -1;

  for (let i = 0; i < originalValues.length; i++) {
    const currentScore = Number(originalValues[i].score);

    if (currentScore < minorScore) {
      minorScore = currentScore;
      indexMinorScore = i;
    }
  }

  return originalValues[indexMinorScore];
}

function getRanking() {
  const ranking = JSON.parse(window.localStorage.getItem("ranking")) ?? [];
  return ranking;
}

function sortValues(values) {
  const valuesSorted = values.sort((a, b) => {
    return b.score - a.score;
  });
  return valuesSorted;
}

function buildRanking(data) {
  const list = data.map((d) => {
    return `<li class="ranking__item">${d.name}: <span>${d.score}</span></li>`;
  });

  ranking.view.container.innerHTML = list.join("");
}

function init() {
  // Get data from localStorage
  const values = ranking.values.list();

  // Sort the data array
  let valuesSorted = sortValues(values);

  // Render the ranking menu
  buildRanking(valuesSorted);
}

init();

export default ranking;
