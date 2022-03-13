const { readFile } = require('./utils/readFile');
const fs = require('fs');
const path = require('path');

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
    console.log('navid sadeghi')
    // res.writeHead(301, { Location: 'http://w3docs.com' });
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

module.exports = {
    staticFiles,
    getTodos,
    postTodos,
    signin,
};

