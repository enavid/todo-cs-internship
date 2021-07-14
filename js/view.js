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
    function addEventListener(callBack) {
        this.addEventListener = callBack;
    }

    function render(todos) {
        list.innerHTML = ' ';
        todos.forEach(element => {
            // Fix this bug
            list.prepend(renderSingleItem(element));
        });
    }

    function renderSingleItem(todo) {
        list.prepend(item.listItem(todo, (e) => {

            e.todo = todo;

            if (e.target.getAttribute('type') === 'checkbox') {
                control.toggleComplete(todo);
                e.todoText.className = todo.complete ? 'complete' : 'incomplete';
                this.addEventListener(e);
            }

            if (e.target.getAttribute('value') === 'penEdit') {
                renderEditInput(e.li);
            }

            if (e.target.getAttribute('value') === 'trash') {
                control.removeItem(todo);
                this.addEventListener(e);
            }

            if (e.target.getAttribute('value') === 'check') {
                control.updateItem(todo, e.inputEdit.value);
                this.addEventListener(e);
            }

            if (e.target.getAttribute('value') === 'close') {
                renderEditInput(e.li);
            }
        }));
    }

    function renderEditInput(item) {
        [...item.children].forEach(element => {
            element.style.display = element.style.display === 'none' ? 'flex' : 'none';
        })
    }

    //================================ view AIP===========================
    return { init, render, renderSingleItem, addEventListener }
})();

