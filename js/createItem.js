const createItem = function () {
    const create = document.createElement.bind(document);

    const listItem = function (todo, eventListener) {
        const li = create('li');
        const todoText = create('p');
        const trash = create('img');
        const span1 = create('span');
        const span2 = create('span');
        const checkbox = create('input');
        const penEditButton = create('i');


        span1.setAttribute('id', 'ul-1');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checke = todo.complete;
        checkbox.addEventListener('click', () => {
            if (isFunction(eventListener.checkBox)) { eventListener.checkBox({ todo, todoText }) }
        });
        span1.appendChild(checkbox);
        todoText.innerHTML = todo.value;
        todoText.className = todo.complete ? 'complete' : 'incomplete';
        span1.appendChild(todoText);
        li.appendChild(span1);

        span2.setAttribute('id', 'ul-2');
        trash.setAttribute('src', './public/icon/trash.png');
        trash.setAttribute('alt', 'trash');

        trash.addEventListener('click', () => {
            if (isFunction(eventListener.trash)) { eventListener.trash({ todo }) }
        })
        penEditButton.className = "fa fa-pencil";
        penEditButton.addEventListener('click', () => {
            if (isFunction(eventListener.edit)) { eventListener.edit({ 'event': 'edit', 'tag': li }); }
        })

        //========================== Create Edit Input ======================
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
            const event = e.target.getAttribute('value');
            if (isFunction(eventListener.edit)) { eventListener.edit({ 'event': event, 'tag': li, 'input': inputEdit, todo }) }
        })

        inputEdit.className = 'inputEdit';
        inputEdit.value = todo.value;

        editSpan.appendChild(inputEdit);
        editSpan.appendChild(confirmSpan);
        editSpan.style.display = 'none';

        //========================== Add item to List =======================
        span2.appendChild(penEditButton);
        span2.appendChild(trash);
        li.appendChild(span2);
        li.appendChild(editSpan);
        return li;
    }

    // =============================== Define function =====================
    function isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
    //================================ Module AIP===========================
    return {
        listItem,
    }

}