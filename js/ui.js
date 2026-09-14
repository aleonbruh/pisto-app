// Capa de UI: dibuja los datos en el DOM

function actualizarTransaccionesLista() {
  transaccionesListaEl.innerHTML = "";

  const ordenadas = [...transacciones].reverse();

  ordenadas.forEach((transaccion) => {
    transaccionesListaEl.appendChild(crearTransaccionEl(transaccion));
  });
}

function crearTransaccionEl(transaccion) {
  const li = document.createElement("li");
  li.classList.add("transaccion");
  li.classList.add(transaccion.monto > 0 ? "ingreso" : "egreso");

  const spanDescripcion = document.createElement("span");
  spanDescripcion.textContent = transaccion.descripcion;

  const spanMonto = document.createElement("span");
  spanMonto.textContent = formatCurrency(transaccion.monto);

  const botonBorrar = document.createElement("button");
  botonBorrar.classList.add("borrar-btn");
  botonBorrar.textContent = "x";
  botonBorrar.addEventListener("click", () => borrarTransaccion(transaccion.id));

  spanMonto.appendChild(botonBorrar);
  li.appendChild(spanDescripcion);
  li.appendChild(spanMonto);

  return li;
}

function actualizarResumen() {
  const saldo = transacciones.reduce((acc, t) => acc + t.monto, 0);
  const ingresos = transacciones
    .filter((t) => t.monto > 0)
    .reduce((acc, t) => acc + t.monto, 0);
  const egresos = transacciones
    .filter((t) => t.monto < 0)
    .reduce((acc, t) => acc + t.monto, 0);

  saldoEl.textContent = formatCurrency(saldo);
  ingresosValorEl.textContent = formatCurrency(ingresos);
  egresosValorEl.textContent = formatCurrency(egresos);
}

function formatCurrency(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}

// Lo que da el id cuando se va borrar una transaccion
const botonBorrar = document.createElement("button");
botonBorrar.classList.add("borrar-btn");
botonBorrar.textContent = "x";
botonBorrar.dataset.id = transaccion.id;