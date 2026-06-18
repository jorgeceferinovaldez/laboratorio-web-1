// SCOPE
// El scope es el alcance de una variable, que puede ser local o global.



// Variable global - Se declara fuera de una función
var mensaje = 'Hola, soy una variable';

function saludar (){
	alert(mensaje);
}

// saludar();


// Variable local - Se declara dentro de una función

function despedirse(){

	var despedida = 'Adiós, hasta luego';

	alert(despedida);

}

despedirse();






//-----------------------------------------------------------

/*
Se puede acceder a una variable desde dentro hacia afuera

Esto permite proteger nuestro código, para que desde afuera no lo modifiquen
*/

//-----------------------------------------------------------


// (   function(){


// 	 Todo el código Javascript



// }()   )
