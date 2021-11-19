const http = require('http');
const controller = require('./controller');
const routes = require('./utils/routes');

const server = http.createServer();
const PORT = 3000;


server.on('request', (req, res) => {
    routes.static(controller.staticFiles, { req, res });
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
});
