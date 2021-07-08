view = (function (module) {

    const get = document.getElementById.bind(document);
    const addButton = get('addButton');
    const textField = get('textField');

    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        const value = { "value": textField.value, "complete": false };
        textField.value = '';
        ul.prepend(module.createItem(value));


        todo.push(value);

    })
})(module);

