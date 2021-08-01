const _todos = [];

//================================ Model API ===================================

export default { addTodo, getTodos, removeItem };

// =============================== Define control function =====================
function addTodo(todo) {
    _todos.push(todo)
};

function getTodos() {
    return _todos
};

function removeItem(todo) {
    _todos.splice(_todos.indexOf(todo), 1);
}