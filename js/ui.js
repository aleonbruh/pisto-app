function renderTransacciones(tabla, limite) {
  const tbody = tabla.querySelector("tbody");
  tbody.innerHTML = "";

  const ordenadas = [...transacciones].reverse();
  const visibles = limite ? ordenadas.slice(0, limite) : ordenadas;

  visibles.forEach((t) => {
    tbody.appendChild(crearFila(t, tabla));
  });
}

function crearFila(t, tabla) {
  const tr = document.createElement("tr");

  const celdas = [
    t.tipo === "egreso" ? "Egreso" : "Ingreso",
    t.fuente.charAt(0).toUpperCase() + t.fuente.slice(1),
    t.categoria,
    formatCurrency(t.monto),
    t.descripcion,
  ];

  celdas.forEach((valor) => {
    const td = document.createElement("td");
    td.textContent = valor;
    tr.appendChild(td);
  });

  if (tabla !== tablaUltimasEl) {
    const tdAcciones = document.createElement("td");
    const btnBorrar = document.createElement("button");
    btnBorrar.classList.add("borrar-btn");
    btnBorrar.textContent = "×";
    btnBorrar.addEventListener("click", () => {
      borrarTransaccion(t.id);
      renderTransacciones(tablaUltimasEl, 5);
      renderTransacciones(tablaTransaccionesEl)
      actualizarSaldos();
    });
    tdAcciones.appendChild(btnBorrar);
    tdAcciones.classList.add("acciones");
    tr.appendChild(tdAcciones);
  }

  return tr;
}

function actualizarSaldos() {
  const saldoEfectivo = transacciones
    .filter((t) => t.fuente === "efectivo")
    .reduce((acc, t) => acc + t.monto, 0);
  const saldoTarjeta = transacciones
    .filter((t) => t.fuente === "tarjeta")
    .reduce((acc, t) => acc + t.monto, 0);
  const saldoAhorros = transacciones
    .filter((t) => t.fuente === "ahorros")
    .reduce((acc, t) => acc + t.monto, 0);

  efectivoSaldoEl.textContent = formatCurrency(saldoEfectivo);
  tarjetaSaldoEl.textContent = formatCurrency(saldoTarjeta);
  ahorrosSaldoEl.textContent = formatCurrency(saldoAhorros);
}

function formatCurrency(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}