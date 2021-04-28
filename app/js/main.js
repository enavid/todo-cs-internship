const todo = [];
const get = document.getElementById.bind(document);
const create = document.createElement.bind(document);
const addButton = get('addButton');
const textField = get('textField');
const section = get('test');
//var create = document.createElement.bind(document);


addButton.addEventListener("click", (e) => {
    e.preventDefault();

    const div = create('div');
    const p = create('p');
    const value = textField.value;

    div.setAttribute("class", "todos");
    p.innerText = value;
    div.appendChild(p);

    section.prevent(div);

})
