const { createReadStream, promises: fs } = require('fs');

async function homePage(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html',
	});
	const layout = await fs.readFile('./static/index.html');
	res.write(layout.toString().replace('<%%imageboard%%>', await getImageList()),);
	res.end();
}

function sendFile(req, res) {
	if (req.url == '/style.css') {
		res.writeHead(200, {
			'Content-Type': 'text/css',
		});
		createReadStream('./static/style.css').pipe(res);
	} else {
		const filename = '.' + req.url;
		createReadStream(filename).pipe(res);
	}
}

async function getImageList() {
	const files = await fs.readdir('./img');
	return `<ul>${files.map(imageCard)}</ul>`;
}

function imageCard(imgName) {
	return `<li><img src="./img/${imgName}"></li>`;
}

module.exports = {
	homePage,
	sendFile,
};
