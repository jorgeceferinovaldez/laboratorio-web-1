/* SELECTORES INDIVIDUALES */
// getElementById(): Selecciona el elemento por su atrubuto ID
// querySelector(): Selecciona el elemento con un selector CSS, devolviéndo el primer elemento que coincida

/* SELECTORES MÚLTIPLES */
// getElementsByClassName(): Selecciona todos los elementos que tengan la clase especificada
// getElementsByTagName(): Selecciona todos los elementos con la etiqueta especificada
// querySelectorAll(): Selecciona todos los elementos con el selector CSS especificado

// ---------------------------------------------------------------------------------

//var boton = document.getElementById('boton');

//var segundoParrafo = document.querySelector('#segundo');

var parrafos = document.getElementsByClassName('texto');
//var parrafos = document.getElementsByTagName('p');
// var parrafos = document.querySelectorAll('.texto');

// Mostrar el número de elementos en la collección
console.log('Número de elementos de la colección: ',parrafos.length);

// Acceder a cada elemento y mostrar su contenido
for (var i = 0; i < parrafos.length; i++) {
    console.log(parrafos[i].innerHTML);
}