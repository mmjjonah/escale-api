const jwt = require('jsonwebtoken');
const {StatusCodes} = require("http-status-codes");

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
                return res.status(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED).json({
                    success: false,
                    message: 'Token invalide'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED).json({
            success: false,
            message: "Le token d'authentification n'est pas fourni"
        });
    }
};

module.exports = {
    checkToken
}
