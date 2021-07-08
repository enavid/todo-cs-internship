(function controller() {
    const _todos = [];
    var _filter = 0;
    const module = { addItem, removeItem, toggleComplete, updateItem, filterItem, setFilter };
    //================================ controller AIP===========================

    view.init(module)

    // =============================== controller define function =====================
    function addItem(item) {
        _todos.push(item);
    }

    function toggleComplete(item) {
        item.complete = !item.complete;
    }

    function updateItem(item, update) {
        item.value = update;
        view.render(_todos);
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