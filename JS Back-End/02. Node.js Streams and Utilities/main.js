const { homePage, sendFile } = require('./boardController.js');
const { createImage } = require('./createController.js');

function handleRequest(req, res) {
	let handler;

	if (req.method == 'GET') {
		if (req.url.slice(0, 4) === '/img' || req.url == '/style.css') {
			handler = sendFile;
		} else if (req.url == '/') {
			handler = homePage;
		}
	} else if (req.method == 'POST') {
		handler = createImage;
	}

	if (typeof handler == 'function') {
		handler(req, res);
	} else {
		res.writeHead(404);
		res.write('404 Not Found');
		res.end();
	}
}

module.exports = {
	handleRequest,
};
