const app = require('../app');
const http = require('http');

/**
 * Retrieves the port number from the environment variables or defaults to 3000.
 * @constant {number} port
 */
const port = process.env.PORT || 3000;
app.set('port', port);

/**
 * Creates an HTTP server instance using the Express app.
 * @constant {http.Server} server
 */
const server = http.createServer(app);

/**
 * Starts the HTTP server and listens on the defined port.
 */
server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
