
// Objeto para guardar las PROPIEDADES (variables)
var propLigthbox = {
    // PROPIEDAD 1. Encontrar todos los elementos que tendrán efefecto ligthbox
    imgContainer : document.getElementsByClassName('lightbox'),
    imagen : null,
    // PROPIEDAD 3: Guardamos la url de la imagen a mostrar
    imagenSrc : null,
    // PROPIEDAD 4: Referencia al body
    cuerpoDom : document.getElementsByTagName('body')[0],
    // PROPIEDAD %: Contenedor principal de ligthbox
    ligthboxContainer : null,
    // PROPIEDAD 6: Contenedor de la imagen modal
    modal: null,

    //PROPIEDAD 7: Tipo de animación a aplicar
    animacion: 'fade', // Puede ser 'fade', 'slide', etc. (aún no implementado)
    cerrarModal: null, // Referencia al boton que cierra la ventana modal
};

// Objeto para guardar los MÉTODOS (funciones)
var metLigthbox = {
    //METODO 1: Agregar eventos click a cada elemento lightbox
    inicio: function(){
        for (var i = 0; i < propLigthbox.imgContainer.length; i++){
            propLigthbox.imgContainer[i].addEventListener('click', metLigthbox.capturaImagen);
        }
    },

    //METODO 2: Capturara la imagen que fue clickeada
    capturaImagen: function(){
        propLigthbox.imagen = this; //this es el elemento que fue clieckeado
        //console.log('Imagen capturada', propLigthbox.imagen);
        //alert('Imagen capturada correctamente!');
        // LLamamos al método principal
        metLigthbox.ligthbox(propLigthbox.imagen);
    },

    //METDODO 3: Crear el efecto ligthbox
    ligthbox : function(imagen){
        //Extraemios la URL del backgroung-image
        propLigthbox.imagenSrc = window.getComputedStyle(imagen, null).backgroundImage.slice(5,-2);
        //console.log('URL extraída:', propLigthbox.imagenSrc);

        // Creamos el contenedor de ligthbox
        propLigthbox.cuerpoDom.appendChild(document.createElement('DIV')).setAttribute('id', 'ligthbox_container');

        // Obtener referencia al contenedor creado
        propLigthbox.ligthboxContainer = document.getElementById('ligthbox_container');
        

        //Apliquemos estilos al contenedor
        propLigthbox.ligthboxContainer.style.width = '100%';
        propLigthbox.ligthboxContainer.style.heigth = '100%';
        propLigthbox.ligthboxContainer.style.position = 'fixed';
        propLigthbox.ligthboxContainer.style.zIndex = '1000';
        propLigthbox.ligthboxContainer.style.background = 'rgba(0,0,0,0.8)';
        propLigthbox.ligthboxContainer.style.top = '20%'; //'0';
        propLigthbox.ligthboxContainer.style.left = '0';

        
        // Crear la ventana modal
        propLigthbox.ligthboxContainer.appendChild(document.createElement('DIV')).setAttribute('id','modal');
        propLigthbox.modal = document.getElementById('modal');
        propLigthbox.modal.style = '100%';

        // Creamos y agregamos la imagen
        propLigthbox.modal.appendChild(document.createElement('IMG')).setAttribute('src', propLigthbox.imagenSrc);

        // Agregamos la clase CSS a la imagen
        propLigthbox.modal.getElementsByTagName('img')[0].setAttribute('class','imagen-modal');

        //console.log('Contenedor creado:', propLigthbox.ligthboxContainer);
        //Aplicamos el efecto de nimación fade
        if (propLigthbox.animacion == 'fade'){
            document.getElementsByClassName('imagen-modal')[0].style.opacity = '0'; // AHce la imagen invisible al principio

            setTimeout(function(){
                document.getElementsByClassName('imagen-modal')[0].style.opacity = '1'; // Hace la imagen visible
            });
        };

        //alert('Animacion Aplicada!');

        //Agregamos el codigo de creación del boton de cierre de la ventana modal
        //propLigthbox.modal.innerHTML += '<i id="cerrar_modal" class="fa fa-times" aria-hidden="true"></i>';
        propLigthbox.modal.innerHTML += '<i id="cerrar_modal" class="fa fa-times" aria-hidden="true"></i>';

        //Obtengamos la referencia del boton 
        propLigthbox.cerrarModal = document.getElementById('cerrar_modal');

        //alert('Boton de cerrar creado');
        // Debemos agregar el evento para el boton cerrar
        propLigthbox.cerrarModal.addEventListener('click',metLigthbox.cerrarModal);

    },

    cerrarModal: function(){
        propLigthbox.cuerpoDom.removeChild(propLigthbox.ligthboxContainer);
    }

};

// Al final coloque la inicialización
metLigthbox.inicio();