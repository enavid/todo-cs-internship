const _get = document.getElementById.bind(document);

const form = _get('form');
const name = _get('name');
const username = _get('username');
const email = _get('email');
const password = _get('password');
const password2 = _get('password2');

//Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([name, username, email, password, password2]);
    const check1 = checkLength(username, 3, 15);
    const check2 = checkLength(password, 6, 25);
    const check3 = checkEmail(email);
    const check4 = checkPasswordsMatch(password, password2);

    const check = check1 && check2 && check3 && check4;

    if (check) {

        const user = {
            'name': name.value,
            'username': username.value,
            'email': email.value,
            'password': password.value,
        }

        sendData(user, (data) => {
            if (data.status) {
                const result = window.confirm('User created successfully. You want login in ?');
                if (result) window.document.location.href = data.url;
                return
            }
            window.alert(data.response);
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

//Check email is valid
function checkEmail(input) {
    const result = String(input.value.trim())
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    if (result) {
        showSuccess(input);
        return true;
    }
    else {
        showError(input, 'Email is not valid');
        return false;
    }
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

//Check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
        return false;
    }
    return true;
}

//Send data to server
function sendData(data, callBack) {

    fetch('/signup', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then((data) => callBack(data))
}
