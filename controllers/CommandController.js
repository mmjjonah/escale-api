"use strict"

const express = require('express')
const {Op} = require("sequelize");
const {StatusCodes} = require("http-status-codes");
const {checkToken} = require("../config/middleware");
const {Client, Command, Gateau, Param_general} = require('../models')
const {htmlToPdf} = require('../helpers/pdfHelper')
const ejs = require('ejs')
const readFile = require('fs').readFileSync
const moment = require('moment')
const fs = require('fs')
const {dataURLtoFile} = require('../helpers/fileHelper')
moment.locale('fr');

const router = express.Router()

router.put('/', checkToken, async (req, res) => {
	// try {
		const user = req.decoded

		let checkModif = 0
		const {
			client_id,
			client_lastname,
			client_firstname,
			client_contact,
			client_age,
			client_sexe,
			command_id,
			command_date_livraison,
			command_lieu_livraison,
			command_evenement,
			command_montant_a_compte,
			gateaux
		} = req.body

		let client = {
			client_lastname,
			client_firstname,
			client_contact,
			client_age,
			client_sexe,
			client_id,
		}
		if (client_id) {
			//update client
			await Client.update(client, {
				where: {
					client_id
				}
			})
			checkModif++
		} else {
			//insert client
			const clientData = Client.build(client)
			client = await clientData.save()
		}
		let command = {
			command_id,
			command_lieu_livraison,
			command_date_livraison,
			command_evenement,
			command_montant_a_compte,
			command_client_fk: client.client_id,
			command_user_fk: user.user_id
		}
		if (command_id) {
			//update command
			await Command.update(command, {
				where: {
					command_id
				}
			})
			checkModif++
		} else {
			//insert command by client
			const commandData = Command.build(command)
			command = await commandData.save()
		}

		// delete gateau
		await Gateau.destroy({
			where: {
				[Op.and]: {
					gateau_id: {
						[Op.notIn] : gateaux.map((gateau) => {
							return gateau.gateau_id
						})
					},
					gateau_command_fk: command.command_id
				}
			}
		})

		//insert or update gateaux by command
		for (const gateau of gateaux) {
			let _gateau = {
				gateau_id: gateau.gateau_id,
				gateau_nb_pax: gateau.gateau_nb_pax,
				gateau_form_param_fk: gateau.gateau_form_param_fk,
				gateau_type_param_fk: gateau.gateau_type_param_fk,
				gateau_decoration: gateau.gateau_decoration,
				gateau_message: gateau.gateau_message,
				gateau_observation: gateau.gateau_observation,
				gateau_montant_unitaire: gateau.gateau_montant_unitaire,
				gateau_montant_total: gateau.gateau_montant_total,
				gateau_command_fk: command.command_id
			}

			if (gateau.gateau_id.toString().includes('new__')) {
				const gateauData = Gateau.build(_gateau)
				_gateau = await gateauData.save()

			} else {
				await Gateau.update(_gateau, {
					where: {
						gateau_id: gateau.gateau_id
					}
				})
				checkModif++
			}

			if (gateau.gateau_model && gateau.gateau_model.startsWith('data:')) {
				const commandPath = `uploads/command_${command_id}`
				if (!fs.existsSync(commandPath)) {
					fs.mkdirSync(commandPath)
				}
				const filePath = dataURLtoFile(gateau.gateau_model, commandPath, _gateau.gateau_id.toString().padStart(10, '0'))
				await Gateau.update({
					gateau_model: filePath
				}, {
					where: {
						gateau_id: _gateau.gateau_id
					}
				})
			}
		}

		if (checkModif === 0) {
			res.status(StatusCodes.CREATED).json({
				message: "Création commande réussi.",
				status: StatusCodes.CREATED
			})
		} else {
			res.json({
				message: "Modification commande réussi.",
				status: StatusCodes.OK
			})
		}
	// } catch (e) {
	// 	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
	// }
})

router.get('/', checkToken, async (req, res) => {
	try {
		const command = await Command.findAll({
			include: [
				{
					model: Client,
					as: 'client',
				},
				{
					model: Gateau,
					as: 'gateaux',
					include: [
						{
							model: Param_general,
							as: 'forme',
							attributes: ['param_description', 'param_id', 'param_code']
						},
						{
							model: Param_general,
							as: 'type',
							attributes: ['param_description', 'param_id', 'param_code']
						},
					]
				}
			]
		})

		res.json({
			message: 'Liste des commandes',
			data: command,
			status: StatusCodes.OK
		})
	} catch (e) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
	}
})

router.delete('/:id', checkToken, async (req, res) => {
	try {
		const command_id = req.params.id
		await Command.destroy({
			where: {
				command_id
			}
		})
		res.json({
			message: 'Commande supprimé.',
			status: StatusCodes.OK
		})
	} catch (e) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
	}
})

router.post('/feedback', checkToken, async (req, res) => {
	try {
		const { command_id, command_retour_client } = req.body

		res.json({
			message: 'Ajout retour client réussi.',
			data: await Command.update({ command_retour_client }, {where: {command_id} }),
			status: StatusCodes.OK
		})

	} catch (e) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
	}
})

router.get('/purchase-order/:id', async (req, res) => {
	const command_id = req.params.id
	const commandRes = await Command.findOne({
		where: { command_id },
		include: [
			{
				model: Client,
				as: 'client',
			},
			{
				model: Gateau,
				as: 'gateaux',
				include: [
					{
						model: Param_general,
						as: 'forme',
						attributes: ['param_description', 'param_id', 'param_code']
					},
					{
						model: Param_general,
						as: 'type',
						attributes: ['param_description', 'param_id', 'param_code']
					},
				]
			}
		]
	})
	const command = commandRes.toJSON()
	
	command.command_date_livraison = moment(new Date(command.command_date_livraison).getTime()).format('DD MMMM YYYY')
	const html = ejs.render(readFile('templates/purchase-order.ejs', {encoding: 'utf8'}), command)

	const data = await htmlToPdf(html, {
		output: 'B'
	})

	res.json({
		message: 'Téléchargement du bon de commande',
		data,
		status: StatusCodes.OK
	})
})

router.get('/gateau_model/:gateau_id', async (req, res) => {
	try {
		const {gateau_id} = req.params
		const gateau = (await Gateau.findByPk(gateau_id)).toJSON()
		const data = fs.readFileSync(gateau.gateau_model, {encoding: 'base64'})
		res.json({
			message: 'model du gâteau',
			data,
			status: StatusCodes.OK
		})
	} catch (e) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
	}
})

module.exports = router
