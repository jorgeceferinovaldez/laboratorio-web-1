/**
 * Portal de Turismo Provincial — "Descubrí Santa Cruz"
 * Laboratorio Web 1
 * 
 * Archivo: js/main.js
 * Versión simplificada (página única) que combina toda la lógica:
 *   - Menú hamburguesa móvil
 *   - Suscripción al newsletter
 *   - Validación del formulario de contacto
 *   - Filtrado y búsqueda de destinos
 *   - Navegación por hash (client-side routing)
 * 
 * 💡 CONCEPTOS CLAVE DE JAVASCRIPT QUE SE APRENDEN AQUÍ:
 * - DOM (Document Object Model): cómo acceder y manipular HTML
 * - Event Listeners: cómo responder a clics, escritura, envíos
 * - Manipulación de clases CSS: classList.add/remove/contains
 * - Atributos ARIA dinámicos: setAttribute para accesibilidad
 * - Validación de formularios: expresiones regulares, feedback
 * - Filtrado y búsqueda: lógica de estado + renderizado
 * - Client-side routing: navegación por hash sin recargar
 */

// ============================================================
// 1. CONSTANTES Y REFERENCIAS AL DOM
// ============================================================
// 💡 ¿QUÉ ES EL DOM?
// DOM (Document Object Model) es la representación del HTML
// como un árbol de objetos que JavaScript puede manipular.
// Cada etiqueta HTML se convierte en un "nodo" que podemos
// leer, modificar, crear o eliminar.

// 💡 document.getElementById('id'):
// Busca un elemento HTML por su atributo id y devuelve una
// referencia al nodo. Es el método MÁS RÁPIDO para buscar
// un elemento. El id debe ser ÚNICO en la página.

// 💡 document.querySelectorAll('.clase'):
// Busca TODOS los elementos que coinciden con un selector
// CSS (clase, etiqueta, atributo). Devuelve una NodeList
// (similar a un array) que podemos recorrer con forEach.

// ── Menú de navegación móvil ──
const btnMenu = document.getElementById('btn-menu');
const navPrincipal = document.getElementById('nav-principal');

// ── Formulario de newsletter ──
const formNewsletter = document.getElementById('form-newsletter');
const emailNewsletter = document.getElementById('email-newsletter');
const newsletterMensaje = document.getElementById('newsletter-mensaje');

// ── Formulario de contacto (validación) ──
const formContacto = document.getElementById('form-contacto');

// ── Filtros y búsqueda de destinos ──
const botonesFiltro = document.querySelectorAll('.filtro-btn');
const buscadorDestino = document.getElementById('buscador-destino');
const tarjetasDestino = document.querySelectorAll('.tarjeta-destino');
const sinResultados = document.getElementById('sin-resultados');
const cantidadResultados = document.getElementById('cantidad-resultados');

// ── Navegación por hash ──
const enlacesNav = document.querySelectorAll('.nav-enlace');


// ============================================================
// 2. LÓGICA DEL MENÚ HAMBURGUESA
// ============================================================
// 💡 classList.contains('clase'):
//   Verifica si un elemento TIENE una clase CSS específica.
//   Devuelve true o false. Es más limpio que className.indexOf().
//
// 💡 classList.add('clase') / classList.remove('clase'):
//   Agrega o quita una clase CSS del elemento. No afecta otras
//   clases que el elemento ya tenga (a diferencia de className =).
//
// 💡 setAttribute('atributo', 'valor'):
//   Modifica cualquier atributo HTML del elemento. Aquí lo usamos
//   para actualizar aria-expanded y aria-label dinámicamente,
//   manteniendo la accesibilidad sincronizada con el estado visual.

/**
 * Alterna la visibilidad del menú de navegación en dispositivos móviles.
 * Modifica también los atributos ARIA para garantizar la accesibilidad.
 * 
 * 💡 ¿CÓMO FUNCIONA EL "TOGGLE"?
 * 1. Leemos el estado actual (abierto o cerrado).
 * 2. Si está abierto → lo cerramos y actualizamos ARIA.
 * 3. Si está cerrado → lo abrimos y actualizamos ARIA.
 * Esto se llama "máquina de estados" simple.
 */
