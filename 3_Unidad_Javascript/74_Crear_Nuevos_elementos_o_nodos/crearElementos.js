// Crear nuevo elemento o nodo

// <p class="texto">'Hola, soy un nuevo texto'</p>
// 

// Creamos un nuevo párrafo
var parrafoNuevo = document.createElement('p');

// Creamos un nuevo texto para el párrafo
var textoNuevo = document.createTextNode('Hola, soy un nuevo texto');

// Agregar el texto nuevo en el párrafo
parrafoNuevo.appendChild(textoNuevo);

// Agregar un nuevo atributo de clase
parrafoNuevo.setAttribute('class', 'texto');

// Seleccionar contenedor
var contenedor = document.getElementsByClassName('contenedor')[0];

// Agregar el nuevo párrafo dentro del contenedor

contenedor.appendChild(parrafoNuevo);