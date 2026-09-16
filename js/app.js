const body = document.querySelector("body"),
  sidebar = body.querySelector(".sidebar"),
  toggle = body.querySelector(".toggle"),
  sections = body.querySelectorAll(".section"),
  efectivoSaldoEl = document.getElementById("efectivo-saldo"),
  tarjetaSaldoEl = document.getElementById("tarjeta-saldo"),
  ahorrosSaldoEl = document.getElementById("ahorros-saldo"),
  tablaUltimasEl = document.getElementById("tabla-ultimas"),
  tablaTransaccionesEl = document.getElementById("tabla-transacciones"),
  formularioEl = document.getElementById("transaccion-formulario"),
  tipoEl = document.getElementById("tipo"),
  fuenteEl = document.getElementById("fuente"),
  categoriaEl = document.getElementById("categoria"),
  descripcionEl = document.getElementById("descripcion"),
  montoEl = document.getElementById("monto");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

function showSection(hash) {
  sections.forEach((section) => section.classList.remove("active"));
  const id = hash.replace("#/", "") || "inicio";
  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  const href = id === "inicio" ? `#/` : `#/${id}`;
  const links = document.querySelectorAll(".sidebar .nav-link a");
  links.forEach((link) => link.classList.remove("active"));
  const activo = document.querySelector(`.sidebar a[href="${href}"]`);
  if (activo) activo.classList.add("active");
}

window.addEventListener("hashchange", () => {
  showSection(window.location.hash);
});

window.addEventListener("load", () => {
  showSection(window.location.hash || "#/");
});

formularioEl.addEventListener("submit", (e) => {
  e.preventDefault();

  añadirTransaccion({
    tipo: tipoEl.value,
    fuente: fuenteEl.value,
    categoria: categoriaEl.value.trim(),
    descripcion: descripcionEl.value.trim(),
    monto: parseFloat(montoEl.value),
  });

  renderTransacciones(tablaUltimasEl, 5);
  renderTransacciones(tablaTransaccionesEl);
  actualizarSaldos();

  formularioEl.reset();
});

renderTransacciones(tablaUltimasEl, 5);
renderTransacciones(tablaTransaccionesEl);
actualizarSaldos();
