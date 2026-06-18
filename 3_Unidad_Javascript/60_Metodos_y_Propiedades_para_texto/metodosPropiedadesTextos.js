// METODOS Y PROPIEDADES PARA CADENAS DE TEXTO

var texto = 'Hola, soy un texto';


// length - El número de caracteres

var numeroCaracteres = texto.length;

// toUpperCase() - Transformar todos los caracteres a mayúsculas

var mayus = texto.toUpperCase();

// toLowerCase() - Transformar todos los caracteres a minúsculas

var minus = texto.toLowerCase();

// substring(0,0) - Extraer desde un punto hasta otro de caracteres

var extraido = texto.substring(6, 9);

// replace(valor1, valor2) - Reemplazar una cadena de caracteres por otra

var textoReemplzado = texto.replace('texto', 'niño');

// indexOf('o') - Buscara el primer caracter que coincida e indicará la posición

var buscarO = texto.indexOf('o');

// lastIndexOf('o') - Buscara el último caracter que coincida e indicará la posición

var buscarUltimaO = texto.lastIndexOf('o');

// split(' ') - Se convierte la cadena de texto en un arreglo dividiendo los elementos según el separador indicado

var arreglo = texto.split(' ');

// --------------------------------------------------