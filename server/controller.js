const model = require('./model')

function getTodos(req, res) {
    res.json(model);
}

function postTodos(req, res) {
    if (req.body.lenght === 0) {
        return res.status(400).json({
            error: 'Bad request !'
        })
    }

    req.body.forEach(todo => model.push(todo))
    res.json({ 'response': 'Todos save successfully !' });
}

module.exports = {
    getTodos,
    postTodos,
}