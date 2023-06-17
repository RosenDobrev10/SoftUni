const fs = require('fs');

function createImage(req, res) {
	const data = [];

	req.on('data', (chunk) => data.push(chunk));
	req.on('end', async () => {
		const body = data.join('');

		const lineIndex = body.indexOf('\n');
		const divider = body.slice(0, lineIndex).trim();
		const fileData = body.slice( lineIndex, body.indexOf(divider, lineIndex),
		);

		const pattern = /filename="(.+)"/;
		const filename = pattern.exec(fileData)[1];

		const windowsPattern = /\r\n\r\n/;
		const linuxPattern = /\n\n/;

		let match = windowsPattern.exec(fileData);
		if (match == null) {
			match = linuxPattern.exec(fileData);
		}

		if (match) {
			const file = fileData.slice(match.index).trim();
			const prefix = (('00000' + Math.random() * 999999) | 0).slice(-5);
			await fs.writeFile(`./img/${prefix}_${filename}`, file);
		}

		res.writeHead(301, {
			Location: '/',
		});
		res.end();
	});
}

module.exports = {
	createImage,
};
