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
    const value = textField.value;

    p.innerHTML = value;
    li.appendChild(p);
    ul.prepend(li);

})
