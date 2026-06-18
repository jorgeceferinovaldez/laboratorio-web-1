
// 1ero Usaremos un objeto Math para obtener números aleatorios
var numeroAleatorio = Math.random();

console.log(numeroAleatorio);
// Son numeros entre 0 y 1.

// Para que tenga al menos un numero entero lo multiplicamos por 10
var numeroAleatorio2 = Math.random()*10;

console.log(numeroAleatorio2);


// Redondear al número entero menor
// Math.floor(Math.random()*10) 
var numeroAleatorio3 = Math.floor(Math.random()*10);

console.log(numeroAleatorio3);

// Redondear al número entero mayor
// Math.ceil(Math.random()*10)
var numeroAleatorio4 = Math.ceil(Math.random()*10);

console.log(numeroAleatorio4);

// Redondear al número entero más cercano
// Math.round(Math.random()*1000)
var numeroAleatorio5 = Math.round(Math.random()*1000);

console.log(numeroAleatorio5);