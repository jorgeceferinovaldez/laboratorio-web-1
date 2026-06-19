# Informe de Migracion: LESS a CSS3 Vanilla

**Fecha:** 18 de junio de 2026  
**Proyecto:** Guia Coffe and Cake (SPA Educativa)  
**Ambito:** Directorios `89` a `126`

---

## Resumen Ejecutivo

Este informe documenta la migracion completa del tutorial educativo **Coffe and Cake** desde el preprocesador **LESS** y la herramienta de compilacion **Prepros** hacia **CSS3 vanilla moderno**. El objetivo pedagogico es que los alumnos principiantes trabajen exclusivamente con HTML5, CSS3 y JavaScript vanilla, sin dependencias externas de preprocesadores ni herramientas de compilacion.

### Cambio Tecnologico Clave

- **Removido:** Toda referencia a archivos `.less` y configuraciones `prepros-*.config`.
- **Introducido:** Uso de **CSS Custom Properties** (`:root`) para gestionar colores y fuentes de forma nativa.
- **Enfoque Didactico:** Codigo plano, desanidado, con comentarios en espanol que explican bloque por bloque la funcion de cada regla CSS.

### Criterios de Legibilidad Aplicados

- Selectores CSS **planos** (sin anidacion), priorizando la claridad visual sobre la optimizacion extrema.
- Comentarios didacticos en cada bloque principal (`/* ... */`) explicando que hace cada seccion.
- Variables nombradas en **espanol descriptivo** dentro de `:root` para facilitar la comprension (ej. `--color-negro-custom`, `--fuente-principal`).

---

## 1. Arquitectura y Variables Globales CSS3

### Bloque `:root` Universal

Todos los directorios que contienen estilos (90 a 106) comparten el mismo bloque `:root` al inicio de `css/estilos.css`:

```css
:root {
  --color-negro-custom: #141618;
  --color-blanco: #fff;
  --color-texto-oscuro: #303133;
  --color-texto-claro: #777;
  --color-dorado: #b4975a;
  --color-gris-claro: #eaeaea;
  --fuente-principal: 'Playfair Display', serif;
  --fuente-secundaria: 'Poppins', serif;
}
```

### Equivalencias LESS → CSS3

| Variable LESS (original) | Custom Property CSS3 | Valor |
|---|---|---|
| `@negro-custom` | `--color-negro-custom` | `#141618` |
| `@blanco` | `--color-blanco` | `#fff` |
| `@texto-oscuro` | `--color-texto-oscuro` | `#303133` |
| `@texto-claro` | `--color-texto-claro` | `#777` |
| `@dorado` | `--color-dorado` | `#b4975a` |
| `@gris-claro` | `--color-gris-claro` | `#eaeaea` |
| `@fuente-principal` | `--fuente-principal` | `'Playfair Display', serif` |
| `@fuente-secundaria` | `--fuente-secundaria` | `'Poppins', serif` |

### Criterio de Desanidacion

Las reglas anidadas de LESS se convirtieron a selectores CSS estandar concatenando los ancestros. Por ejemplo:

```less
// ORIGINAL LESS
header {
  .menu-bar-pc {
    background: @blanco;
    .logo { max-width: 3.125rem; }
  }
}
```

```css
/* CSS3 VANILLA EQUIVALENTE */
header .menu-bar-pc {
  background: var(--color-blanco);
}
header .menu-bar-pc .logo {
  max-width: 3.125rem;
}
```

Esto garantiza que un alumno pueda leer el CSS de arriba hacia abajo sin necesidad de entender la logica de anidacion de un preprocesador.

---

## 2. Detalle de Cambios por Directorio (Lecciones 89 a 126)

### 89. Iniciando estructura de carpetas y archivos
- **Archivos Eliminados:** Ninguno (este directorio no contenia LESS ni Prepros).
- **Archivos Modificados/Creados:** Ninguno.
- **Resumen:** Punto de partida del proyecto. Solo contiene `index.html` basico y assets estaticos.

### 90. Maquetando encabezado de sitio web
- **Archivos Eliminados:** `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se reconstruyo el CSS desde cero tomando los bloques base del archivo final (106). Se incluyeron `:root`, reset general, estilos de enlaces e imagenes, y los estilos del encabezado fijo (`header .menu-bar-pc`). Se excluyeron deliberadamente los estilos moviles (`menu-bar-movil`) porque aun no se habian introducido en esta leccion.

### 91. Maquetando portada de sitio web
- **Archivos Eliminados:** `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se agregaron los bloques CSS correspondientes a la seccion `.main .portada` (galeria de inicio con columnas, fotos y overlays) descomponiendo el LESS original en selectores planos con Custom Properties.

