const express = require('express');

const databaseConfig = require('./config/databaseConfig.js');
const expressConfig = require('./config/expressConfig.js');
const routes = require('./config/routes.js');

async function start() {
	const app = express();

	await databaseConfig(app);
	expressConfig(app);
	routes(app);

	app.listen(3000, () => console.log('Server is running on port 3000...'));
}

start();
