const express = require('express');
const todoRouter = express.Router();
const controller = require('./controller');

todoRouter.get('/', controller.getTodos);
todoRouter.post('/', controller.postTodos);

module.exports = todoRouter;