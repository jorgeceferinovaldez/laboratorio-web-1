// setInterval es un método que se utiliza para ejecutar una función repetidamente, con un retraso fijo entre cada llamada. Este método es parte de la interfaz Window y se utiliza comúnmente para tareas como animaciones, actualizaciones de datos en tiempo real y otras operaciones que requieren ejecución periódica.

// setInterval(funcion, tiempo en milisegundos);

var segundero = 0;



// 1ero creo una nueva funcion
function contar(){
 	++segundero;
 	console.log(segundero);
 }

setInterval(contar, 1000);

// O puedo hacerlo de esta manera
// setInterval(function(){
//  	++segundero;
//  	console.log(segundero);
// }, 1000);