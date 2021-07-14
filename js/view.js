view = (function () {

    const get = document.getElementById.bind(document);
    const addButton = get('addButton');
    const textField = get('textField');
    const list = get('list');
    const buttons = get('buttons')
    const item = createItem();

    //=========================== view event listener ====================
    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        const value = { "value": textField.value, "complete": false };
        textField.value = '';
        e.todo = value;
        handleEventListener(e);
        textField.focus();
    })

    buttons.addEventListener('click', (e) => {
        e.preventDefault();
        control.setFilter(e.target.getAttribute('value'));
    })

    //=========================== Define view function ===================

    const addEventListener = (callBack) => {
        handleEventListener = callBack;
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
            handleEventListener(e);
            const event = e.target.getAttribute('value');

            if (event === 'checkBox') { e.todoText.className = todo.complete ? 'complete' : 'incomplete'; }

            if (event === 'penEdit') { renderEditInput(e.li) }

            if (event === 'close') { renderEditInput(e.li) }
        }));
    }

    function renderEditInput(item) {
        [...item.children].forEach(element => {
            element.style.display = element.style.display === 'none' ? 'flex' : 'none';
        })
    }

    //================================ view AIP===========================
    return { render, renderSingleItem, addEventListener }
})();

