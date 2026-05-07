// Cargar turnos al iniciar
document.addEventListener("DOMContentLoaded", cargarTurnos);

document.getElementById("turnoForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const servicio = document.getElementById("servicio").value;

  let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

  // 🚫 Validar duplicados
  const duplicado = turnos.find(t => t.fecha === fecha && t.hora === hora);
  if (duplicado) {
    alert("Ese turno ya está ocupado");
    return;
  }

  const nuevoTurno = { nombre, telefono, fecha, hora, servicio };
  turnos.push(nuevoTurno);

  localStorage.setItem("turnos", JSON.stringify(turnos));

  mostrarTurnos();

  document.getElementById("turnoForm").reset();
});

// Mostrar turnos en tabla
function mostrarTurnos() {
  const lista = document.getElementById("listaTurnos");
  lista.innerHTML = "";

  let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

  turnos.forEach((t, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${t.nombre}</td>
      <td>${t.telefono}</td>
      <td>${t.fecha}</td>
      <td>${t.hora}</td>
      <td>${t.servicio}</td>
      <td><button onclick="eliminarTurno(${index})">Eliminar</button></td>
    `;

    lista.appendChild(fila);
  });
}

// Cargar al inicio
function cargarTurnos() {
  mostrarTurnos();
}

// Eliminar turno
function eliminarTurno(index) {
  let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

  turnos.splice(index, 1);

  localStorage.setItem("turnos", JSON.stringify(turnos));

  mostrarTurnos();
}