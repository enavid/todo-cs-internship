import _model from './model.js'
import _view from './view.js'

// =============================== Define control function =====================

const toggleComplete = (todo) => todo.complete = !todo.complete;

const updateItem = (todo, update) => checkIterative(update) ? alert(update + ' item is exist !') : todo.value = update;

const checkIterative = (value) => _model.getTodos().find((data) => data.value === value)

const removeItem = (todo) => _model.removeItem(todo);

const filterItem = (state, todos) => {
    return state === 'All' ? todos :
        state === 'Active' ? todos.filter(item => !item.complete) : todos.filter(item => item.complete);
}

//=========================== control event listener ====================

_view.addEventListener((e) => {
    const event = e.target.getAttribute('value');

    if (event === 'Add') {
        if (e.todo.value === '') return alert('Please enter valid input!');

        if (checkIterative(e.todo.value)) {
            alert(e.todo.value + ' Item is exist !');
        } else {
            _model.addTodo(e.todo);
            _view.renderSingleItem(e.todo);
        }
    };

    if (event === 'checkBox') return toggleComplete(e.todo);

    if (event === 'trash') return removeItem(e.todo), _view.render(_model.getTodos());

    if (event === 'check') {
        if (e.inputEdit.value === '') return alert('Please enter valid input!');
        updateItem(e.todo, e.inputEdit.value);
        _view.render(_model.getTodos())
    }

    if (event === 'All') return _view.render(filterItem(event, _model.getTodos()));

    if (event === 'Active') return _view.render(filterItem(event, _model.getTodos()));

    if (event === 'Complete') return _view.render(filterItem(event, _model.getTodos()));

});

