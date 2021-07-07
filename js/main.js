const todo = [];
const get = document.getElementById.bind(document);

const addButton = get('addButton');
const textField = get('textField');


addButton.addEventListener("click", (e) => {
    e.preventDefault();


    const value = textField.value;
    ul.prepend(module.createItem(value));

    textField.value = '';

})
