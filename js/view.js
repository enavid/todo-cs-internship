view = (function () {

    const get = document.getElementById.bind(document);
    const addButton = get('addButton');
    const textField = get('textField');
    const list = get('list');
    const item = createItem();
    var control;
    const init = function (module) {
        control = module;
    }
    //=========================== view event listener ====================
    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        const value = { "value": textField.value, "complete": false };
        textField.value = '';
        list.prepend(item.createItem(value, { checkBox, trash, edit }));
        control.addTodos(value);
    })

    //=========================== define view function ===================
    function render(todos) {
        list.innerHTML = '';
        todos.forEach(element => {
            list.prepend(item.createItem(element, { checkBox, trash, edit }));
            console.log(element);
        });
    }

    function checkBox(element) {
        control.toggleComplete(element.todo);
        element.p.setAttribute('class',
            element.todo.complete ? 'complete' : 'incomplete'
        );
    }

    function trash(element) {
        control.removeTodos(element);
    }

    function edit(element) {
        console.log('edit');
        console.log(element);
    }
    //================================ view AIP===========================
    return { init, render }
})();

