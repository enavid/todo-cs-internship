(function controller() {
    const todos = [];
    const module = { addItem, removeItem, toggleComplete, updateItem }
    //================================ controller AIP===========================

    view.init(module)

    // =============================== controller define function =====================
    function addItem(item) {
        todos.push(item);
    }

    function toggleComplete(item) {
        item.complete = !item.complete;
    }

    function updateItem(item, update) {
        item.value = update;
        view.render(todos);
    }

    function removeItem(item) {
        todos.splice(todos.indexOf(item), 1);
        view.render(todos);
    }

})();