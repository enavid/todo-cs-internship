import _model from './model.js'
import _view from './view.js'

//================================ View API ===========================

export default { addButton, addEventListener, checkBox, check, allButton, activeButton, completeButton, download, upload, trash };

// =============================== Control function =====================

function addButton(todo) {
    if (todo.value === '') return alert('Please enter valid input!');
    if (checkIterative(todo.value)) return alert(todo.value + ' Item is exist !');
    _model.push(todo)
    _view.renderSingleItem(todo);
}

function allButton() {
    _view.render(filterItem('All', _model));
};

function activeButton() {
    _view.render(filterItem('Active', _model))
}

function completeButton() {
    _view.render(filterItem('Complete', _model))
}

function upload() {
    fetch('/todos', {
        method: 'POST',
        body: JSON.stringify(_model),
        headers: { 'Content-Type': 'application/json', },
    })
        .then(response => console.log(response))
}

function download() {
    fetch('/todos')
        .then(response => response.json())
        .then(data => {
            _model.push(...data);
            _view.render(_model);
        });
}

function checkBox(todo) {
    todo.complete = !todo.complete;
    _view.render(_model);
}

function check(data) {
    if (data.update === '') return alert('Please enter valid input!');
    checkIterative(data.update) ? alert(data.update + ' item is exist !') : data.todo.value = data.update;
    _view.render(_model);
}

function trash(todo) {
    _model.splice(_model.indexOf(todo), 1);
    _view.render(_model);
}

// =============================== Define control function =====================

function checkIterative(value) {
    return _model.find((data) => data.value === value);
}

function filterItem(state, todos) {
    return state === 'All' ? todos :
        state === 'Active' ? todos.filter(item => !item.complete) : todos.filter(item => item.complete);
}