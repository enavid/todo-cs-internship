const _get = document.getElementById.bind(document);


const _login = _get('login');
const _password = _get('password');
const _username = _get('username');
const _name = _get('name');



_login.addEventListener('click', (e) => {
    e.preventDefault();

    fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({
            'name': _name.value,
            'username': _username.value,
            'password': _password.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                console.log(data)
                const result = window.confirm('User created successfully. You want login in ?');
                if (result) return window.document.location.href = data.url;
            }

        })

})

