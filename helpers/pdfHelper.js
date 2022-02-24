"use strict"
const pdf = require('html-pdf')
const fs = require("fs");
const path = require('path');

function htmlToPdf(htmlContent, options = {
	path: 'uploads/',
	output: 'B', // 'F' (File), 'B' (Buffer), 'D' (Download)
	format: 'A4'
}) {
	return new Promise(((resolve, reject) => {
		const pdfOptions = {
			phantomPath: path.resolve("/bin/phantomjs"),
			format: options.format,
			border: {
				top: "4mm",
				right: "6mm",
				bottom: "4mm",
				left: "6mm"
			},
		};

		switch (options.output) {
			case 'B':
				pdf.create(htmlContent, pdfOptions).toStream(function(err, stream) {
					if (err) {
						reject(err)
					} else {
						resolve(fs.readFileSync(stream.path, {encoding: 'base64'}))
					}
				})
				break
			case 'F':
				pdf.create(htmlContent, pdfOptions).toFile(options.path, function(err, filePath) {
					if (err) {
						reject(err)
					} else {
						resolve(filePath)
					}
				})
				break
			case 'D':
				pdf.create(htmlContent).toStream(function(err, stream){
					stream.pipe(fs.createWriteStream(options.path + 'foo.pdf'));
				});
				break
		}

	}))
}

module.exports = {
	htmlToPdf
}
