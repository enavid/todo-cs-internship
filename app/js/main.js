const todo = [];
const addButton = document.getElementById('addButton');
const textField = document.getElementById('textField')

addButton.addEventListener("click", () => {
    let value = textField.value;
    alert(value);
})