function toggleMenu() {
  // Verificamos si el menú está abierto actualmente leyendo la clase 'visible'.
  const estaAbierto = navPrincipal.classList.contains('visible');
  
  if (estaAbierto) {
    // Si está abierto, ocultamos el menú y actualizamos atributos de accesibilidad.
    navPrincipal.classList.remove('visible');
    btnMenu.classList.remove('activo');
    btnMenu.setAttribute('aria-expanded', 'false');
    btnMenu.setAttribute('aria-label', 'Abrir menú de navegación');
  } else {
    // Si está cerrado, mostramos el menú y actualizamos atributos.
    navPrincipal.classList.add('visible');
    btnMenu.classList.add('activo');
    btnMenu.setAttribute('aria-expanded', 'true');
    btnMenu.setAttribute('aria-label', 'Cerrar menú de navegación');
  }
}

// 💡 addEventListener('click', toggleMenu):
//   Registra una función para que se ejecute cuando el usuario
//   hace clic en el botón. NO usamos onclick="..." en el HTML
//   porque addEventListener permite múltiples listeners y
//   separa el comportamiento (JS) de la presentación (HTML).
//
// 💡 if (btnMenu && navPrincipal):
//   Verificamos que los elementos EXISTAN antes de agregar el
//   evento. Si el HTML cambia y estos elementos desaparecen,
//   evitamos errores "Cannot read property of null".
if (btnMenu && navPrincipal) {
  btnMenu.addEventListener('click', toggleMenu);
}

/**
 * Cierra el menú hamburguesa si está abierto.
 * Se usa al hacer clic en un enlace de navegación (mobile) o al cambiar de hash.
 * 
 * 💡 ¿POR QUÉ UNA FUNCIÓN SEPARADA?
 * En lugar de duplicar el código de "cerrar menú" en varios
 * lugares (click en enlace, cambio de hash, etc.), creamos
 * una función reutilizable. Esto se llama DRY (Don't Repeat
 * Yourself) y es una buena práctica de programación.
 */
function cerrarMenuMovil() {
  if (navPrincipal && navPrincipal.classList.contains('visible')) {
    navPrincipal.classList.remove('visible');
    btnMenu.classList.remove('activo');
    btnMenu.setAttribute('aria-expanded', 'false');
    btnMenu.setAttribute('aria-label', 'Abrir menú de navegación');
  }
}


// ============================================================
// 3. LÓGICA DE SUSCRIPCIÓN AL NEWSLETTER
// ============================================================
// 💡 e.preventDefault():
//   Los formularios HTML, al enviarse (submit), recargan la
//   página por defecto. Como no tenemos un servidor backend,
//   cancelamos ese comportamiento con preventDefault().
//   Esto se llama "interceptar el evento".
//
// 💡 .value.trim():
//   .value obtiene el texto que el usuario escribió.
//   .trim() elimina espacios al inicio y al final.
//   "  hola@ejemplo.com  " → "hola@ejemplo.com"

/**
 * Simula la suscripción al newsletter enviando la información.
 * Cancela el envío real del formulario (ya que no hay backend)
 * y muestra un feedback visual al usuario.
 * 
 * @param {Event} e - Objeto de evento del formulario.
 *   Contiene información sobre el evento (tipo, elemento, etc.).
 */
function procesarSuscripcion(e) {
  // ⚠️ Importante: cancelamos el comportamiento por defecto del formulario.
  // Si no hiciéramos esto, la página se recargaría y perderíamos el estado.
  e.preventDefault();

  const email = emailNewsletter.value.trim();

  // Validación defensiva por si acaso el HTML falla (aunque usamos type="email" y required)
  if (email === '') {
    mostrarMensajeNewsletter('Por favor, ingresá un correo electrónico.', 'error');
    return;
  }

  // Simulamos que el envío fue exitoso.
  mostrarMensajeNewsletter('¡Gracias por suscribirte! Muy pronto vas a recibir novedades.', 'exito');

  // Limpiamos el campo de texto del correo y restablecemos el formulario.
  formNewsletter.reset();
}

