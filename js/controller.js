(function controller() {
    const _todos = [];
    var _filter = 0;
    const module = { addItem, removeItem, toggleComplete, updateItem, filterItem, setFilter };
    //================================ controller AIP===========================

    view.init(module)

    // =============================== controller define function =====================
    function addItem(item) {
        checkIterative(item.value) ?
            alert(item.value + ' item is exist !') :
            view.renderSingleItem(item),
            _todos.push(item);
    }

    function toggleComplete(item) {
        item.complete = !item.complete;
    }

    function updateItem(item, update) {
        checkIterative(item.value) ?
            alert(update + ' item is exist !') :
            item.value = update,
            view.render(_todos);
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
        return _filter === 0 ? _todos :
            _filter === 1 ? _todos.filter(item => !item.complete) :
                _todos.filter(item => item.complete);
    }
    function render() {
        view.render(filterItem(_todos));
    }

})();