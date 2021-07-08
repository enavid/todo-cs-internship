(function controller() {
    const todo = [];
    const module = { addTodos }
    //================================ controller AIP===========================

    view.init(module)


    function addTodos(value) {
        todo.push(value);
    }

})();