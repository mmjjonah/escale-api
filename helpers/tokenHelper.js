"use strict"
const config = require('../config/config')

function extractTokenFromHeader(request) {
	const token = request.headers['x-access-token'] || request.headers['authorization']; // Express headers are auto converted to lowercase
	if (token && token.startsWith(config.authPrefix)) {
		// Remove Bearer from string
		return token.slice(7, token.length);
	}
	return false
}

module.exports = {
	extractTokenFromHeader
}
