import _model from './model.js'
import _view from './view.js'

//=========================== control event listener ====================

_view.addEventListener('addButton', (e) => {
    if (e.todo.value === '') return alert('Please enter valid input!');
    if (checkIterative(e.todo.value)) return alert(e.todo.value + ' Item is exist !');
    _model.push(e.todo)
    _view.renderSingleItem(e.todo);
})

_view.addEventListener('trash', (e) => {
    _model.splice(_model.indexOf(e.todo), 1);
    _view.render(_model);
})

_view.addEventListener('checkBox', (e) => e.todo.complete = !e.todo.complete)

_view.addEventListener('allButton', (e) => _view.render(filterItem('All', _model)))

_view.addEventListener('activeButton', (e) => _view.render(filterItem('Active', _model)))

_view.addEventListener('completeButton', (e) => _view.render(filterItem('Complete', _model)))

_view.addEventListener('check', (e) => {
    if (e.inputEdit.value === '') return alert('Please enter valid input!');
    updateItem(e.todo, e.inputEdit.value);
    _view.render(_model);
});

// =============================== Define control function =====================

function updateItem(todo, update) {
    checkIterative(update) ? alert(update + ' item is exist !') : todo.value = update;
}

function checkIterative(value) {
    return _model.find((data) => data.value === value);
}

function filterItem(state, todos) {
    return state === 'All' ? todos :
        state === 'Active' ? todos.filter(item => !item.complete) : todos.filter(item => item.complete);
}


