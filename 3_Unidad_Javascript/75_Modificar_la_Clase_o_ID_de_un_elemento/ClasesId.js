// 1ero. Acceder a un elemento
var segundoParrafo = document.getElementById('segundo');

// 2do. Modificar clase de un elemento

segundoParrafo.className = 'texto fondo-rojo';

// 3ero. Agregar o modificar ID

var primerParrafo = document.getElementsByClassName('texto')[0];

primerParrafo.id = 'primero';