// 1ero. Crear un nuevo párrafo
var nuevoParrafo = document.createElement('p');

// 2do. Crear un nuevo texto
var textoNuevo = document.createTextNode('Hola, soy un texto nuevo');

// 3ero. Agregar el texto nuevo en el párrafo
nuevoParrafo.appendChild(textoNuevo);

// 4to. Agregar un nuevo atributo de clase
nuevoParrafo.setAttribute('class', 'texto');

var contenedor = document.getElementsByClassName('contenedor')[0];




// Seleccionar el elemento padre de un elemento

var primerParrafo = document.getElementsByClassName('texto')[0];

var padreParrafos = primerParrafo.parentNode;

padreParrafos.className = 'contenedor';

// Ubicar el elemento antes del seleccionado

var parrafos = document.getElementsByClassName('texto');

padreParrafos.insertBefore(nuevoParrafo, parrafos[2]);
