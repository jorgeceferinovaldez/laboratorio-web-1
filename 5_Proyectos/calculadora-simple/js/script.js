/**
 * Calculadora Estándar — Laboratorio Web 1
 * Archivo: script.js
 */

// ============================================================
// 1. CONSTANTES Y REFERENCIAS AL DOM
// ============================================================

const display = document.getElementById('display');
const historialEl = document.getElementById('historial');
const teclado = document.querySelector('.teclado');

const STORAGE_KEY = 'calculadora_historial';

// ============================================================
// 2. ESTADO DE LA APLICACIÓN
// ============================================================

/*
  El estado de la calculadora se representa con tres variables:

  - current:      cadena con el número que se está tecleando en este momento.
  - previous:     número que quedó guardado cuando se pulsó un operador.
  - operator:     operador pendiente (+, −, ×, ÷) o null si no hay operación pendiente.
  - shouldReset:  bandera que indica si el siguiente dígito debe reemplazar el display
                  (ocurre después de pulsar "=" u otro operador).

  Usamos current como string para manejar sin problemas:
  - concatenación de dígitos
  - la coma decimal
  - el borrado carácter por carácter (DEL).
*/
let current = '0';
let previous = null;
let operator = null;
let shouldReset = false;

// ============================================================
// 3. FUNCIONES DE RENDERIZADO
// ============================================================

/**
 * Actualiza el contenido visual del display y del historial.
 * Siempre refleja el valor de las variables de estado.
 */
function render() {
  // Mostramos el número actual formateado con separadores de miles.
  display.textContent = formatNumber(current);

  // Construimos el historial: "previous operator" cuando hay operación pendiente.
  if (previous !== null && operator !== null) {
    historialEl.textContent = `${formatNumber(previous)} ${operator}`;
  } else {
    historialEl.textContent = '';
  }
}

/**
 * Formatea un número para mostrar separadores de miles y la coma decimal.
 * - Separa la parte entera en grupos de 3.
 * - respeta el signo negativo.
 * - Si la cadena termina en "." o contiene "." pero parte decimal es vacía,
 *   mantiene el punto para permitir seguir escribiendo decimales.
 */
function formatNumber(value) {
  if (value === 'Error') return value;

  const isNegative = value.startsWith('-');
  const raw = isNegative ? value.slice(1) : value;

  const hasDecimal = raw.includes('.');
  let [integerPart, decimalPart] = raw.split('.');

  // Si solo hay "." sin parte entera, interpretamos 0
  if (integerPart === '') integerPart = '0';

  // Separador de miles en la parte entera
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  let result = formattedInteger;
  if (hasDecimal) {
    result += '.' + (decimalPart !== undefined ? decimalPart : '');
  }

  return (isNegative ? '-' : '') + result;
}

// ============================================================
// 4. OPERACIONES ARITMÉTICAS
// ============================================================

function calcular(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/':
      if (b === 0) return Infinity; // lo manejamos como 'Error'
      return a / b;
    default: return b;
  }
}

// ============================================================
// 5. ACCIONES DE LOS BOTONES
// ============================================================

/*
  Cada botón del HTML tiene un atributo data-action.
  Según ese valor ejecutamos la acción correspondiente.
*/

function inputNumber(num) {
  /* Si debemos reiniciar (porque acabamos de presionar = u operador),
     reemplazamos el display. */
  if (shouldReset) {
    current = num;
    shouldReset = false;
  } else {
    // Si estamos en "0", el primer dígito lo reemplaza; si no, concatena.
    if (current === '0') {
      current = num;
    } else {
      // Limitamos a 15 dígitos totales para evitar overflow visual.
      const digitsOnly = current.replace(/[^\d]/g, '');
      if (digitsOnly.length < 15) {
        current += num;
      }
    }
  }
}

function inputDecimal() {
  if (shouldReset) {
    current = '0.';
    shouldReset = false;
    return;
  }
  // Solo permitimos un punto decimal. Si ya existe, ignoramos.
  if (!current.includes('.')) {
    current += '.';
  }
}

function inputOperator(op) {
  // Si hay una operación pendiente, primero resolvemos.
  if (operator !== null && !shouldReset) {
    ejecutarCalculo();
  }

  previous = parseFloat(current);
  operator = op;
  shouldReset = true;

  // Feedback visual: marcamos el operador activo.
  marcarOperadorActivo(op);
}

