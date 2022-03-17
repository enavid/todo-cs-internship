const _get = document.getElementById.bind(document);

const form = _get('form');
const username = _get('username');
const password = _get('password');


//Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, password]);
    const check1 = checkLength(username, 3, 15);
    const check2 = checkLength(password, 6, 25);
    const check = check1 && check2;

    if (check) {

        const user = {
            'username': username.value,
            'password': password.value,
        }

        sendData(user, (data) => {
            if (data.status === 'success') {
                localStorage.setItem('token', data.token);
                localStorage.setItem('status', 'login');
                localStorage.setItem('name', data.name);
                localStorage.setItem('username', data.username);
                return window.document.location.href = '/index.html';
            }
            window.alert('Login fail :(')
        })
    }
})

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
//Check required fields
function checkRequired(inputArray) {
    inputArray.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        }
        else {
            showSuccess(input)
        }
    });
}

//Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        return false;
    }
    else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
        return false;
    }
    else {
        showSuccess(input);
        return true;
    }
}

//Send data to server
function sendData(data, callBack) {

    fetch('/signin', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then((data) => callBack(data))
}
