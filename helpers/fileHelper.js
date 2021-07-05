"use strict"
const fs = require('fs')

function dataURLtoFile(base64Url, path, filename) {
	const regex = /^data:.+\/(.+);base64,(.*)$/;
	const matches = base64Url.match(regex);
	const ext = matches[1];
	const data = matches[2];
	const buffer = Buffer.from(data, 'base64');
	fs.writeFileSync(`${path}/${filename}`, buffer )
	return `${path}/${filename}`
}

module.exports = {
	dataURLtoFile
}
