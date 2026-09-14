// Capa de datos: maneja el arreglo de transacciones y localStorage
let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

function guardarTransacciones() {
  localStorage.setItem("transacciones", JSON.stringify(transacciones));
}

function añadirTransaccion(descripcion, monto) {
  transacciones.push({ id: Date.now(), descripcion, monto });
  guardarTransacciones();
}

function borrarTransaccion(id) {
  transacciones = transacciones.filter((t) => t.id != id);
  guardarTransacciones();
}