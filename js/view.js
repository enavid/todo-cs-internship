const _get = document.getElementById.bind(document);
const _addButton = _get('addButton');
const _textField = _get('textField');
const _list = _get('list');
const _buttons = _get('buttons');
var _handleEventListener;

//================================ view API ===========================

export default { render, renderSingleItem, addEventListener };

//=========================== view event listener ====================
_addButton.addEventListener('click', (e) => {
    e.preventDefault();
    const value = { "value": _textField.value, "complete": false };
    _textField.value = '';
    e.todo = value;
    _handleEventListener(e);
    _textField.focus();
})

_buttons.addEventListener('click', (e) => {
    e.preventDefault();
    _handleEventListener(e);
})

//=========================== Define view function ===================
function createListItem(todo, eventListener) {

    const _li = createLi();
    const _editInput = editInput(todo, (e) => {
        e.li = _li;
        eventListener(e);
    });
    const _getInput = getInput(todo, (e) => {
        e.li = _li;
        eventListener(e);
    });

    _li.appendChild(_editInput);
    _li.appendChild(_getInput);

    // =============================== Define function =====================
    function createLi() {
        const create = document.createElement.bind(document);
        const li = create('li');
        return li;
    }

    function getInput(todo, eventListener) {
        const create = document.createElement.bind(document);
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
        checkbox.addEventListener('click', (e) => {
            e.todoText = todoText;
            eventListener(e);
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

        span2.addEventListener('click', (e) => {
            e.preventDefault();
            eventListener(e);
        })

        penEditButton.className = "fa fa-pencil";
        penEditButton.setAttribute('value', 'penEdit')
        span2.appendChild(penEditButton);
        span2.appendChild(trash);
        getInput.appendChild(span2);

        return getInput;
    }

    function editInput(todo, eventListener) {
        const create = document.createElement.bind(document);
        const inputEdit = create('input');
        const checkEditButton = create('p');
        const closeEditButton = create('p');
        const confirmSpan = create('span');
        const editSpan = create('span');

        editSpan.id = 'edit';
        checkEditButton.innerHTML = "&#10004;";
        checkEditButton.setAttribute('value', 'check');
        closeEditButton.innerHTML = "&#10008;";
        closeEditButton.setAttribute('value', 'close');

        confirmSpan.appendChild(closeEditButton);
        confirmSpan.appendChild(checkEditButton);
        confirmSpan.id = 'confirmEdit';

        confirmSpan.addEventListener('click', (e) => {
            e.preventDefault();
            e.inputEdit = inputEdit;
            eventListener(e);
        })

        inputEdit.className = 'inputEdit';
        inputEdit.value = todo.value;

        editSpan.appendChild(inputEdit);
        editSpan.appendChild(confirmSpan);
        editSpan.style.display = 'none';

        return editSpan;
    }

    //================================ Module AIP===========================
    return _li;
}

function addEventListener(callBack) { _handleEventListener = callBack; }

function render(todos) {
    _list.innerHTML = ' ';
    todos.forEach(element => {
        _list.prepend(creatItem(element));
    });
}

function renderSingleItem(todo) { _list.prepend(creatItem(todo)) }

function creatItem(todo) {
    return createListItem(todo, (e) => {
        e.todo = todo;
        _handleEventListener(e);
        const event = e.target.getAttribute('value');

        if (event === 'checkBox') return e.todoText.className = todo.complete ? 'complete' : 'incomplete';

        if (event === 'penEdit') return renderEditInput(e.li);

        if (event === 'close') return renderEditInput(e.li);
    });
}

function renderEditInput(item) {
    [...item.children].forEach(element => {
        element.style.display = element.style.display === 'none' ? 'flex' : 'none';
    })
}

