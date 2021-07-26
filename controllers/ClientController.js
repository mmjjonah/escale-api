"use strict"

const express = require('express')
const {StatusCodes} = require("http-status-codes");
const {Client, Command} = require('../models')

const router = express.Router()

router.get('/', async (req, res) => {
	const client = await Client.findAll({
		include: [
			{
				model: Command,
				as: 'command',
				attributes: ['created_at']
			}
		]
	})
	res.json({
		message: 'Liste des clients.',
		data: client,
		status: StatusCodes.OK
	})
})

module.exports = router
