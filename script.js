// script.js
let nomes = [];
localStorage.clear();
let objetos = [];

function mostrarListas() {
  const ulNomes = document.getElementById("nomes");
  const ulObjetos = document.getElementById("objetos");
  const ulAssociacoes = document.getElementById("associacoes");

  ulNomes.innerHTML = "";
  ulObjetos.innerHTML = "";
  ulAssociacoes.innerHTML = "";

  nomes.forEach(nome => {
    const li = document.createElement("li");
    li.textContent = nome;
    ulNomes.appendChild(li);
  });

  objetos.forEach(objeto => {
    const li = document.createElement("li");
    li.textContent = objeto;
    ulObjetos.appendChild(li);
  });

  const minTamanho = Math.min(nomes.length, objetos.length);
  for (let i = 0; i < minTamanho; i++) {
    const li = document.createElement("li");
    li.textContent = `${nomes[i]} → ${objetos[i]}`;
    ulAssociacoes.appendChild(li);
  }
}


function avancarNomes() {
  const ultimo = nomes.pop();
  nomes.unshift(ultimo);
  mostrarListas();
}

function adicionarNome() {
  const input = document.getElementById("inputNome");
  const novoNome = input.value.trim();

  if (novoNome) {
    nomes.push(novoNome); // adiciona ao final
    input.value = "";     // limpa o campo
    mostrarListas();      // atualiza a tela
  } else {
    alert("Digite um nome válido!");
  }
};

function adicionarNomeEspecifico(nome) {
  nomes.push(nome);
  mostrarListas();
};

function adicionarObjeto(nome){
  objetos.push(nome);
  mostrarListas();
};

function salvarAssociacoes() {
  const resultado = [];
  const minTamanho = Math.min(nomes.length, objetos.length);

  for (let i = 0; i < minTamanho; i++) {
    resultado.push(`${nomes[i]} → ${objetos[i]}`);
  }

  // Exibe no <pre>
  document.getElementById("resultadoSalvo").textContent = resultado.join("\n");
};

// Salvar a lista atual com nome
function salvarLista() {
  const nomeLista = document.getElementById("nomeLista").value.trim();
  if (!nomeLista) {
    alert("Digite um nome para a lista.");
    return;
  }

  const associacoes = nomes.map((nome, i) => ({
    nome: nome,
    objeto: objetos[i] || ""
  }));

  const todasListas = JSON.parse(localStorage.getItem("todasListas")) || {};
  todasListas[nomeLista] = associacoes;

  localStorage.setItem("todasListas", JSON.stringify(todasListas));
  document.getElementById("nomeLista").value = "";

  imprimirListasSalvas(); // 👈 aqui
};


// Exibir as listas salvas
function listarListasSalvas() {
  const ul = document.getElementById("listasSalvas");
  ul.innerHTML = "";

  const todasListas = JSON.parse(localStorage.getItem("todasListas")) || {};
  Object.keys(todasListas).forEach(nomeLista => {
    const li = document.createElement("li");
    li.textContent = nomeLista;

    const btnCarregar = document.createElement("button");
    btnCarregar.textContent = "Carregar";
    btnCarregar.onclick = () => carregarLista(nomeLista);

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.onclick = () => excluirLista(nomeLista);

    li.appendChild(btnCarregar);
    li.appendChild(btnExcluir);
    ul.appendChild(li);
  });
}

// Carregar uma lista salva
function carregarLista(nomeLista) {
  const todasListas = JSON.parse(localStorage.getItem("todasListas")) || {};
  const associacoes = todasListas[nomeLista];

  nomes = associacoes.map(a => a.nome);
  objetos = associacoes.map(a => a.objeto);
  mostrarListas();
}

// Excluir uma lista salva
function excluirLista(nomeLista) {
  const todasListas = JSON.parse(localStorage.getItem("todasListas")) || {};
  delete todasListas[nomeLista];
  localStorage.setItem("todasListas", JSON.stringify(todasListas));
  listarListasSalvas();
}

// Inicializar ao carregar a página
listarListasSalvas();

function imprimirListasSalvas() {
  const div = document.getElementById("todasListasSalvas");
  div.innerHTML = "";

  const todasListas = JSON.parse(localStorage.getItem("todasListas")) || {};

  for (const nomeLista in todasListas) {
    const titulo = document.createElement("h4");
    titulo.textContent = nomeLista;
    div.appendChild(titulo);

    const ul = document.createElement("ul");

    todasListas[nomeLista].forEach(par => {
      const li = document.createElement("li");
      li.textContent = `${par.nome} → ${par.objeto}`;
      ul.appendChild(li);
    });

    div.appendChild(ul);
  }
}


mostrarListas();
