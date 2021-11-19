// In this module for Handle CRUD function. This project need get method.
function static(func, { req, res }) {
    if (req.method !== 'GET') return;
    func(req, res)
}

function get(url, func, { req, res }) {
    if (req.method !== 'GET') return;
    if (req.url === url) {
        func(req, res)
    }
}

module.exports = { static, get };