/**
 * Muestra un mensaje en pantalla para dar respuesta al usuario.
 * 
 * 💡 className vs classList:
 *   - className = '...' REEMPLAZA todas las clases del elemento.
 *   - classList.add('...') AGREGA una clase sin borrar las otras.
 *   Aquí usamos className para LIMPIAR todo y empezar de cero,
 *   luego classList.add para agregar la clase del tipo.
 * 
 * 💡 textContent vs innerHTML:
 *   - textContent: establece solo TEXTO (más seguro, no interpreta HTML).
 *   - innerHTML: interpreta etiquetas HTML (riesgo de XSS si el
 *     texto viene del usuario).
 *   Siempre que sea solo texto, usa textContent.
 * 
 * @param {string} mensaje - El texto que se va a mostrar.
 * @param {string} tipo - El tipo de mensaje: 'exito' o 'error'.
 */
function mostrarMensajeNewsletter(mensaje, tipo) {
  // Limpiamos clases anteriores
  newsletterMensaje.className = 'newsletter-mensaje';
  
  // Agregamos la clase correspondiente para aplicar estilos de color (verde o rojo)
  newsletterMensaje.classList.add(tipo);
  
  // Escribimos el mensaje en el HTML
  newsletterMensaje.textContent = mensaje;
  
  // 💡 Dato didáctico:
  // Al elemento 'newsletterMensaje' le pusimos role="alert" y aria-live="polite" en el HTML.
  // Cuando actualizamos textContent, los lectores de pantalla leen automáticamente el mensaje.
}

// Vinculamos el evento de "submit" (envío) del formulario con la función procesarSuscripcion.
if (formNewsletter) {
  formNewsletter.addEventListener('submit', procesarSuscripcion);
}


// ============================================================
// 4. LÓGICA DE VALIDACIÓN DEL FORMULARIO DE CONTACTO
// ============================================================
// 💡 VALIDACIÓN DEL LADO DEL CLIENTE:
// La validación ocurre en el NAVEGADOR del usuario (no en un
// servidor). Es rápida y da feedback instantáneo. PERO:
// - Nunca es suficiente para seguridad (el usuario puede
//   desactivar JavaScript).
// - Siempre debe haber validación del lado del servidor en
//   una aplicación real.
//
// 💡 EXPRESIONES REGULARES (REGEX):
// Son patrones para buscar y validar texto.
// - /^[^\s@]+@[^\s@]+\.[^\s@]+$/  → valida email
//   ^ = inicio, $ = fin, [^\s@]+ = uno o más caracteres
//   que no sean espacio ni @, \. = punto literal
// - /^[+]?[0-9\s\-]{7,20}$/  → valida teléfono
//   [+]? = opcional +, [0-9\s\-] = dígitos/espacios/guiones
//   {7,20} = entre 7 y 20 caracteres
//
// 💡 VARIABLE BANDERA (FLAG):
// let formularioValido = true asume que todo está bien.
// Cada validación que falla lo pone en false.
// Al final, si sigue true, el formulario es válido.

