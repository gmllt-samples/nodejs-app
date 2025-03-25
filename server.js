const http = require('http');
const { handleRequest } = require('./handler');

function startServer() {
    const port = process.env.PORT || 8080;

    const server = http.createServer((req, res) => {
        handleRequest(req, res);
    });

    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

module.exports = { startServer };
