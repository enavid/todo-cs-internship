const { readFile } = require('./utils/readFile');
const _model = require('./model');
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
    res.end(JSON.stringify(_model));
}

function postTodos(request, response) {
    var dataBuffer = [];

    request.on('data', (chunk) => {
        dataBuffer = dataBuffer + chunk;
    });

    request.on('end', () => {
        fs.writeFile(todosPath, dataBuffer, () => {
            response.writeHead(200, { 'Content-Type': 'text/json' });
            response.end();
        });

    });
}

module.exports = { staticFiles, getTodos, postTodos };

