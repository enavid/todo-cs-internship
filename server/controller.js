const { readFile } = require('./utils/readFile');
const fs = require('fs');
const path = require('path');
const db = require('./model')

//check double username
// add jwt
// error handler
// check return tocke to client in signinHandler function

const todosPath = path.join(__dirname, '/model.json')

function staticFiles(req, res) {
    const url = req.url === '/' ? '/index.html' : req.url;

    readFile(url, (error, data) => {

        if (error) {
            res.writeHead(404);
            res.write('Not found error 404');
            return res.end()
        }

        if (req.url.includes('js')) res.setHeader('Content-Type', 'application/javascript');
        if (req.url.includes('css')) res.setHeader('Content-Type', 'text/css');
        if (req.url.includes('html')) res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.write(data);
        res.end();
    });
}

//Fix this funtion
function getTodos(req, res) {

    console.log(req.headers.authentication);
    res.setHeader('Content-Type', 'application/json');
    fs.readFile(todosPath, (error, data) => {
        if (error) {
            res.write('[]')
            res.end();
        } else {
            res.writeHead(200);
            res.write(data);
            // console.log('navid', data.toString('utf-8'))
            res.end();
        }
    })
    // res.end(JSON.stringify(_model));
}
//Fix this funtion
function postTodos(req, res) {
    var dataBuffer = [];

    req.on('data', (chunk) => {
        dataBuffer = dataBuffer + chunk;
    });

    req.on('end', () => {
        fs.writeFile(todosPath, dataBuffer, () => {
            res.writeHead(200, { 'Content-Type': 'text/json' });
            res.end();
        });

    });
}

function signin(req, res) {
    const url = req.url === '/signin' ? '/signin.html' : req.url;

    readFile(url, (error, data) => {

        if (error) {
            res.writeHead(404);
            res.write('Not found error 404');
            return res.end()
        }

        if (req.url.includes('js')) res.setHeader('Content-Type', 'application/javascript');
        if (req.url.includes('css')) res.setHeader('Content-Type', 'text/css');
        if (req.url.includes('html')) res.setHeader('Content-Type', 'text/html');

        res.writeHead(200);
        res.write(data);
        res.end();
    });
}

function signinHandler(req, res) {
    var data;

    req.on('data', (chunk) => {
        data = JSON.parse(chunk.toString('utf-8'));
    });

    req.on('end', () => {

        if (data.username !== '' && data.password !== '') {
            const username = data.username;
            const password = data.password;
            response = {
                'name': '',
                'username': '',
                'status': 'fail',
                'token': ''
            }

            db.read_data((data, err) => {
                data.forEach((element) => {
                    if (element.username !== username && element.password !== password) return

                    token = makeToken();
                    element.token = token;
                    console.log(token)

                    response.name = element.name;
                    response.username = element.username;
                    response.status = 'success';
                    response.token = token;
                })

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(response));
            });


        }
    })
}

function signup(req, res) {
    const url = req.url === '/signup' ? '/signup.html' : req.url;

    readFile(url, (error, data) => {

        if (error) {
            res.writeHead(404);
            res.write('Not found error 404');
            return res.end()
        }

        if (req.url.includes('js')) res.setHeader('Content-Type', 'application/javascript');
        if (req.url.includes('css')) res.setHeader('Content-Type', 'text/css');
        if (req.url.includes('html')) res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.write(data);
        res.end();
    });
}

function signupHandler(req, res) {
    var data;

    req.on('data', (chunk) => {
        data = JSON.parse(chunk.toString('utf-8'));
    });

    req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end();

        if (data.username !== '' || data.password !== '') {

            const user = {
                'id': '0',
                'name': data.name,
                'username': data.username,
                'password': data.password,
                'token': '',
                'todos': []
            }

            db.read_data((res, err) => {
                user.id = res.length + 1;
                res.push(user);
                db.write_data(res);
            });

        }
    })
}

function makeToken(length = 40) {
    var result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

module.exports = {
    staticFiles,
    getTodos,
    postTodos,
    signin,
    signinHandler,
    signup,
    signupHandler,
};

