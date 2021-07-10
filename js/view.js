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

    //=========================== Define view function ===================
    function render(todos) {
        list.innerHTML = '';
        todos.forEach(element => {
            list.prepend(renderSingleItem(element));
        });
    }

    function renderSingleItem(todo) {
        list.prepend(item.listItem(todo, (e) => {

            if (e.target.getAttribute('type') === 'checkbox') {
                control.toggleComplete(todo);
                e.todoText.className = todo.complete ? 'complete' : 'incomplete';
            }
            if (e.target.getAttribute('value') === 'penEdit') {
                console.log(e.li)
                renderEditInput(e.li)
            }
            if (e.target.getAttribute('value') === 'trash') {
                control.removeItem(todo);
            }
            //if (element.event == 'check') { control.updateItem(element.todo, element.input.value) }
            //if (element.event == 'close') { element.input.value = ''; }
        }));
    }

    function renderEditInput(item) {
        [...item.children].forEach(element => {
            element.style.display = element.style.display === 'none' ? 'flex' : 'none';
        })
    }

    //================================ view AIP===========================
    return { init, render, renderSingleItem }
})();

