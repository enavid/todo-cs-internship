view = (function () {

    const get = document.getElementById.bind(document);
    const addButton = get('addButton');
    const textField = get('textField');
    const list = get('list');
    const buttons = get('buttons')
    const item = createItem();
    var control;
    const init = function (module) {
        control = module;
    }
    //=========================== view event listener ====================
    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        const value = { "value": textField.value, "complete": false };
        textField.value = '';
        control.addItem(value);
        textField.focus();
    })

    buttons.addEventListener('click', (e) => {
        e.preventDefault();
        control.setFilter(e.target.getAttribute('value'));
    })

    //=========================== define view function ===================
    function render(todos) {
        list.innerHTML = '';
        todos.forEach(element => {
            list.prepend(item.listItem(element, { checkBox, trash, edit }));
        });
    }

    function renderSingleItem(todo) {
        list.prepend(item.listItem(todo, { checkBox, trash, edit }));
    }

    function renderEditInput(item) {
        [...item.tag.children].forEach(element => {
            element.style.display = element.style.display === 'none' ? 'flex' : 'none';
        })
    }

    function checkBox(element) {
        control.toggleComplete(element.todo);
        element.todoText.className = element.todo.complete ? 'complete' : 'incomplete';
    }

    function trash(element) {
        control.removeItem(element.todo);
    }

    function edit(element) {
        renderEditInput(element)

        if (element.event == 'check') { control.updateItem(element.todo, element.input.value) }
        if (element.event == 'close') { element.input.value = ''; }
    }
    //================================ view AIP===========================
    return { init, render, renderSingleItem }
})();

