(function controller() {
    const _todos = [];
    const _view = view();
    var _filter = 0;

    //=========================== Define view function ===================

    _view.addEventListener((e) => {
        const event = e.target.getAttribute('value');

        if (event === 'Add') { addItem(e.todo) }

        if (event === 'checkBox') { toggleComplete(e.todo) }

        if (event === 'trash') { removeItem(e.todo) }

        if (event === 'check') { updateItem(e.todo, e.inputEdit.value) }

        if (event === 'All' || event === 'Active' || event === 'Complete') { setFilter(event) }
    });

    // =============================== controller define function =====================
    function addItem(item) {
        if (item.value === '') { return alert('Please enter valid input!') }
        checkIterative(item.value) ?
            alert(item.value + ' item is exist !') :
            _view.renderSingleItem(item),
            _todos.push(item);

    }

    function toggleComplete(item) {
        item.complete = !item.complete;
    }

    function updateItem(item, update) {
        if (update === '') { return alert('Please enter valid input!') }
        checkIterative(update) ?
            alert(update + ' item is exist !') :
            item.value = update,
            _view.render(_todos);
    }

    function checkIterative(value) {
        return _todos.find((data) => data.value === value)
    }

    function removeItem(item) {
        _todos.splice(_todos.indexOf(item), 1);
        render(_todos);
    }

    function setFilter(filter) {
        _filter = filter;
        render();
    }

    function filterItem() {
        return _filter === 'All' ? _todos :
            _filter === 'Active' ? _todos.filter(item => !item.complete) :
                _todos.filter(item => item.complete);
    }
    function render() {
        _view.render(filterItem(_todos));
    }

})();