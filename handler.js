const url = require('url');
const { parseParam } = require('./paramParser');
const { logJson } = require('./logger');

function handleRequest(req, res) {
    const parsed = url.parse(req.url, true);

    if (parsed.pathname !== '/') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
        return;
    }

    const query = parsed.query;
    const wait = parseParam(query.wait || '0', 'float', 0.0);
    const status = parseParam(query.status || '200', 'int', 200);
    const size = parseParam(query.response_size || '100', 'int', 100);

    setTimeout(() => {
        const payload = 'X'.repeat(size);
        const response = {
            status,
            wait,
            response_size: size,
            payload
        };

        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));

        logJson({
            timestamp: new Date().toISOString(),
            ip: req.socket.remoteAddress,
            method: req.method,
            path: req.url,
            params: query,
            status,
            wait,
            response_size: size
        });
    }, wait * 1000);
}

module.exports = { handleRequest };