if (formContacto) {
  // Referencias a los campos individuales del formulario de contacto
  const inputNombre = document.getElementById('nombre');
  const inputEmail = document.getElementById('email');
  const inputTelefono = document.getElementById('telefono');
  const selectMotivo = document.getElementById('motivo');
  const textareaMensaje = document.getElementById('mensaje');
  const mensajeGeneral = document.getElementById('contacto-mensaje-general');

  // Vinculamos el evento submit para realizar la validación manual
  formContacto.addEventListener('submit', function(e) {
    // ⚠️ Evitamos la recarga de página por defecto
    e.preventDefault();

    // Variable bandera que asume que el formulario es correcto al iniciar
    let formularioValido = true;

    // 1. Validar Nombre Completo (Mínimo 3 caracteres)
    const nombreError = document.getElementById('nombre-error');
    if (inputNombre.value.trim().length < 3) {
      nombreError.textContent = 'El nombre debe tener al menos 3 caracteres.';
      inputNombre.setAttribute('aria-invalid', 'true');
      formularioValido = false;
    } else {
      nombreError.textContent = '';
      inputNombre.setAttribute('aria-invalid', 'false');
    }

    // 2. Validar Email (Formato válido con expresión regular)
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail.value.trim())) {
      emailError.textContent = 'Ingresá una dirección de correo electrónico válida.';
      inputEmail.setAttribute('aria-invalid', 'true');
      formularioValido = false;
    } else {
      emailError.textContent = '';
      inputEmail.setAttribute('aria-invalid', 'false');
    }

    // 3. Validar Teléfono (Opcional, pero si se llena, debe cumplir con la expresión regular)
    const telefonoError = document.getElementById('telefono-error');
    const telValue = inputTelefono.value.trim();
    const telRegex = /^[+]?[0-9\s\-]{7,20}$/;
    if (telValue !== '' && !telRegex.test(telValue)) {
      telefonoError.textContent = 'El formato de teléfono es inválido (mínimo 7 números).';
      inputTelefono.setAttribute('aria-invalid', 'true');
      formularioValido = false;
    } else {
      telefonoError.textContent = '';
      inputTelefono.setAttribute('aria-invalid', 'false');
    }

    // 4. Validar Motivo de Consulta (Debe seleccionar una opción)
    const motivoError = document.getElementById('motivo-error');
    if (selectMotivo.value === '') {
      motivoError.textContent = 'Seleccioná un motivo para tu consulta.';
      selectMotivo.setAttribute('aria-invalid', 'true');
      formularioValido = false;
    } else {
      motivoError.textContent = '';
      selectMotivo.setAttribute('aria-invalid', 'false');
    }

    // 5. Validar Mensaje (Mínimo 20 caracteres)
    const mensajeError = document.getElementById('mensaje-error');
    if (textareaMensaje.value.trim().length < 20) {
      mensajeError.textContent = 'El mensaje es demasiado corto (mínimo 20 caracteres).';
      textareaMensaje.setAttribute('aria-invalid', 'true');
      formularioValido = false;
    } else {
      mensajeError.textContent = '';
      textareaMensaje.setAttribute('aria-invalid', 'false');
    }

    // 6. Mostrar respuesta general e informar resultado
    if (formularioValido) {
      // Éxito: agregamos clase de éxito, escribimos mensaje y limpiamos el formulario
      mensajeGeneral.className = 'contacto-mensaje-general exito';
      mensajeGeneral.textContent = '¡Tu consulta fue enviada con éxito! Muy pronto nos pondremos en contacto.';
      formContacto.reset();
    } else {
      // Error: agregamos clase de error e indicamos corregir campos
      mensajeGeneral.className = 'contacto-mensaje-general error';
      mensajeGeneral.textContent = 'Por favor, corregí los errores marcados en el formulario antes de enviar.';
    }
  });

  // 💡 VALIDACIÓN EN TIEMPO REAL (REAL-TIME VALIDATION):
  // Escuchamos el evento 'input' en cada campo. Cuando el usuario
  // empieza a escribir, el error desaparece automáticamente.
  // Esto mejora la experiencia de usuario (UX) porque:
  // - El feedback negativo no se queda si el usuario ya lo corrigió.
  // - No necesita hacer clic en "Enviar" para que desaparezca el error.
  //
  // 💡 forEach():
  // Recorre un array y ejecuta una función para cada elemento.
  // Es como un bucle for pero más declarativo y legible.
  const campos = [inputNombre, inputEmail, inputTelefono, selectMotivo, textareaMensaje];
  campos.forEach(function(campo) {
    // Usamos el evento 'input' (que se dispara en cada pulsación o cambio)
    campo.addEventListener('input', function() {
      if (campo.getAttribute('aria-invalid') === 'true') {
        campo.setAttribute('aria-invalid', 'false');
        const errorSpan = document.getElementById(campo.id + '-error');
        if (errorSpan) {
          errorSpan.textContent = '';
        }
      }
    });
  });
}


// ============================================================
// 5. LÓGICA DE FILTRADO Y BÚSQUEDA DE DESTINOS
// ============================================================

// 💡 PATRÓN DE ESTADO + RENDERIZADO (State + Render):
// Separamos el ESTADO (datos) del RENDERIZADO (visualización).
// - El estado son las variables categoriaActiva y busquedaTexto.
// - El renderizado es la función filtrarDestinos().
// Cuando el usuario interactúa (clic en filtro, escritura),
// solo cambiamos el ESTADO y llamamos a filtrarDestinos()
// para que actualice la pantalla.
//
// 💡 ¿POR QUÉ ES MEJOR ASÍ?
// - El estado es la "única fuente de verdad" (single source of truth).
// - Podemos cambiar filtros y búsqueda de forma independiente.
// - Si agregamos más filtros, solo cambiamos el estado y
//   la función de renderizado se encarga del resto.
let categoriaActiva = 'todos';
let busquedaTexto = '';

