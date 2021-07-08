view = (function () {

    const get = document.getElementById.bind(document);
    const addButton = get('addButton');
    const textField = get('textField');
    const item = createItem();
    var control;
    const init = function (module) {
        control = module;
    }

    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        const value = { "value": textField.value, "complete": false };
        textField.value = '';
        ul.prepend(item.createItem(value, { checkBox }));
        control.addTodos(value);
    })
    function checkBox(element) {
        console.log(element.todo)
        element.todo.complete = !element.todo.complete;
        element.p.setAttribute('class',
            element.todo.complete ? 'complete' : 'incomplete'
        );
    }

    //================================ view AIP===========================
    return { init }
})();