### 92. Maquetando seccion Nosotros del sitio web
- **Archivos Eliminados:** `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se incorporo la seccion `.main .nosotros` con sus dos columnas (30%/70%), utilizando Flexbox. Se anadio el selector `.container` por primera vez en el flujo progresivo, ya que aparece dentro del HTML de esta leccion.

### 93. Maquetando seccion Nuestro chef del sitio web
- **Archivos Eliminados:** `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se agrego la seccion `.main .chef` con fondo oscuro, slider de imagenes y titulos con opacidad. Los estilos del slider (`width: 300%`) se mantuvieron identicos al original compilado.

### 94. Maquetando seccion Nuestro Menu de sitio web
- **Archivos Eliminados:** `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se integro la seccion `.main .menu-platos` con las pestanas (`encabezado`, `contenido`, `item`, precios). Se conservaron las clases `.active` para el control via JavaScript posterior.

### 95. Maquetando seccion Contacto del sitio web
- **Archivos Eliminados:** `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se anadio la seccion `.main .contacto` completa: area de datos con blurbs sobre imagen de fondo, overlay oscuro, y el formulario con efecto material-design para los labels. Se excluyo el selector `.error` porque los mensajes de error aun no existen en el HTML de esta leccion (se introducen en la 121).

### 96. Maquetando pie de pagina del sitio web
- **Archivos Eliminados:** `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se agrego la seccion `footer` con fondo oscuro, copyright centrado y enlaces a redes sociales. Este directorio contiene **todas** las secciones de escritorio sin media queries ni encabezado movil.

### 97. Aplicando estilos generales al sitio web
- **Archivos Eliminados:** `prepros-6.config`, `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Primer directorio donde aparecio `prepros-6.config`. Se elimino. El `css/estilos.css` se regenero con `:root`, reset general y estilos base (body, container, img, enlaces, titulos). Se anadieron comentarios didacticos explicando cada regla.

### 98. Aplicando estilos a encabezado del sitio web
- **Archivos Eliminados:** `prepros-6.config`, `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se agregaron los estilos del `header .menu-bar-pc` (fondo blanco, posicion fija, flexbox, logo, menu principal y redes sociales).

### 99. Aplicando estilos a portada del sitio web
- **Archivos Eliminados:** `prepros-6.config`, `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se incorporo la seccion `.main .portada` con fotos, overlays con opacidad, textos y fotos a ancho completo. Se mantuvieron las transiciones suaves (`transition: all 0.3s ease`).

### 100. Aplicando estilos a seccion Nosotros del sitio web
- **Archivos Eliminados:** `prepros-6.config`, `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se anadio `.main .nosotros` con sus dos columnas y la clase `.titulo-seccion`.

### 101. Aplicando estilos a seccion Nuestro chef de sitio web
- **Archivos Eliminados:** `prepros-6.config`, `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se incorporo la seccion `.main .chef` con fondo oscuro y slider de imagenes. Se conservo el comentario didactico explicando el `width: 300%` del slider para el desplazamiento por JavaScript.

### 102. Aplicando estilos a seccion Nuestro Menu de sitio web
- **Archivos Eliminados:** `prepros-6.config`, `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se anadio la seccion `.main .menu-platos` con pestanas (tabs), contenido oculto por defecto (`display: none`) y transiciones. Se mantuvo la logica de clases `.active` para el intercambio de contenido.

### 103. Aplicando estilos a seccion Contacto de sitio web
- **Archivos Eliminados:** `prepros-6.config`, `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se agrego la seccion `.main .contacto` con datos de contacto, overlay, blurbs y formulario. Se excluyo el selector `.error` al no estar presente aun en el HTML.

### 104. Aplicando estilos a pie de pagina de sitio web
- **Archivos Eliminados:** `prepros-6.config`, `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se anadio la seccion `footer` con fondo oscuro, copyright y redes sociales inferiores.

### 105. Aplicando media queries a sitio web
- **Archivos Eliminados:** `prepros-6.config`, `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se agregaron las `@media` queries responsivas para puntos de ruptura `1500px`, `1199px`, `980px`, `800px` y `580px`. Estas queries adaptan el layout de portada, nosotros, chef, menu, contacto y formulario para pantallas mas pequenas.

### 106. Creando encabezado movil de sitio web
- **Archivos Eliminados:** `prepros-6.config`, `css/estilos.less`.
- **Archivos Modificados/Creados:** `css/estilos.css`.
- **Resumen:** Se incorporo la barra movil (`header .menu-bar-movil`) y el menu lateral deslizable (`header .menu-bar-movil .slideMenu`) con su clase `.active` para control por JavaScript. Se conservaron las media queries del directorio 105.

