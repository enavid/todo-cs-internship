const readFile = require('./utils/readFile');

function staticFiles(req, res) {
    const url = req.url === '/' ? '/index.html' : req.url;

    readFile(url, (error, data) => {

        if (error) {
            res.writeHead(404);
            res.write('Not found error 404');
            return res.end()
        }

        if (req.url.includes('js')) res.setHeader('Content-Type', 'application/javascript');
        res.writeHead(200);
        res.write(data);
        res.end();
    });
}

module.exports = { staticFiles };