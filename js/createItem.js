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


        span1.id = 'ul-1';
        checkbox.type = 'checkbox';
        checkbox.checked = todo.complete;
        checkbox.addEventListener('click', () => {
            if (isFunction(eventListener.checkBox)) { eventListener.checkBox({ todo, todoText }) }
        });
        span1.appendChild(checkbox);
        todoText.innerHTML = todo.value;
        todoText.className = todo.complete ? 'complete' : 'incomplete';
        span1.appendChild(todoText);
        li.appendChild(span1);

        span2.id = 'ul-2';
        trash.src = './public/icon/trash.png';
        trash.alt = 'trash';
        trash.addEventListener('click', () => {
            if (isFunction(eventListener.trash)) { eventListener.trash({ todo }) }
        })
        penEditButton.className = "fa fa-pencil";
        penEditButton.addEventListener('click', () => {
            if (isFunction(eventListener.edit)) { eventListener.edit({ 'event': 'edit', 'tag': li }); }
        })

        //========================== create Edit Input ======================
        const inputEdit = create('input');
        const checkEditButton = create('p');
        const closeEditButton = create('p');
        const confirmSpan = create('span');
        const editSpan = create('span');

        editSpan.id = 'edit';
        checkEditButton.innerHTML = "&#10004;";
        closeEditButton.innerHTML = "&#10008;";

        checkEditButton.addEventListener('click', () => {
            if (isFunction(eventListener.edit)) { eventListener.edit({ 'event': 'check', 'tag': li, 'input': inputEdit, todo }) }
        })
        closeEditButton.addEventListener('click', () => {
            if (isFunction(eventListener.edit)) { eventListener.edit({ 'event': 'close', 'tag': li, 'input': inputEdit, todo }) }
        })

        confirmSpan.appendChild(closeEditButton);
        confirmSpan.appendChild(checkEditButton);
        confirmSpan.id = 'confirmEdit';

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

    // =============================== define function =====================
    function isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
    //================================ module AIP===========================
    return {
        listItem,
    }

}