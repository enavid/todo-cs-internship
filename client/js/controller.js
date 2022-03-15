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
    // const result = confirm('Download data ?');
    // if (result) {
    fetch('/todos', {
        headers: { 'authentication': token },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status) {
                console.log(data.todos)
                // const result = data.filter((item) => {
                //     return _model.includes(item)
                // })
                // if (result.length > 0) {
                //     console.log(result)
                //     _model.push(result);
                //     writeToLocalStorage(result);
                // }

                //  _view.render(_model);
                return
            }
            const result = confirm('You should login first.');
            if (result) window.document.location.href = data.url;
        });
})

_view.addEventListener('upload', () => {
    // const result = confirm('Upload data ?');
    // if (result) {
    const token = read_token();
    console.log(_model)
    fetch('/todos', {
        method: 'POST',
        headers: { 'authentication': token, 'Content-Type': 'application/json' },
        body: JSON.stringify(_model),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                console.log(data)
                return
            }
            const result = confirm('You should login first.');
            if (result) window.document.location.href = data.url;
        })
    // }
})

_view.addEventListener('login', () => {
    window.document.location.href = '/signin';
})

_view.addEventListener('logout', () => {
    const name = localStorage.getItem('name');
    const result = window.confirm(name + ' , Do you want to logout ?');

    if (result) {
        localStorage.setItem('token', undefined);
        localStorage.setItem('status', 'guest');
        localStorage.setItem('name', undefined);
        localStorage.setItem('username', undefined);

        _view.setName('Guest');
        _view.changeButton('logout');
    }
})

_view.addEventListener('signup', () => {
    window.document.location.href = '/signup';
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
    const status = localStorage.getItem('status');

    if (model) _model.push(...model);
    if (status == 'login') {
        _view.setName(localStorage.getItem('name'));
        _view.changeButton('login')
    }
    else _view.setName('Guest')
})()