/**
 * Función principal que recorre todas las tarjetas de destino y determina
 * si se muestran u ocultan en base al estado de los filtros combinados
 * (categoría activa + texto de búsqueda).
 * 
 * 💡 LÓGICA DE FILTRADO (PASO A PASO):
 * 1. Leer data-categoria y data-nombre de cada tarjeta.
 * 2. Comparar con la categoría activa (o 'todos').
 * 3. Comparar con el texto de búsqueda (o vacío).
 * 4. Si AMBAS condiciones se cumplen → mostrar tarjeta.
 * 5. Si NO → ocultar tarjeta.
 * 6. Actualizar contador y mensaje "sin resultados".
 */
function filtrarDestinos() {
  let contadorVisibles = 0;

  // Recorremos cada una de las tarjetas utilizando un bucle forEach.
  tarjetasDestino.forEach(tarjeta => {
    // 💡 Paso A: Leemos los atributos personalizados (data-*) que preparamos en el HTML.
    // dataset.categoria accede al atributo data-categoria del HTML.
    // dataset.nombre accede al atributo data-nombre.
    const categoriaTarjeta = tarjeta.dataset.categoria; // Ej: 'naturaleza'
    const nombreTarjeta = tarjeta.dataset.nombre;       // Ej: 'glaciar perito moreno'

    // 💡 Paso B: Evaluamos si coincide con la categoría activa.
    // Coincide si la categoría activa es 'todos' o si es exactamente igual a la de la tarjeta.
    const coincideCategoria = (categoriaActiva === 'todos' || categoriaTarjeta === categoriaActiva);

    // 💡 Paso C: Evaluamos si coincide con el texto buscado.
    // Coincide si el texto buscado está vacío o si está incluido en el nombre de la tarjeta.
    // .includes() verifica si un texto contiene otro texto.
    // Ej: "glaciar perito moreno".includes("glaciar") → true
    const coincideTexto = (busquedaTexto === '' || nombreTarjeta.includes(busquedaTexto));

    // 💡 Paso D: Combinación lógica con operador AND (&&).
    // El destino se muestra SOLAMENTE si coincide con ambas condiciones a la vez.
    if (coincideCategoria && coincideTexto) {
      tarjeta.classList.remove('oculto'); // Quitamos la clase CSS que lo esconde
      contadorVisibles++;                 // Aumentamos el contador de destinos visibles
    } else {
      tarjeta.classList.add('oculto');    // Agregamos la clase CSS para esconderlo
    }
  });

  // ============================================================
  // 5a. ACTUALIZACIÓN DE LA VISTA (RENDERIZADO)
  // ============================================================
  
  // Actualizamos el contador de resultados dinámico.
  if (cantidadResultados) {
    cantidadResultados.textContent = contadorVisibles;
  }

  // Si no hay ningún destino visible, mostramos el cartel de "Sin resultados".
  if (contadorVisibles === 0) {
    sinResultados.classList.remove('oculto'); // Hacemos visible el cartel
  } else {
    sinResultados.classList.add('oculto');    // Escondemos el cartel
  }
}

// ── Evento A: Clics en los botones de Categorías ──
// Recorremos los botones y les agregamos un listener individual.
botonesFiltro.forEach(boton => {
  boton.addEventListener('click', () => {
    // 1. Quitar la clase '.activo' de todos los botones y poner aria-pressed en false.
    //    Esto "desmarca" todos los botones.
    botonesFiltro.forEach(b => {
      b.classList.remove('activo');
      b.setAttribute('aria-pressed', 'false');
    });

    // 2. Marcar el botón clickeado como activo y actualizar aria-pressed.
    boton.classList.add('activo');
    boton.setAttribute('aria-pressed', 'true');

    // 3. Modificar la variable de estado 'categoriaActiva' con el dataset del botón.
    //    dataset.filtro accede al atributo data-filtro del HTML.
    categoriaActiva = boton.dataset.filtro;

    // 4. Ejecutar la función de filtrado para redibujar la pantalla.
    filtrarDestinos();
  });
});

