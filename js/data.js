const STORAGE_KEY = "transacciones";

let transacciones = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function guardarTransacciones() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transacciones));
}

function añadirTransaccion({ tipo, fuente, categoria, descripcion, monto }) {
  const montoConSigno = tipo === "egreso" ? -Math.abs(monto) : Math.abs(monto);

  transacciones.push({
    id: Date.now(),
    tipo,
    fuente,
    categoria,
    descripcion,
    monto: montoConSigno,
  });
  guardarTransacciones();
}

function borrarTransaccion(id) {
  transacciones = transacciones.filter((t) => t.id != id);
  guardarTransacciones();
}