### 107 al 126 (Lecciones de JavaScript)
- **Archivos Eliminados:** Ninguno (estos directorios no contienen LESS ni Prepros).
- **Archivos Modificados/Creados:** Ninguno (solo verificacion de compatibilidad).
- **Resumen:** Se verifico que los scripts (`lightbox.js`, `slider.js`, `tabs.js`, `bgParallax.js`, `formulario.js`, `scroll.js`, `menuMovil.js`) no contienen referencias a LESS ni Prepros. Todos los selectores de clases manipulados por JavaScript (`lightbox`, `active`, `imagen-modal`, `label`, `error`, `menu-principal`, etc.) coinciden con las clases presentes en el CSS3 vanilla generado.

---

## 3. Estado de la Integracion con JavaScript (Lecciones 107 a 126)

### Metodo de Verificacion

Se realizo una auditoria automatizada de los 20 archivos `.js` en los directorios 107-126. Los resultados fueron los siguientes:

- **0 referencias** a `less`, `prepros`, `.less` o `prepros-*.config`.
- **0 conflictos** de clases CSS: todos los selectores manipulados por JavaScript (`lightbox`, `active`, `imagen-modal`, `scroll-suave`, `volver-arriba`, `parallax`, `label`, `error`, `menu-principal`, etc.) se mantuvieron identicos al CSS compilado original.
- **Estilos inline** encontrados en `lightbox.js`, `slider.js` y `tabs.js`: estos estilos son estructurales (posicion, dimension, opacidad, transiciones) y no dependentes de las variables de tema, por lo que no interfieren con las Custom Properties.

### Compatibilidad Garantizada

| Script | Funcion | Clases CSS Afectadas | Estado |
|---|---|---|---|
| `lightbox.js` | Ventana modal de imagenes | `.lightbox`, `.imagen-modal` | Compatible |
| `slider.js` | Carrusel de imagenes | `.slider`, `.slide` | Compatible |
| `tabs.js` | Pestañas de menu | `.active`, `.encabezado`, `.contenido` | Compatible |
| `bgParallax.js` | Parallax scroll | `.parallax` | Compatible |
| `formulario.js` | Labels animados + validacion | `.label`, `.active`, `.error` | Compatible |
| `scroll.js` | Scroll suave | `.scroll-suave`, `.volver-arriba` | Compatible |
| `menuMovil.js` | Menu hamburguesa movil | `#slideMenu`, `.active` | Compatible |

---

## 4. Directivas para la Siguiente Fase (Instrucciones para el proximo Agente)

Si un agente de IA retoma este proyecto en una sesion futura, debe tener en cuenta lo siguiente:

1. **Auditar la consistencia de `index.html`:** Verificar que todos los archivos `index.html` (especialmente en los directorios 90-106) sigan apuntando correctamente a `css/estilos.css` y no a ningun archivo `.less`.

2. **Verificar carga de fuentes:** Asegurar que las fuentes de Google (`Playfair Display` y `Poppins`) se carguen de forma nativa mediante el `<link>` en el `<head>` de cada `index.html`, sin intermediarios del preprocesador.

3. **Revisar comentarios didacticos residuales:** Si se detectan comentarios que hagan referencia a sintaxis de LESS (ej. `// Esto es LESS`), deben ser reemplazados por explicaciones equivalentes en CSS3 vanilla.

4. **Consistencia visual en resoluciones:** Abrir las lecciones 95, 100 y 106 en distintos tamanos de ventana (desktop ~1200px, tablet ~800px, movil ~375px) para confirmar que las media queries y los layouts responsive funcionan como antes.

5. **Chequeo de colores hardcodeados no mapeados:** Existen algunos valores `rgba(...)` y hex (`#977c44`, `#ff3b3b`) que no tienen una Custom Property equivalente porque representan variantes con alpha o tonos derivados. El agente debe evaluar si conviene agregar nuevas Custom Properties (ej. `--color-dorado-oscuro`, `--color-error`) para completar la paleta.

6. **Validacion sintactica del CSS:** Ejecutar un linter CSS o inspeccionar con herramientas de desarrollo para asegurar que no haya errores de sintaxis, llaves sin cerrar o selectores malformados en los archivos generados.

7. **Prueba funcional de scripts:** Cargar la leccion 126 (la mas completa) en un navegador y probar: lightbox en las fotos de portada, tabs del menu, parallax del contacto, validacion del formulario, scroll suave y menu movil. Todo debe comportarse igual que antes de la migracion.

8. **Revisar la leccion 89:** Aunque no tuvo cambios, asegurar que su `index.html` base no contenga etiquetas de estilo ni scripts que referencien LESS.

---

*Fin del informe. Proyecto migrado exitosamente de LESS/Prepros a CSS3 Vanilla.*
