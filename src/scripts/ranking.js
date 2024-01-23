import dados from "../assets/db/dados.js";

if(!window.localStorage.getItem('ranking')) {
  // Armazenar dados no localStorage
  const setDados = window.localStorage.setItem('ranking', JSON.stringify(dados));
}

// Recuperar dados do localStorage
const valores = Object.values(JSON.parse(window.localStorage.getItem('ranking')));

// Ordena o Array
const valoresOrdenados = valores.slice().sort((a, b) => {
  return b.pontuacao - a.pontuacao;
});

// Obter chaves do objeto
const chavesArray = Object.keys(valores);

// Selecionar o elemento HTML onde você deseja exibir o ranking
const rankingContainer = document.querySelector('[data-ranking]');

const lista = chavesArray.map(chave => {
 return `<li>${valoresOrdenados[chave].nome}: <span>${valoresOrdenados[chave].pontuacao}</span></li>`
});

rankingContainer.innerHTML = lista.join('');

export default {
  valoresOrdenados
};