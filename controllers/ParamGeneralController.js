"use strict"

const express = require('express')
const {Param_general} = require('../models')
const {StatusCodes} = require("http-status-codes");
const {checkToken} = require('../config/middleware')
const router = express.Router()

router.get('/param_code/:param_code', checkToken, async (req, res) => {
	const { param_code } = req.params
	if (param_code) {
		const data = await Param_general.findAll({
			where: {
				param_code
			}
		})
		res.json({
			message: 'Liste des paramétrages',
			data,
			status: StatusCodes.OK
		})
	} else {
		res.status(StatusCodes.NOT_FOUND)
			.json({
				message: 'Code invalide',
				status: StatusCodes.NOT_FOUND,
				data: null
			})
	}
})

router.get('/param_categories/:param_categories', checkToken, async (req, res) => {
	const { param_categories } = req.params
	if (param_categories) {
		const data = await Param_general.findAll({
			where: {
				param_categories
			}
		})
		res.json({
			message: 'Liste des paramétrages',
			data,
			status: StatusCodes.OK
		})
	} else {
		res.status(StatusCodes.NOT_FOUND)
			.json({
				message: 'Code invalide',
				status: StatusCodes.NOT_FOUND,
				data: null
			})
	}
})

module.exports = router
