(function controller() {
    const todos = [];
    const module = { addTodos, removeTodos, toggleComplete }
    //================================ controller AIP===========================

    view.init(module)

    // =============================== define function =====================
    function addTodos(item) {
        todos.push(item);
        console.log(todos)
    }
    function toggleComplete(item) {
        item.complete = !item.complete;
    }
    function removeTodos(item) {
        console.log(todos)
        todos.splice(todos.indexOf(item), 1);

    }

})();