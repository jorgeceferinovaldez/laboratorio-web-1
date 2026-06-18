// 1ero. Definimos las variables
//NUMÉRICA
var numero = 23; //Entero
var decimal = 23.5; //Flotante o punto flotante

//CADENA DE TEXTO
var texto = 'Hola, soy un texto'; //Recomendable usar comillas simples
var alumno = 'Jose';

//BOOLEANA
var booleano1 = true;
var booleano2 = false;

//2do agregamos en el HTML los parrafos
//ELEMENTO HTML
//4to accedo a las variables del HTML
var segundoParrafo = document.querySelector('#texto2');
// 5to accedo a la consola del navegador y veo la variable
// segundoParrafo
// numero
// decimal
// texto
// booleano1

//ARREGLOS
var familia = ['Ana', 'Luciana', 'Sofia', alumno, booleano1];
// Si deseo acceder a un elemento en particular
// por ejemplo 'Luciana' lo hago asi  
// familia[1]

//OBJETOS
// Son parecidos a los arreglos pero se usan llaves
var persona = {
    nombre: 'Jorge',
    apellido: 'Valdez',
    edad: 30,
    casado: false
};
// Fijarse que se dividen en propiedades y valores
// Para acceder a una propiedad
// persona.apellido

//FUNCIONES
var miFuncion = function(){};