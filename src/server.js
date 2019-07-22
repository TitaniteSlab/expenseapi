import './config.js';

import config from './config.js';
import app from './app';

// Get port from environment and store in Express.
let port = normalizePort(config.PORT || '8082');
app.set('port', port);

// Listen
let server = app.listen(port);
server.on('listening', onListening);
server.on('error', onError);

// Normalize a port into a number, string, or false.
function normalizePort(val) {
	let port = parseInt(val, 10);
	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}
	let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
	// handle specific listen errors with friendly messages
	switch (error.code) {
	case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
	case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		break;
	default:
		throw error;
	}
}

// Event listener for HTTP server "listening" event.
function onListening() {
	let addr = server.address();
	let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	console.info('Listening on ' + bind);
	app.emit('started');
}

export default app;