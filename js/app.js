// Capa de app: conecta eventos, datos y UI

// Elementos del DOM
const body = document.querySelector("body"),
  sidebar = body.querySelector(".sidebar"),
  toggle = body.querySelector(".toggle"),
  sections = body.querySelectorAll(".section"),
  saldoEl = document.getElementById("saldo"),
  ingresosValorEl = document.getElementById("ingresos-valor"),
  egresosValorEl = document.getElementById("egresos-valor"),
  transaccionesListaEl = document.getElementById("transacciones-lista"),
  transaccionesFormularioEl = document.getElementById(
    "transacciones-formulario",
  ),
  descripcionEl = document.getElementById("descripcion"),
  montoEl = document.getElementById("monto");

// Navegacion: toggle de la sidebar
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

// Navegacion: mostrar seccion segun el hash
function showSection(hash) {
  sections.forEach((section) => section.classList.remove("active"));
  const id = hash.replace("#/", "") || "inicio";
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

window.addEventListener("hashchange", () => {
  showSection(window.location.hash);
});

window.addEventListener("load", () => {
  showSection(window.location.hash || "#/");
});

// Formulario: agregar transaccion 
TransaccionesFormularioEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const descripcion = descripcionEl.value.trim();
  const monto = parseFloat(montoEl.value.replace(",", "."));

  añadirTransaccion(descripcion, monto); // data.js
  actualizarTransaccionesLista(); // ui.js
  actualizarResumen(); // ui.js

  transaccionesFormularioEl.reset();
});

transaccionesListaEl.addEventListener("click", (e) => {
  const boton = e.target.closest(".borrar-btn");
  if (!boton) return;

  const id = Number(boton.dataset.id);
  borrarTransaccion(id);
  actualizarTransaccionesLista();
  actualizarResumen();
});

// Render inicial
actualizarResumen();
actualizarTransaccionesLista();
