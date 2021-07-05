const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');
const tokenHelper = require('../helpers/tokenHelper')

const checkToken = (req, res, next) => {
    let token = tokenHelper.extractTokenFromHeader(req)

    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
                return res.status(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED).json({
                    status: StatusCodes.NETWORK_AUTHENTICATION_REQUIRED,
                    message: 'Token invalid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED).json({
            status: StatusCodes.NETWORK_AUTHENTICATION_REQUIRED,
            message: "Le token d'authentification n'est pas fourni."
        });
    }
};

module.exports = {
    checkToken
}
