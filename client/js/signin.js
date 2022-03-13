const _get = document.getElementById.bind(document);


const _login = _get('login');
const _password = _get('password');
const _username = _get('username');



_login.addEventListener('click', (e) => {
    e.preventDefault();

    console.log(_password.value)
    console.log(_username.value)


    fetch('/signin', {
        method: 'POST',
        body: JSON.stringify({
            'username': _username.value,
            'password': _password.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(function (response) {
        if (response.ok) {
            console.log('yessss')
        }
    })

})