// ── Evento B: Escritura en el buscador de texto ──
if (buscadorDestino) {
  buscadorDestino.addEventListener('input', (e) => {
    // 1. Leemos el valor del input, quitamos espacios al inicio/final con trim()
    //    y lo convertimos todo a minúsculas para una comparación insensible a mayúsculas.
    //    "Glaciar Perito Moreno" → "glaciar perito moreno"
    let valorInput = e.target.value.trim().toLowerCase();

    // 💡 MANEJO DE ACENTOS (NORMALIZACIÓN):
    // Reemplazamos caracteres acentuados por sus equivalentes sin acento.
    // Esto hace que si el usuario busca "rio" (sin acento), coincida con
    // "Río Pinturas" (con acento). Sin esto, "rio" !== "río".
    //
    // 💡 .replace() con expresión regular y bandera /g (global):
    // Reemplaza TODAS las ocurrencias del patrón en el string.
    // [áäâà] es una clase de caracteres: coincide con cualquiera de ellos.
    valorInput = valorInput
      .replace(/[áäâà]/g, 'a')
      .replace(/[éëêè]/g, 'e')
      .replace(/[íïîì]/g, 'i')
      .replace(/[óöôò]/g, 'o')
      .replace(/[úüûù]/g, 'u');

    // 2. Modificamos el estado 'busquedaTexto' con el valor limpio.
    busquedaTexto = valorInput;

    // 3. Ejecutamos el filtrado para redibujar la pantalla.
    filtrarDestinos();
  });
}


// ============================================================
// 6. NAVEGACIÓN POR HASH (CLIENT-SIDE ROUTING)
// ============================================================
// 💡 ¿QUÉ ES UN HASH?
// El hash es la parte de la URL después del #.
// Ej: en "index.html#destinos", el hash es "#destinos".
// El navegador NO recarga la página cuando cambia el hash.
//
// 💡 CLIENT-SIDE ROUTING:
// En una aplicación de página única (SPA), la navegación
// entre secciones se maneja en el cliente (navegador) sin
// recargar la página. Usamos el hash para:
//   a) Hacer scroll suave hacia la sección destino.
//   b) Actualizar el enlace activo en la barra de navegación.
//   c) Permitir que los botones "Atrás/Adelante" funcionen.
//   d) Cerrar el menú móvil al navegar.
//
// 💡 history.pushState():
// Cambia la URL en la barra de direcciones SIN recargar la
// página. A diferencia de window.location.hash = '...',
// pushState no dispara el evento 'hashchange', por eso
// llamamos manualmente a actualizarEnlaceActivo().

/**
 * Actualiza el enlace activo en la navegación principal según el hash actual.
 * Recorre todos los enlaces del menú y compara su href con el hash de la URL.
 * Si coincide, le agrega la clase 'activo' y aria-current="page".
 * 
 * 💡 window.location.hash:
 *   Propiedad que contiene el hash actual de la URL (ej: "#destinos").
 *   Si no hay hash, devuelve una cadena vacía "".
 * 
 * 💡 href.startsWith('#'):
 *   Verifica si el href del enlace comienza con '#' (enlace interno).
 *   Los enlaces externos (ej: "https://...") se ignoran.
 */
function actualizarEnlaceActivo() {
  const hashActual = window.location.hash || '#inicio';

  enlacesNav.forEach(enlace => {
    // Obtenemos el hash del enlace (si tiene) o asumimos '#inicio' para index.html
    const href = enlace.getAttribute('href');
    let hashEnlace;

    if (href.startsWith('#')) {
      hashEnlace = href;
    } else if (href === 'index.html' || href === '/') {
      hashEnlace = '#inicio';
    } else {
      return; // Saltamos enlaces externos
    }

    // Comparamos y aplicamos la clase activa
    if (hashEnlace === hashActual) {
      enlace.classList.add('activo');
      enlace.setAttribute('aria-current', 'page');
    } else {
      enlace.classList.remove('activo');
      enlace.removeAttribute('aria-current');
    }
  });
}

