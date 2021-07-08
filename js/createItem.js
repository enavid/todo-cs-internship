const createItem = function () {
    const create = document.createElement.bind(document);

    const createLi = function (todo, eventListener) {
        const li = create('li');
        const p = create('p');
        const trash = create('img');
        const span1 = create('span');
        const span2 = create('span');
        const editSpan = create('span');
        const checkbox = create('input');
        const i = create('i');
        const confirmSpan = create('span');
        const editInput = create('input');
        const check = create('p');
        const close = create('p');

        span1.id = 'ul-1';
        checkbox.type = 'checkbox';
        checkbox.checked = todo.complete;
        checkbox.addEventListener('click', () => {
            if (isFunction(eventListener.checkBox)) { eventListener.checkBox({ todo, p }) }
        });
        span1.appendChild(checkbox);
        p.innerHTML = todo.value;
        p.className = todo.complete ? 'complete' : 'incomplete';
        span1.appendChild(p);
        li.appendChild(span1);

        span2.id = 'ul-2';
        trash.src = './public/icon/trash.png';
        trash.alt = 'trash';
        trash.addEventListener('click', () => {
            if (isFunction(eventListener.trash)) { eventListener.trash({ todo }) }
        })
        i.className = "fa fa-pencil";
        i.addEventListener('click', () => {
            editInput.value = todo.value;
            if (isFunction(eventListener.edit)) { eventListener.edit({ 'event': 'edit', 'tag': li }); }
        })

        //========================== create Edit Input ======================

        editSpan.id = 'edit';
        check.innerHTML = "&#10004;";
        close.innerHTML = "&#10008;";

        check.addEventListener('click', () => {
            if (isFunction(eventListener.edit)) { eventListener.edit({ 'event': 'check', 'tag': li, 'input': editInput, todo }) }
        })
        close.addEventListener('click', () => {
            if (isFunction(eventListener.edit)) { eventListener.edit({ 'event': 'close', 'tag': li, 'input': editInput, todo }) }
        })

        confirmSpan.appendChild(close);
        confirmSpan.appendChild(check);
        confirmSpan.id = 'confirmEdit';

        editInput.className = 'editInput';
        editSpan.appendChild(editInput);
        editSpan.appendChild(confirmSpan);
        editSpan.style.display = 'none';

        span2.appendChild(i);
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