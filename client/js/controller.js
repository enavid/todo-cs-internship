import _model from './model.js'
import _view from './view.js'

//=========================== control event listener ====================

_view.addEventListener('addButton', (todo) => {
    if (todo.value === '') return alert('Please enter valid input!');
    if (checkIterative(todo.value)) return alert(todo.value + ' Item is exist !');
    _model.push(todo);
    writeToLocalStorage(_model);
    _view.renderSingleItem(todo);
});

_view.addEventListener('trash', (todo) => {
    _model.splice(_model.indexOf(todo), 1);
    writeToLocalStorage(_model);
    _view.render(_model);
});

_view.addEventListener('checkBox', (todo) => {
    todo.complete = !todo.complete;
    writeToLocalStorage(_model);
    _view.render(_model);
});

_view.addEventListener('check', (data) => {
    if (data.update === '') return alert('Please enter valid input!');
    checkIterative(data.update) ? alert(data.update + ' item is exist !') : data.todo.value = data.update;
    writeToLocalStorage(_model);
    _view.render(_model);
});

_view.addEventListener('allButton', () => _view.render(filterItem('All', _model)));

_view.addEventListener('activeButton', () => _view.render(filterItem('Active', _model)));

_view.addEventListener('completeButton', () => _view.render(filterItem('Complete', _model)));

_view.addEventListener('download', () => {
    const token = read_token();
    console.log(token);
    // const result = confirm('Download data ?');
    // if (result) {
    fetch('/todos', {
        headers: { 'authentication': token },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // const result = data.filter((item) => {
            //     return _model.includes(item)
            // })
            // if (result.length > 0) {
            //     console.log(result)
            //     _model.push(result);
            //     writeToLocalStorage(result);
            // }

            // _view.render(_model);
        });
    // }
})

_view.addEventListener('signin', () => {
    window.document.location.href = '/signin';
})

_view.addEventListener('signup', () => {
    window.document.location.href = '/signup';
})

_view.addEventListener('upload', () => {
    const result = confirm('Upload data ?');
    if (result) {
        fetch('/todos', {
            method: 'POST',
            body: JSON.stringify(_model),
            headers: { 'Content-Type': 'application/json', },
        })
            .then(response => console.log(response))
    }
})
// =============================== Define control function =====================

function checkIterative(value) {
    return _model.find((data) => data.value === value);
}

function filterItem(state, todos) {
    return state === 'All' ? todos :
        state === 'Active' ? todos.filter(item => !item.complete) : todos.filter(item => item.complete);
}

function writeToLocalStorage(model) {
    localStorage.setItem('model', JSON.stringify(model));
}

function read_token() {
    return localStorage.getItem('token');
}

(function checkLocalStorage() {
    const model = JSON.parse(localStorage.getItem('model'));
    if (model) {
        _model.push(...model);
    }
})()

