const module = (function () {
    const create = document.createElement.bind(document);

    const createItem = function (todo) {
        const li = create('li');
        const p = create('p');
        const trash = create('img');
        const span1 = create('span');
        const span2 = create('span');
        const input = create('input');
        const i = create('i');

        span1.setAttribute('id', 'ul-1');
        input.setAttribute('type', 'checkbox');
        input.addEventListener('click', () => {
            todo.complete = !todo.complete;
            p.setAttribute('class',
                todo.complete ? 'complete' : 'incomplete'
            )
            console.log(todo)
        });
        span1.appendChild(input);
        p.innerHTML = todo.value;
        p.setAttribute('class', 'incomplete')
        span1.appendChild(p);
        li.appendChild(span1);

        span2.setAttribute('id', 'ul-2');
        trash.setAttribute('src', './public/icon/trash.png');
        trash.setAttribute('alt', 'trash');
        trash.addEventListener('click', () => {
            console.log('trash');
        })
        i.setAttribute('class', "fa fa-pencil");
        i.addEventListener('click', () => {
            console.log('edit');
        })
        span2.appendChild(i);
        span2.appendChild(trash);
        li.appendChild(span2);

        return li;

    }

    //================================ module AIP===========================
    return {
        createItem,
    }

})()