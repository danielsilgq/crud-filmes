async function buscarFilmes() {
  const resposta = await fetch("http://localhost:3000/filmes");
  return await resposta.json();
}

function agruparPorGenero(filmes) {
  const contagem = {};
  filmes.forEach(filme => {
    contagem[filme.genero] = (contagem[filme.genero] || 0) + 1;
  });
  return contagem;
}

function mediaNotaPorGenero(filmes) {
  const soma = {};
  const qtd = {};
  
  filmes.forEach(filme => {
    if (filme.genero && filme.nota) {
      soma[filme.genero] = (soma[filme.genero] || 0) + Number(filme.nota);
      qtd[filme.genero] = (qtd[filme.genero] || 0) + 1;
    }
  });

  const medias = {};
  for (let genero in soma) {
    medias[genero] = (soma[genero] / qtd[genero]).toFixed(1);
  }
  return medias;
}

function criarGraficoPizza(dados) {
  const ctx = document.getElementById("graficoGenero").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(dados),
      datasets: [{
        label: "Distribuição por Gênero",
        data: Object.values(dados),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
        ]
      }]
    }
  });
}

function criarGraficoBarras(dados) {
  const ctx = document.getElementById("graficoAvaliacoes").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(dados),
      datasets: [{
        label: "Média de Notas por Gênero",
        data: Object.values(dados),
        backgroundColor: "#36A2EB"
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 10
        }
      }
    }
  });
}

(async function iniciar() {
  const filmes = await buscarFilmes();
  const porGenero = agruparPorGenero(filmes);
  const notasMedia = mediaNotaPorGenero(filmes);
  criarGraficoPizza(porGenero);
  criarGraficoBarras(notasMedia);
})();
