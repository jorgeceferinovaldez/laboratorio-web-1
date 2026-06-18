// Modelo de tarea
const STORAGE_KEY = 'task_manager_tasks';

// Cargamos las tareas desde localStorage
function loadTasks() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Guardamos las tareas en localStorage
function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Renderiza la lista completa
function renderTasks(tasks) {
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');
        li.dataset.index = index;

        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = task.text;
        li.appendChild(textSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '✕';
        li.appendChild(deleteBtn);

        // Evento de clic para marcar/desmarcar
        textSpan.addEventListener('click', () => {
            toggleComplete(index);
        });

        // Evento de borrado
        deleteBtn.addEventListener('click', () => {
            deleteTask(index);
        });

        list.appendChild(li);
    });
    updateCounters(tasks);
}

// Actualiza contadores
function updateCounters(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    const counterDiv = document.getElementById('counter');
    counterDiv.textContent = `Activas: ${active} | Completadas: ${completed} | Total: ${total}`;
}

// Añade una nueva tarea
function addTask(text) {
    if (!text.trim()) return;
    const tasks = loadTasks();
    tasks.push({ text: text.trim(), completed: false });
    saveTasks(tasks);
    renderTasks(tasks);
    document.getElementById('add-input').value = '';
}

// Elimina tarea
function deleteTask(index) {
    const tasks = loadTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks(tasks);
}

// Alterna estado completado
function toggleComplete(index) {
    const tasks = loadTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks(tasks);
}

// Limpia todo
function clearAll() {
    localStorage.removeItem(STORAGE_KEY);
    renderTasks([]);
}

// Bindea eventos
document.getElementById('add-btn').addEventListener('click', () => {
    const input = document.getElementById('add-input');
    addTask(input.value);
});

document.getElementById('clear-all').addEventListener('click', () => {
    if (confirm('¿Seguro que quieres borrar todas las tareas?')) {
        clearAll();
    }
});

// Tareas predeterminadas (solo si no hay datos guardados)
const initialTasks = [
    { text: 'Comprar comida', completed: false },
    { text: 'Pasear al perro', completed: false },
    { text: 'Estudiar JavaScript', completed: false },
    { text: 'Lavar la ropa', completed: false },
    { text: 'Llamar a mamá', completed: false }
];

// Si localStorage está vacío, usar las tareas predeterminadas
if (!localStorage.getItem(STORAGE_KEY)) {
    saveTasks(initialTasks);
}

// Render al cargar
renderTasks(loadTasks());