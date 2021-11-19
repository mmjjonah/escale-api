"use strict"
const pdf = require('html-pdf')
const fs = require("fs");

function htmlToPdf(htmlContent, options = {
	path: 'uploads/',
	output: 'B', // 'F' (File), 'B' (Buffer), 'D' (Download)
	format: 'A4'
}) {
	return new Promise(((resolve, reject) => {
		const pdfOptions = {
			format: options.format,
			border: {
				top: "10mm",
				right: "15mm",
				bottom: "10mm",
				left: "15mm"
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
