(function controller() {

    module = {
        addTodos,

    }
    //================================ controller AIP===========================

    const todo = [];
    view(module);
    addTodos = function (value) {
        todo.push(value);
    }
    console.log(module)


})();