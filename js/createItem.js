const module = (function () {
    const create = document.createElement.bind(document);

    const createItem = function (value) {
        const li = create('li');
        const p = create('p');
        const trash = create('img');
        const span1 = create('span');
        const span2 = create('span');
        const input = create('input');
        const i = create('i');

        span1.setAttribute('id', 'ul-1');
        input.setAttribute('type', 'checkbox');
        span1.appendChild(input);
        p.innerHTML = value;
        span1.appendChild(p);
        li.appendChild(span1);

        span2.setAttribute('id', 'ul-2');
        trash.setAttribute('src', './public/icon/trash.png');
        trash.setAttribute('alt', 'trash');
        i.setAttribute('class', "fa fa-pencil");
        span2.appendChild(i);
        span2.appendChild(trash);
        li.appendChild(span2);

        console.log('work');
        return li;

    }

    return {
        createItem,
    }

})()