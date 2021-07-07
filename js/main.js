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
    const trash = create('img')
    const value = textField.value;

    trash.setAttribute('src', './public/icon/trash.png');
    trash.setAttribute('alt', 'trash');

    p.innerHTML = value;
    li.appendChild(p);
    li.appendChild(trash);
    ul.prepend(li);
    textField.value = '';

})
