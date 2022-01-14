const model = require('./model')

function getTodos(req, res) {
    res.json(model);
}

function postTodos(req, res) {

}

module.exports = {
    getTodos,
    postTodos,
}