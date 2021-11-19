import _model from './model.js'
import _view from './view.js'

//=========================== control event listener ====================

_view.addEventListener('addButton', (todo) => {
    if (todo.value === '') return alert('Please enter valid input!');
    if (checkIterative(todo.value)) return alert(todo.value + ' Item is exist !');
    _model.push(todo)
    _view.renderSingleItem(todo);
});

_view.addEventListener('trash', (todo) => {
    _model.splice(_model.indexOf(todo), 1);
    _view.render(_model);
});

_view.addEventListener('checkBox', (todo) => {
    todo.complete = !todo.complete;
    _view.render(_model);
});

_view.addEventListener('check', (data) => {
    if (data.update === '') return alert('Please enter valid input!');
    checkIterative(data.update) ? alert(data.update + ' item is exist !') : data.todo.value = data.update;
    _view.render(_model);
});

_view.addEventListener('allButton', () => _view.render(filterItem('All', _model)));

_view.addEventListener('activeButton', () => _view.render(filterItem('Active', _model)));

_view.addEventListener('completeButton', () => _view.render(filterItem('Complete', _model)));

_view.addEventListener('download', () => {
    fetch('/todos')
        .then(response => response.json())
        .then(data => {
            _model.push(...data);
            _view.render(_model);
        });
})

_view.addEventListener('upload', () => {
    console.log('upload')
    fetch('/todos', {
        method: 'POST',
        body: JSON.stringify(_model),
        headers: { 'Content-Type': 'application/json', },
    })
        .then(response => console.log(response))
})
// =============================== Define control function =====================

function checkIterative(value) {
    return _model.find((data) => data.value === value);
}

function filterItem(state, todos) {
    return state === 'All' ? todos :
        state === 'Active' ? todos.filter(item => !item.complete) : todos.filter(item => item.complete);
}


