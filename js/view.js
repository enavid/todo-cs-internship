view = (function () {

    const get = document.getElementById.bind(document);
    const addButton = get('addButton');
    const textField = get('textField');
    var control;
    const init = function (module) {
        control = module;
    }

    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        const value = { "value": textField.value, "complete": false };
        textField.value = '';
        ul.prepend(module.createItem(value));
        control.addTodos(value);
    })

    //================================ view AIP===========================
    return { init }
})();

