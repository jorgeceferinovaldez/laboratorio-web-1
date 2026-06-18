

// Objeto con las Propiedades del efecto Lightbox
var propLightbox = {

	imgContainer: document.getElementsByClassName('lightbox'),
	imagen: null,
	imagenSrc: null

}


// Objeto con los Métodos del efecto Lightbox
var metLightbox = {

	inicio: function(){

		for (var i = 0; i < propLightbox.imgContainer.length; i++) {
			propLightbox.imgContainer[i].addEventListener('click', metLightbox.capturaImagen);
		}
	},


	capturaImagen: function(){

		propLightbox.imagen = this;
		metLightbox.lightbox(propLightbox.imagen);

	},


	lightbox: function(imagen){

		propLightbox.imagenSrc = window.getComputedStyle(imagen, null).backgroundImage.slice(5, -2);
		console.log(propLightbox.imagenSrc);

	}


}

metLightbox.inicio();