/**
 * Navega suavemente hacia la sección indicada por el hash.
 * Usa element.scrollIntoView() con comportamiento smooth.
 * 
 * 💡 scrollIntoView():
 *   Método nativo del navegador que desplaza la página hasta
 *   que el elemento especificado esté visible.
 *   { behavior: 'smooth' } hace que el scroll sea animado
 *   (en lugar de instantáneo).
 * 
 * 💡 window.scrollTo():
 *   Similar a scrollIntoView pero para posiciones absolutas.
 *   { top: 0, behavior: 'smooth' } lleva al inicio de la página.
 * 
 * @param {string} hash - El hash de destino (ej: '#destinos', '#contacto').
 */
function navegarAHash(hash) {
  // Si el hash está vacío o es '#inicio', hacemos scroll al inicio de la página.
  if (!hash || hash === '#inicio') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Buscamos el elemento con el id correspondiente al hash.
  // document.querySelector(hash) busca un elemento por su id.
  // Ej: document.querySelector('#destinos') busca <section id="destinos">
  const seccionDestino = document.querySelector(hash);
  if (seccionDestino) {
    seccionDestino.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Maneja el evento de clic en los enlaces de navegación interna.
 * Previene la recarga de página, actualiza el hash en la URL,
 * navega a la sección y cierra el menú móvil.
 * 
 * 💡 e.currentTarget vs e.target:
 *   - currentTarget: el elemento que TIENE el event listener (el enlace).
 *   - target: el elemento que el usuario realmente clickeó (podría ser
 *     un hijo del enlace). Usamos currentTarget para estar seguros.
 * 
 * @param {Event} e - Objeto de evento del clic.
 */
function manejarClickEnlace(e) {
  const enlace = e.currentTarget;
  const href = enlace.getAttribute('href');

  // Solo interceptamos enlaces internos (con hash o index.html)
  if (href.startsWith('#') || href === 'index.html') {
    e.preventDefault();

    let hash;
    if (href === 'index.html') {
      hash = '#inicio';
    } else {
      hash = href;
    }

    // Actualizamos el hash en la barra de direcciones sin recargar la página.
    // pushState nos permite cambiar la URL sin disparar el evento hashchange.
    history.pushState(null, '', hash);

    // Actualizamos el enlace activo en la navegación.
    actualizarEnlaceActivo();

    // Hacemos scroll suave hacia la sección destino.
    navegarAHash(hash);

    // Cerramos el menú móvil si está abierto (solo en pantallas chicas).
    cerrarMenuMovil();
  }
}

// Vinculamos el evento de clic a cada enlace de navegación.
enlacesNav.forEach(enlace => {
  enlace.addEventListener('click', manejarClickEnlace);
});

/**
 * Escucha el evento 'hashchange' del navegador (cuando el usuario
 * usa los botones de "Atrás" / "Adelante" o escribe manualmente
 * un hash en la barra de direcciones).
 * 
 * 💡 ¿POR QUÉ NECESITAMOS ESTO?
 * Cuando el usuario usa los botones "Atrás" o "Adelante" del
 * navegador, el hash cambia pero NO se dispara nuestro código
 * de clic. El evento hashchange captura esos cambios y actualiza
 * la navegación y el scroll.
 */
window.addEventListener('hashchange', function() {
  actualizarEnlaceActivo();
  navegarAHash(window.location.hash);
});

/**
 * Inicialización al cargar la página:
 * - Si la URL contiene un hash, navegamos a esa sección.
 * - Actualizamos el enlace activo según el hash actual.
 * 
 * 💡 DOMContentLoaded:
 *   Evento que se dispara cuando el HTML terminó de cargarse
 *   (pero no necesariamente las imágenes o CSS). Es el momento
 *   seguro para empezar a manipular el DOM.
 * 
 * 💡 setTimeout(..., 100):
 *   Pequeño retardo de 100ms para asegurar que el navegador
 *   haya terminado de renderizar la página antes de hacer scroll.
 *   Sin esto, el scroll podría no funcionar correctamente porque
 *   los elementos aún no tienen sus dimensiones finales.
 */
document.addEventListener('DOMContentLoaded', function() {
  const hashInicial = window.location.hash;

  if (hashInicial) {
    // Pequeño retardo para asegurar que el DOM esté completamente renderizado.
    setTimeout(function() {
      navegarAHash(hashInicial);
    }, 100);
  }

  actualizarEnlaceActivo();
});
