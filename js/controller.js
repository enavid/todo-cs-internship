import _model from './model.js'
import _view from './view.js'

//=========================== control event listener ====================

_view.addEventListener('addButton', (todo) => {
    if (todo.value === '') return alert('Please enter valid input!');
    if (checkIterative(todo.value)) return alert(todo.value + ' Item is exist !');
    _model.push(todo)
    _view.renderSingleItem(todo);
})

_view.addEventListener('trash', (e) => {
    _model.splice(_model.indexOf(e.todo), 1);
    _view.render(_model);
})

_view.addEventListener('checkBox', (todo) => {
    todo.complete = !todo.complete;
    _view.render(_model);
})

_view.addEventListener('allButton', (e) => _view.render(filterItem('All', _model)))

_view.addEventListener('activeButton', (e) => _view.render(filterItem('Active', _model)))

_view.addEventListener('completeButton', (e) => _view.render(filterItem('Complete', _model)))

_view.addEventListener('check', (e) => {
    if (e.update === '') return alert('Please enter valid input!');
    checkIterative(e.update) ? alert(e.update + ' item is exist !') : e.todo.value = e.update;
    _view.render(_model);
});

// =============================== Define control function =====================

function checkIterative(value) {
    return _model.find((data) => data.value === value);
}

function filterItem(state, todos) {
    return state === 'All' ? todos :
        state === 'Active' ? todos.filter(item => !item.complete) : todos.filter(item => item.complete);
}


