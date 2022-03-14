const _get = document.getElementById.bind(document);


const _login = _get('login');
const _password = _get('password');
const _username = _get('username');



_login.addEventListener('click', (e) => {
    e.preventDefault();

    fetch('/signin', {
        method: 'POST',
        body: JSON.stringify({
            'username': _username.value,
            'password': _password.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log(data.username)
                localStorage.setItem('token', data.token);
                localStorage.setItem('name', data.name);
                localStorage.setItem('username', data.username);
                return window.document.location.href = '/index.html';
            }
            console.log(data.username)
            window.alert('Login fail :(')
        });


})

