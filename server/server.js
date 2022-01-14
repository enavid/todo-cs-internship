const express = require('express');
const path = require('path');

const todoRouter = require('./routes');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl} ${req.url} ${delta}ms`);

})

app.use(express.json())

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/todos', todoRouter)

app.listen(PORT, () => {
    console.log(`listening on ${PORT}...`)
});