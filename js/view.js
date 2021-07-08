view = (function () {

    const get = document.getElementById.bind(document);
    const addButton = get('addButton');
    const textField = get('textField');
    const list = get('list');
    const item = createItem();
    var control;
    const init = function (module) {
        control = module;
    }
    //=========================== view event listener ====================
    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        const value = { "value": textField.value, "complete": false };
        textField.value = '';
        list.prepend(item.createLi(value, { checkBox, trash, edit }));
        control.addItem(value);
    })

    //=========================== define view function ===================
    function render(todos) {
        list.innerHTML = '';
        todos.forEach(element => {
            list.prepend(item.createLi(element, { checkBox, trash, edit }));
        });
    }

    function renderEditInput(item) {
        [...item.data.children].forEach(element => {
            element.style.display = element.style.display ===
                'none' ? 'flex' : 'none';
        })
    }

    function checkBox(element) {
        control.toggleComplete(element.todo);
        element.p.setAttribute('class',
            element.todo.complete ? 'complete' : 'incomplete'
        );
    }

    function trash(element) {
        control.removeItem(element.todo);
    }

    function edit(element) {
        console.log(element)
        renderEditInput(element)

        function check(item) {
            console.log(item.input.value);
        }

        function close(item) {
            console.log(item.input.value);
            displayEditInput(element, 'flex')
        }
    }
    //================================ view AIP===========================
    return { init, render }
})();

