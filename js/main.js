const todo = [];
const get = document.getElementById.bind(document);
const create = document.createElement.bind(document);
const addButton = get('addButton');
const textField = get('textField');
const ul = get('ul');

addButton.addEventListener("click", (e) => {
    e.preventDefault();

    const li = create('li');
    const p = create('p');
    const trash = create('img');
    const span1 = create('span');
    const span2 = create('span');
    const input = create('input');
    const value = textField.value;

    span1.setAttribute('id', 'ul-1');
    input.setAttribute('type', 'checkbox');
    span1.appendChild(input);
    p.innerHTML = value;
    span1.appendChild(p);
    li.appendChild(span1);

    span2.setAttribute('id', 'ul-2');
    trash.setAttribute('src', './public/icon/trash.png');
    trash.setAttribute('alt', 'trash');
    span2.appendChild(trash);
    li.appendChild(span2);

    ul.prepend(li);
    textField.value = '';

})
