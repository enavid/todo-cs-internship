(function controller() {
    const todos = [];
    const module = { addItem, removeItem, toggleComplete }
    //================================ controller AIP===========================

    view.init(module)

    // =============================== controller define function =====================
    function addItem(item) {
        todos.push(item);
        console.log(todos)
    }
    function toggleComplete(item) {
        item.complete = !item.complete;
    }

    function removeItem(item) {
        console.log(todos)
        todos.splice(todos.indexOf(item), 1);
        view.render(todos);

    }

})();