function ejecutarCalculo() {
  if (previous === null || operator === null) return;

  const b = parseFloat(current);
  let resultado = calcular(previous, b, operator);

  // Manejo de resultados inválidos
  if (!isFinite(resultado)) {
    current = 'Error';
  } else {
    // Limitamos decimales a 10 para evitar "0.3333333333333333"
    resultado = parseFloat(resultado.toFixed(10));
    current = String(resultado);
  }

  // Guardamos en el historial de operaciones completadas.
  guardarEnHistorial(`${previous} ${operator} ${b} = ${current}`);

  operator = null;
  previous = null;
  shouldReset = true;
  quitarOperadorActivo();
}

function clearAll() {
  current = '0';
  previous = null;
  operator = null;
  shouldReset = false;
  quitarOperadorActivo();
}

function deleteLast() {
  // Si el display muestra "Error" o se acaba de calcular, borramos completamente.
  if (current === 'Error' || shouldReset) {
    clearAll();
    return;
  }

  if (current.length === 1 || (current.length === 2 && current.startsWith('-'))) {
    current = '0';
  } else {
    current = current.slice(0, -1);
  }
}

function inputPercent() {
  const val = parseFloat(current);
  current = String(val / 100);
}

function toggleSign() {
  if (current === '0') return;
  if (current.startsWith('-')) {
    current = current.slice(1);
  } else {
    current = '-' + current;
  }
}

// ============================================================
// 6. FEEDBACK VISUAL DEL OPERADOR ACTIVO
// ============================================================

function marcarOperadorActivo(op) {
  quitarOperadorActivo();
  const btn = teclado.querySelector(`[data-action="operator"][data-value="${CSS.escape(op)}"]`);
  if (btn) btn.classList.add('activo');
}

function quitarOperadorActivo() {
  teclado.querySelectorAll('.btn.operador').forEach(b => b.classList.remove('activo'));
}

// ============================================================
// 7. PERSISTENCIA DEL HISTORIAL EN localStorage
// ============================================================

function guardarEnHistorial(entry) {
  const historial = cargarHistorial();
  historial.unshift(entry); // más reciente primero
  if (historial.length > 10) historial.pop(); // máximo 10 entradas
  localStorage.setItem(STORAGE_KEY, JSON.stringify(historial));
}

function cargarHistorial() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// ============================================================
// 8. EVENTOS: CLICS EN BOTONES + DELEGACIÓN
// ============================================================

/*
  Delegación de eventos en el contenedor .teclado.
  Ventajas:
  - Un solo listener para todos los botones.
  - No importa si se añaden/quitan botones dinámicamente.
  - Más eficiente que 20 listeners individuales.
*/
teclado.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const action = btn.dataset.action;

  switch (action) {
    case 'number':
      inputNumber(btn.dataset.value);
      break;
    case 'decimal':
      inputDecimal();
      break;
    case 'operator':
      inputOperator(btn.dataset.value);
      break;
    case 'calculate':
      ejecutarCalculo();
      break;
    case 'clear':
      clearAll();
      break;
    case 'delete':
      deleteLast();
      break;
    case 'percent':
      inputPercent();
      break;
    case 'toggle-sign':
      toggleSign();
      break;
  }

  render();
});

// ============================================================
// 9. SOPORTE DE TECLADO
// ============================================================

/*
  Permitimos teclear directamente desde el teclado físico.
  Esto mejora mucho la usabilidad en escritorio.
*/
document.addEventListener('keydown', (e) => {
  const key = e.key;

  // Números
  if (/^[0-9]$/.test(key)) {
    e.preventDefault();
    inputNumber(key);
    render();
    return;
  }

  // Operadores y acciones
  switch (key) {
    case '.':
    case ',':
      e.preventDefault();
      inputDecimal();
      break;
    case '+':
      e.preventDefault();
      inputOperator('+');
      break;
    case '-':
      e.preventDefault();
      inputOperator('-');
      break;
    case '*':
    case 'x':
    case 'X':
      e.preventDefault();
      inputOperator('*');
      break;
    case '/':
      e.preventDefault();
      inputOperator('/');
      break;
    case 'Enter':
    case '=':
      e.preventDefault();
      ejecutarCalculo();
      break;
    case 'Escape':
      e.preventDefault();
      clearAll();
      break;
    case 'Backspace':
      e.preventDefault();
      deleteLast();
      break;
    case '%':
      e.preventDefault();
      inputPercent();
      break;
    default:
      return; // ignorar teclas no mapeadas
  }

  render();
});

// ============================================================
// 10. INICIALIZACIÓN
// ============================================================

render();
