(function controller() {
    const _todos = [];
    const _view = view();
    var _filter = 'All';

    // =============================== controller define function =====================
    const addItem = (item) => {
        if (item.value === '') { return alert('Please enter valid input!') }
        checkIterative(item.value) ?
            alert(item.value + ' item is exist !') :
            _view.renderSingleItem(item),
            _todos.push(item);

    }
    const render = () => _view.render(filterItem(_todos));

    const toggleComplete = (item) => item.complete = !item.complete;

    const updateItem = (item, update) => {
        if (update === '') { return alert('Please enter valid input!') }
        checkIterative(update) ?
            alert(update + ' item is exist !') :
            item.value = update,
            _view.render(_todos);
    }

    const checkIterative = (value) => _todos.find((data) => data.value === value)

    const removeItem = (item) => {
        _todos.splice(_todos.indexOf(item), 1);
        render();
    }

    const setFilter = (filter) => {
        _filter = filter;
        render();
    }

    const filterItem = () => {
        return _filter === 'All' ? _todos :
            _filter === 'Active' ? _todos.filter(item => !item.complete) :
                _todos.filter(item => item.complete);
    }

    //=========================== control event listener ====================

    _view.addEventListener((e) => {
        const event = e.target.getAttribute('value');

        if (event === 'Add') { addItem(e.todo) }

        if (event === 'checkBox') { toggleComplete(e.todo) }

        if (event === 'trash') { removeItem(e.todo) }

        if (event === 'check') { updateItem(e.todo, e.inputEdit.value) }

        if (event === 'All' || event === 'Active' || event === 'Complete') { setFilter(event) }
    });

})();