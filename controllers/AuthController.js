"use strict"

const express = require('express')
const {User} = require('../models')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { tokenExpiration } = require('../config/config')
const bcrypt = require('bcrypt')
const _c = require('../config/constant')

const router = express.Router()

router.post('/', async (req, res) => {
	const { login, password} = req.body

	const userData = await User.findOne({ where: { user_login: login, user_status: _c.status.ACTIVE } })
	if (userData) {
		let user = {
			user_password: '',
			user_id: '',
			user_login: '',
			user_lastname: '',
			user_firstname: '',
			user_group: ''
		}
		user = userData.toJSON()
		if (bcrypt.compareSync(password, user.user_password)) {
			delete user.user_password
			const token = jwt.sign(user, process.env.TOKEN_KEY, {
				expiresIn: tokenExpiration
			})

			res.json({
				data: {
					token,
					user
				},
				message: `Utilisateur ${user.user_lastname} ${user.user_firstname} connecté.`,
				status: StatusCodes.OK
			})
		} else {
			res.status(StatusCodes.OK).json({
				message: 'Mot de passe erroné.',
				status: StatusCodes.UNAUTHORIZED
			})
		}
	} else {
		res.status(StatusCodes.OK).json({
			message: `Utilisateur ${login} non trouvé.`,
			status: StatusCodes.UNAUTHORIZED
		})
	}
})

module.exports = router
