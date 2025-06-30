// script.js
let nomes = [];
let objetos = ["Bola", "Livro", "Celular", "Chave"];

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


mostrarListas();
