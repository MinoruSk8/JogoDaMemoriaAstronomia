const perguntas = [
  "Qual é a maior estrela do sistema solar?",
  "Qual é o satélite natural da Terra?",
  "Qual é o planeta mais quente do sistema solar?",
  "Qual é o planeta mais frio do sistema solar?",
  "Qual é o planeta mais gasoso do sistema solar?",
  "Qual é o planeta anão mais famoso?",
  "Qual é o maior planeta anão do sistema solar?",
  "Qual é o menor planeta do sistema solar?",
  "Qual é o único planeta habitado que conhecemos?",
  "Qual é o corpo celeste que causa os eclipses solares?",
  "Qual é o corpo celeste que causa os eclipses lunares?",
  "Qual é o corpo celeste que orbita ao redor dos planetas?",
  "Qual é o corpo celeste que orbita ao redor do Sol?",
  "Qual é o corpo celeste que emite luz própria?",
  "Qual é o corpo celeste que não emite luz própria?",
  "Qual é o corpo celeste formado principalmente por poeira e gás?",
  "Qual é o corpo celeste formado principalmente por estrelas?",
  "Qual é o corpo celeste formado principalmente por gelo e rocha?",
  "Qual é o corpo celeste formado principalmente por rocha e metal?",
  "Qual é o corpo celeste formado principalmente por gás e plasma?",
  "Qual é o corpo celeste formado principalmente por poeira e gelo?",
  "Qual é o corpo celeste formado principalmente por rocha e magma?",
  "Qual é o corpo celeste formado principalmente por gás e água?",
  "Qual é o corpo celeste formado principalmente por gás e poeira?",
  "Qual é o corpo celeste formado principalmente por rocha e gelo?"
];

const respostas = [
  "sol.jpg",
  "lua.jpg",
  "mercurio.jpg",
  "neturno.jpg",
  "jupiter.jpg",
  "plutao.jpg",
  "eris.jpg",
  "marte.jpg",
  "terra.jpg",
  "lua.jpg",
  "terra.jpg",
  "luas.jpg",
  "planetas.jpg",
  "estrelas.jpg",
  "planetas.jpg",
  "nebulosas.jpg",
  "galaxias.jpg",
  "cometa.jpg",
  "asteroide.jpg",
  "estrelas.jpg",
  "nuvens.jpg",
  "vulcao.jpg",
  "nuvens.jpg",
  "nebulosas.jpg",
  "encelado.jpg"
];

let cartaVirada = null;
let cartasBloqueadas = false;
let acertos = 0;
let erros = 0;

const perguntasContainer = document.getElementById("perguntas");
const respostasContainer = document.getElementById("respostas");
const acertosDisplay = document.getElementById("acertos");
const errosDisplay = document.getElementById("erros");

function criarCartas() {
  const cartas = [];

  for (let i = 0; i < perguntas.length; i++) {
    cartas.push({
      id: i,
      tipo: "pergunta",
      conteudo: perguntas[i]
    });

    cartas.push({
      id: i,
      tipo: "resposta",
      conteudo: respostas[i]
    });
  }

  return cartas;
}

function embaralharCartas(cartas) {
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }

  return cartas;
}

function exibirCartas(cartas) {
  for (let i = 0; i < cartas.length; i++) {
    const carta = document.createElement("div");
    carta.classList.add("carta", cartas[i].tipo);
    carta.dataset.id = cartas[i].id;
    carta.dataset.conteudo = cartas[i].conteudo; // Armazena a pergunta ou o nome da imagem

    // Define o conteúdo da carta como "?"
    carta.textContent = "?"; 

    if (cartas[i].tipo === "pergunta") {
      carta.addEventListener("click", virarCartaPergunta);
      perguntasContainer.appendChild(carta);
    } else {
      const img = document.createElement("img");
      img.src = `imagens/${cartas[i].conteudo}`;
      carta.appendChild(img);
      carta.addEventListener("click", virarCartaResposta);
      respostasContainer.appendChild(carta);
    }
  }
}

function virarCartaPergunta(event) {
  if (cartasBloqueadas || cartaVirada === event.target || event.target.classList.contains("virada")) return;
  
  const carta = event.target;
  // Aqui modificamos para mostrar a pergunta após o clique
  carta.textContent = carta.dataset.conteudo;
  carta.classList.add("virada");

  if (cartaVirada === null) {
    cartaVirada = carta;
  } else {
    verificarPar(carta);
  }
}

function virarCartaResposta(event) {
  if (cartasBloqueadas || cartaVirada === event.target || event.target.classList.contains("virada")) return;

  const carta = event.target;
  carta.classList.add("virada");
  
  // Mostra a imagem
  carta.querySelector("img").style.display = "block";

  if (cartaVirada === null) {
    cartaVirada = carta;
  } else {
    verificarPar(carta);
  }
}

function verificarPar(carta) {
  cartasBloqueadas = true;

  if (cartaVirada.dataset.id === carta.dataset.id) {
    // Cartas corretas!
    setTimeout(() => {
      cartaVirada.removeEventListener("click", virarCartaPergunta);
      carta.removeEventListener("click", virarCartaResposta);
      cartaVirada = null;
      cartasBloqueadas = false;
      acertos++;
      acertosDisplay.textContent = acertos;
      verificarFimDeJogo();
    }, 1000);
  } else {
    // Cartas incorretas
    setTimeout(() => {
      cartaVirada.textContent = "?";
      cartaVirada.classList.remove("virada");

      // Esconde a imagem da carta de resposta:
      carta.querySelector("img").style.display = "none"; 

      carta.classList.remove("virada");
      cartaVirada = null;
      cartasBloqueadas = false;
      erros++;
      errosDisplay.textContent = erros;
    }, 1000);
  }
}

function verificarFimDeJogo() {
  if (acertos === perguntas.length) {
    // Jogo terminado - desabilita as cartas
    const cartas = document.querySelectorAll('.carta');
    cartas.forEach(carta => {
      carta.removeEventListener('click', virarCartaPergunta);
      carta.removeEventListener('click', virarCartaResposta);
    });
    alert("Parabéns! Você completou o jogo!");
  }
}

const cartas = criarCartas();
const cartasEmbaralhadas = embaralharCartas(cartas);
exibirCartas(cartasEmbaralhadas);