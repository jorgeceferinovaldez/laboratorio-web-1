// addEventListener(); - Añadir un escuchador

var boton = document.getElementById('boton');
var boton2 = document.getElementById('boton2');

function alerta(){

	alert('Hola mundo');

}

boton.addEventListener('click', alerta);

// removeEventListener(); - Eliminar un escuchador


function removerAlerta(){

	boton.removeEventListener('click', alerta);

}

boton2.addEventListener('click', removerAlerta);


// https://developer.mozilla.org/en-US/docs/Web/Events