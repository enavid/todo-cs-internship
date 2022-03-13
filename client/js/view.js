const _get = document.getElementById.bind(document);
const _addButton = _get('addButton');
const _textField = _get('textField');
const _list = _get('list');
const _buttons = _get('buttons');
const _eventHandler = {};

//================================ view API ===========================

export default { render, renderSingleItem, addEventListener };

//=========================== view event listener ====================
_addButton.addEventListener('click', (e) => {
    e.preventDefault();
    const value = { "value": _textField.value, "complete": false };
    _textField.value = '';
    _textField.focus();
    if (_eventHandler['addButton']) _eventHandler['addButton'](value);
})

_buttons.addEventListener('click', (e) => {
    e.preventDefault();
    const event = e.target.getAttribute('value');
    if (event === 'All' && _eventHandler['allButton']) _eventHandler['allButton'](e);
    if (event === 'Active' && _eventHandler['activeButton']) _eventHandler['activeButton'](e);
    if (event === 'Complete' && _eventHandler['completeButton']) _eventHandler['completeButton'](e);
    if (event === 'Upload' && _eventHandler['upload']) _eventHandler['upload']();
    if (event === 'Download' && _eventHandler['download']) _eventHandler['download']();
    if (event === 'signup' && _eventHandler['signup']) _eventHandler['signup']();
    if (event === 'signin' && _eventHandler['signin']) _eventHandler['signin']();
})

//=========================== Define view function ===================

function addEventListener(option, callBack) {
    _eventHandler[option] = callBack;
}

function render(todos) {
    _list.innerHTML = ' ';
    todos.forEach(element => _list.prepend(creatItem(element)));
}

function renderSingleItem(todo) {
    _list.prepend(creatItem(todo))
}

function renderEditInput(item) {
    [...item.children].forEach(element => {
        element.style.display = element.style.display === 'none' ? 'flex' : 'none';
    })
}

function creatItem(todo) {

    const create = document.createElement.bind(document);
    const li = create('li');

    // create input section 
    const todoText = create('p');
    const trash = create('img');
    const span1 = create('span');
    const span2 = create('span');
    const checkbox = create('input');
    const penEditButton = create('i');
    const getInput = create('span');

    span1.setAttribute('id', 'ul-1');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('value', 'checkBox');
    checkbox.checked = todo.complete;
    checkbox.addEventListener('click', () => {
        if (_eventHandler['checkBox']) _eventHandler['checkBox'](todo);
    });

    span1.appendChild(checkbox);
    todoText.innerHTML = todo.value;
    todoText.className = todo.complete ? 'complete' : 'incomplete';
    span1.appendChild(todoText);
    getInput.appendChild(span1);
    getInput.setAttribute('id', 'getInput');

    span2.setAttribute('id', 'ul-2');
    trash.setAttribute('src', './public/icon/trash.png');
    trash.setAttribute('alt', 'trash');
    trash.setAttribute('value', 'trash');
    trash.addEventListener('click', () => {
        if (_eventHandler['trash']) _eventHandler['trash'](todo);
    })

    penEditButton.className = "fa fa-pencil";
    penEditButton.setAttribute('value', 'penEdit');
    penEditButton.addEventListener('click', () => {
        renderEditInput(li);
    })

    span2.appendChild(penEditButton);
    span2.appendChild(trash);
    getInput.appendChild(span2);

    // create edit section
    const inputEdit = create('input');
    const checkEditButton = create('p');
    const closeEditButton = create('p');
    const confirmSpan = create('span');
    const editSpan = create('span');

    editSpan.id = 'edit';
    checkEditButton.innerHTML = "&#10004;";
    checkEditButton.setAttribute('value', 'check');
    checkEditButton.addEventListener('click', () => {
        const event = { todo, 'update': inputEdit.value };
        if (_eventHandler['check']) _eventHandler['check'](event);
    })

    closeEditButton.innerHTML = "&#10008;";
    closeEditButton.setAttribute('value', 'close');
    closeEditButton.addEventListener('click', () => {
        renderEditInput(li);
    })

    confirmSpan.appendChild(closeEditButton);
    confirmSpan.appendChild(checkEditButton);
    confirmSpan.id = 'confirmEdit';

    inputEdit.className = 'inputEdit';
    inputEdit.value = todo.value;

    editSpan.appendChild(inputEdit);
    editSpan.appendChild(confirmSpan);
    editSpan.style.display = 'none';

    li.appendChild(editSpan);
    li.appendChild(getInput);

    //================================ Module AIP===========================
    return li;
}
