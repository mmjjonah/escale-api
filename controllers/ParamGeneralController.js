"use strict"

const express = require('express')
const {Param_general} = require('../models')
const db = require('../config/database');
const {StatusCodes} = require("http-status-codes");
const {checkToken} = require('../config/middleware')
const router = express.Router()

router.get('/', checkToken, async (req, res) => {
	const data = await Param_general.findAll();
	res.json({
		message: 'Liste des paramétrages',
		data,
		status: StatusCodes.OK
	})
})

router.post('/', checkToken, async (req, res) => {
	const { param_code, param_categories, param_description, param_ordre } = req.body;

	const paramData = await Param_general.build({
		param_ordre, param_description, param_categories, param_code
	})

	const data = await paramData.save()

	if (data) {
		res.json({
			message: 'Création avec succès.',
			data,
			status: StatusCodes.CREATED
		})
	} else {
		console.error(data)
		res.status(StatusCodes.INTERNAL_SERVER_ERROR)
	}
})

router.delete('/:id', checkToken, async (req, res) => {
	const { id } = req.params
	const data = await Param_general.destroy({
		where: {
			param_id: id
		}
	})

	if (data) {
		res.json({
			message: 'Suppression avec succès.',
			data,
			status: StatusCodes.OK
		})
	} else {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR)
	}
})

router.patch('/', checkToken, async (req, res) => {
	const { param_id, param_code, param_categories, param_description, param_ordre } = req.body;
	const data = await Param_general.update({
		param_ordre, param_description, param_categories, param_code
	},{
		where: { param_id }
	})

	if (data) {
		res.json({
			message: 'Modification avec succès.',
			data,
			status: StatusCodes.OK
		})
	} else {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR)
	}
})

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

router.get('/param_categories', checkToken, async (req, res) => {
	const data = await Param_general.findAll({
		attributes: [db.fn('DISTINCT', db.col('param_categories')), 'param_categories'],
	})
	res.json({
		message: 'Liste des catégories',
		data,
		status: StatusCodes.OK
	})
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
