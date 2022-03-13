const { readFile } = require('./utils/readFile');
const fs = require('fs');
const path = require('path');
const db = require('./model')

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
    res.setHeader('Content-Type', 'application/json');
    fs.readFile(todosPath, (error, data) => {
        if (error) {
            res.write('[]')
            res.end();
        } else {
            res.writeHead(200);
            res.write(data);
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
                'tocken': 'abcdefg',
                'todos': []
            }

            db.read_data((res, err) => {
                user.id = res.length + 1;
                res.push(user);
                db.write_data(res)


                db.read_data((res, err) => {

                    console.log(res)
                });
            });

        }
    })
}

module.exports = {
    staticFiles,
    getTodos,
    postTodos,
    signin,

    signup,
    signupHandler,
};

