const _todos = [];

// =============================== Define control function =====================
const addTodo = todo => _todos.push(todo);

const getTodos = () => _todos;

const removeItem = (todo) => _todos.splice(_todos.indexOf(todo), 1);

//================================ Model API ===================================

export default { addTodo, getTodos, removeItem };