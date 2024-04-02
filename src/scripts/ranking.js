import dados from "../db/dados.js";
import endGame from "./endGame.js";

// Verifica se já existe um ranking definido
if (!window.localStorage.getItem('ranking')) {
  // Armazenar dados no localStorage
  window.localStorage.setItem('ranking', JSON.stringify(dados));
}

const ranking = {
  view: {
    container: document.querySelector('[data-ranking]'),
    nome: document.querySelector('[data-nome]'),
    score: document.querySelector('[data-score]'),
    salvar: document.querySelector('[data-salvar-pontuacao]'),
  },
  values: {
    limiteRanking: 10,
    lista: consultaRankingDB,
  },
  actions: {
    salvar: salvarPontuacao,
  }
}

ranking.view.salvar.addEventListener('click', () => {
  ranking.actions.salvar();
});

function salvarPontuacao() {
  const dadosUser = obterDadosUser();
  atualizaRankingDB(dadosUser);

  const rankingAtualizado = ranking.values.lista();
  const valoresOrdenados = ordenaValores(rankingAtualizado);
  construiRanking(valoresOrdenados);
  endGame.view.boxPontuacao.classList.toggle('active');
}

function obterDadosUser() {
  const obj = { 
    nome: ranking.view.nome.value, 
    pontuacao: ranking.view.score.textContent,
   };
  return obj;
}

function atualizaRankingDB(dados) {
  const valoresOriginais = ranking.values.lista();
  const menorPontuacao = menorDoRanking();

  let valoresAtualizados = [];

  if(Number(dados.pontuacao) >= Number(menorPontuacao.pontuacao)) {
    if(valoresOriginais.length < ranking.values.limiteRanking) {
      valoresAtualizados = [...valoresOriginais, dados];
    } else {
      valoresOriginais.pop()
      valoresAtualizados = [...valoresOriginais, dados];
    }
  } else {
    valoresAtualizados = valoresOriginais;
  }

  window.localStorage.setItem('ranking', JSON.stringify(valoresAtualizados));
}

function menorDoRanking() {
  const valoresOriginais = ranking.values.lista();

  let menorPontuacao = Infinity;
  let indexMenorPontuacao = -1;

  for (let i = 0; i < valoresOriginais.length; i++) {
    const pontuacaoAtual = Number(valoresOriginais[i].pontuacao);

    if (pontuacaoAtual < menorPontuacao) {
      menorPontuacao = pontuacaoAtual;
      indexMenorPontuacao = i;
    }
  }

  return valoresOriginais[indexMenorPontuacao]
}

function consultaRankingDB() {
  const ranking = JSON.parse(window.localStorage.getItem('ranking')) || [];
  return ranking;
}

function ordenaValores(valores) {
  const valoresOrdenados = valores.slice().sort((a, b) => {
    return b.pontuacao - a.pontuacao;
  });
  return valoresOrdenados;
}

function construiRanking(dados) {
  const lista = dados.map((dado) => {
    return `<li>${dado.nome}: <span>${dado.pontuacao}</span></li>`
  });

  ranking.view.container.innerHTML = lista.join('');
}

function init() {
  // Recuperar dados do localStorage
  const valores = ranking.values.lista();

  // Ordena o Array de daodos
  let valoresOrdenados = ordenaValores(valores);

  // Construi o ranking do menu
  construiRanking(valoresOrdenados);
}

init();

export default ranking;