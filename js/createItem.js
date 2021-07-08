const createItem = function () {
    const create = document.createElement.bind(document);

    const createLi = function (todo, eventListener) {
        const li = create('li');
        const todoText = create('p');
        const trash = create('img');
        const span1 = create('span');
        const span2 = create('span');
        const editSpan = create('span');
        const checkbox = create('input');
        const confirmSpan = create('span');
        const inputEdit = create('input');
        const penEditButton = create('i');
        const checkEditButton = create('p');
        const closeEditButton = create('p');

        span1.id = 'ul-1';
        checkbox.type = 'checkbox';
        checkbox.checked = todo.complete;
        checkbox.addEventListener('click', () => {
            if (isFunction(eventListener.checkBox)) { eventListener.checkBox({ todo, p }) }
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
            inputEdit.value = todo.value;
            if (isFunction(eventListener.edit)) { eventListener.edit({ 'event': 'edit', 'tag': li }); }
        })

        //========================== create Edit Input ======================

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
        editSpan.appendChild(inputEdit);
        editSpan.appendChild(confirmSpan);
        editSpan.style.display = 'none';

        span2.appendChild(penEditButton);
        span2.appendChild(trash);
        li.appendChild(span2);
        li.appendChild(editSpan)

        return li;

    }

    // =============================== define function =====================
    function isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
    //================================ module AIP===========================
    return {
        createLi,
    }

}