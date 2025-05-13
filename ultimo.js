const diasContainer = document.getElementById('dias');
const mesAnio = document.getElementById('mes-anio');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');
const modal = document.getElementById('modal');
const fechaTitulo = document.getElementById('fecha-titulo');
const entrada = document.getElementById('entrada-evento');
const btnGuardar = document.getElementById('guardar');
const btnCancelar = document.getElementById('cancelar');

let fecha = new Date();
let mes = fecha.getMonth();
let anio = fecha.getFullYear();
let diaSeleccionado;

const nombresMeses = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

function claveEvento(d, m, y) {
  return `${y}-${m+1}-${d}`;
}

function cargarEvento(d, cell) {
  const key = claveEvento(d, mes, anio);
  const texto = localStorage.getItem(key);
  if (texto) {
    const div = document.createElement('div');
    div.classList.add('evento');
    div.textContent = texto;
    cell.appendChild(div);
  }
}

function mostrarCalendario(m, y) {
  diasContainer.innerHTML = '';
  mesAnio.textContent = `${nombresMeses[m]} ${y}`;

  const primerDia = new Date(y, m, 1).getDay();
  const ultimoDia = new Date(y, m+1, 0).getDate();

  for (let i = 0; i < primerDia; i++) {
    diasContainer.innerHTML += '<div></div>';
  }
  for (let d=1; d<=ultimoDia; d++) {
    const cell = document.createElement('div');
    cell.innerHTML = `<span class="num">${d}</span>`;
    cargarEvento(d, cell);
    cell.addEventListener('click', () => abrirModal(d));
    diasContainer.appendChild(cell);
  }
}

function abrirModal(d) {
  diaSeleccionado = d;
  fechaTitulo.textContent = `${d} de ${nombresMeses[mes]} ${anio}`;
  entrada.value = localStorage.getItem(claveEvento(d, mes, anio)) || '';
  modal.classList.remove('hidden');
}

btnGuardar.addEventListener('click', () => {
  const key = claveEvento(diaSeleccionado, mes, anio);
  if (entrada.value.trim()) localStorage.setItem(key, entrada.value);
  else localStorage.removeItem(key);
  modal.classList.add('hidden');
  mostrarCalendario(mes, anio);
});

btnCancelar.addEventListener('click', () => {
  modal.classList.add('hidden');
});

btnPrev.addEventListener('click', () => {
  mes--; if (mes < 0) { mes = 11; anio--; }
  mostrarCalendario(mes, anio);
});

btnNext.addEventListener('click', () => {
  mes++; if (mes > 11) { mes = 0; anio++; }
  mostrarCalendario(mes, anio);
});

mostrarCalendario(mes, anio);
