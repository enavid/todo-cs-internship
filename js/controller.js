(() => {
    const _todos = [];
    const _view = view();

    // =============================== Define control function =====================
    const addItem = (todo) => {
        if (todo.value === '') return alert('Please enter valid input!');
        checkIterative(todo.value) ? alert(todo.value + ' Item is exist !') : _todos.push(todo);
    }

    const toggleComplete = (todo) => todo.complete = !todo.complete;

    const updateItem = (todo, update) => {
        if (update === '') return alert('Please enter valid input!');
        checkIterative(update) ? alert(update + ' item is exist !') : todo.value = update;
    }

    const checkIterative = (value) => _todos.find((data) => data.value === value)

    const removeItem = (todo) => _todos.splice(_todos.indexOf(todo), 1);

    const filterItem = (state, todos) => {
        return state === 'All' ? todos :
            state === 'Active' ? todos.filter(item => !item.complete) : todos.filter(item => item.complete);
    }

    //=========================== control event listener ====================

    _view.addEventListener((e) => {
        const event = e.target.getAttribute('value');

        if (event === 'Add') return addItem(e.todo), _view.renderSingleItem(e.todo);

        if (event === 'checkBox') return toggleComplete(e.todo);

        if (event === 'trash') return removeItem(e.todo), _view.render(_todos);

        if (event === 'check') return updateItem(e.todo, e.inputEdit.value), _view.render(_todos);

        if (event === 'All') return _view.render(filterItem(event, _todos));

        if (event === 'Active') return _view.render(filterItem(event, _todos));

        if (event === 'Complete') return _view.render(filterItem(event, _todos));

    });

})();