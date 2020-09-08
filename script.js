let op = document.querySelector("#op");
let filho = document.querySelector("#filho");
let neto = document.querySelector("#neto");
let btn = document.querySelector("#btn");
let form = document.querySelector("#form");

function getCategory() {
  fetch(
    "https://testericardofreitas.commercesuite.com.br/web_api/categories/tree"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.Category.forEach((categoria1) => {
        op.innerHTML += `<option value="${categoria1.Category.link.https}" id="${categoria1.Category.id}">${categoria1.Category.name}</option>`;
      });
    });
}

window.addEventListener("load", function () {
  getCategory();
});

op.addEventListener("change", function () {
  var value = op.options[op.selectedIndex].attributes.id.value;
  var texto = op.options[op.selectedIndex].innerHTML;
  var urlSelecionada = op.options[op.selectedIndex].value;

  if (texto !== "Não possui subcategorias") {
    btn.setAttribute("href", urlSelecionada);
  }

  getSub(value, filho);
});

filho.addEventListener("change", function () {
  var value = filho.options[filho.selectedIndex].attributes.id.value;
  var texto = filho.options[filho.selectedIndex].innerHTML;
  var urlSelecionada = filho.options[filho.selectedIndex].value;

  if (texto !== "Não possui subcategorias") {
    btn.setAttribute("href", urlSelecionada);
  }

  getNeto(value, neto);
});

neto.addEventListener("click", function () {
  var urlSelecionada = neto.options[neto.selectedIndex].value;
  var texto = neto.options[neto.selectedIndex].innerHTML;

  if (texto !== "Não possui subcategorias") {
    btn.setAttribute("href", urlSelecionada);
  }
});

function getSub(id, select) {
  select.classList.remove("none");
  btn.classList.remove("none");
  neto.classList.add("none");

  select.innerHTML = "";
  fetch(
    `https://testericardofreitas.commercesuite.com.br/web_api/categories/tree/${id}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.Category[0].Category.children) {
        data.Category[0].Category.children.forEach((categoriaFilho) => {
          select.innerHTML += `<option value="${categoriaFilho.Category.link.https}" id="${categoriaFilho.Category.id}" >${categoriaFilho.Category.name}</option>`;
        });
      } else {
        select.innerHTML += `<option>Não possui subcategorias</option>`;
      }
    });
}

function getNeto(id, select) {
  select.classList.remove("none");
  select.innerHTML = "";
  fetch(
    `https://testericardofreitas.commercesuite.com.br/web_api/categories/tree/${id}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.Category[0].Category.children) {
        data.Category[0].Category.children.forEach((categoriaNeto) => {
          select.innerHTML += `<option value="${categoriaNeto.Category.link.https}" id="${categoriaNeto.Category.id}" >${categoriaNeto.Category.name}</option>`;
        });
      } else {
        select.innerHTML += `<option>Não possui subcategorias</option>`;
      }
    });
}
