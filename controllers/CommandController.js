"use strict"

const express = require('express')
const path = require('path')
const {Op} = require("sequelize");
const {StatusCodes} = require("http-status-codes");
const {checkToken} = require("../config/middleware");
const {Client, Command, Gateau, Param_general} = require('../models')
const db = require('../config/database')
const {htmlToPdf} = require('../helpers/pdfHelper')
const ejs = require('ejs')
const fs = require('fs')
const readFile = fs.readFileSync
const moment = require('moment')
const {dataURLtoFile} = require('../helpers/fileHelper')
const {getDates, castDateForDb} = require('../helpers/dateHelper')
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
			command_heure_livraison,
			command_lieu_livraison,
			command_evenement,
			command_accessoire,
			command_montant_reduction,
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
			command_date_livraison: command_date_livraison + ' ' + command_heure_livraison,
			command_evenement,
			command_accessoire,
			command_montant_reduction,
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
							return !`${gateau.gateau_id}`.includes('new') ? gateau.gateau_id : -1
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
				gateau_arome_special: gateau.gateau_arome_special,
				gateau_piece_montee: gateau.gateau_piece_montee,
				gateau_layercake: gateau.gateau_layercake,
				gateau_dripcake: gateau.gateau_dripcake,
				gateau_observation: gateau.gateau_observation,
				gateau_montant_unitaire: gateau.gateau_montant_unitaire,
				gateau_montant_total: gateau.gateau_montant_total,
				gateau_command_fk: command.command_id
			}
			if (isNaN(gateau.gateau_id)) {
				_gateau.gateau_id = 0
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
					if (!fs.existsSync('uploads')) {
						fs.mkdirSync('uploads')
					}
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
	const { command_type } = req.query
	let where = {}
	if (command_type)
		where = {...where, command_type }
	try {
		const command = await Command.findAll({
			where: {
				...where
			},
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

router.get('/new-id', checkToken, async (req, res) => {
	try {
		res.json({
			message: 'New command id',
			data: parseInt(await Command.max('command_id'), 10) + 1,
			status: StatusCodes.OK
		})
	} catch (e) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
	}
})

router.delete('/:id', checkToken, async (req, res) => {
	try {
		const command_id = req.params.id
		const client_id = (await Command.findOne({
			where: {
				command_id
			},
			attributes: [ 'command_client_fk' ]
		})).command_client_fk

		await Client.destroy({
			where: {
				client_id
			}
		})

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
	// try {
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

		let printData = {}
		printData.numero = command.command_id.toString().padStart(5, '0')
		printData.date_recup = moment(new Date().getTime()).format('DD MMMM YYYY')
		printData.heure_recup = moment(new Date().getTime()).format('hh:mm')
		printData.nom = command.client.client_lastname +' '+ command.client.client_firstname
		printData.type = command.gateaux.map(g => g.type ? g.type.param_description : '').join('\n')
		printData.forme = command.gateaux.map(g => g.forme ? g.forme.param_description : '').join('\n')
		printData.nbr_pax = command.gateaux.reduce((acc, g) => acc + parseInt(g.gateau_nb_pax), 0)
		printData.couleur = command.gateaux.map(g => g.gateau_decoration).join('\n')
		printData.message = command.gateaux.map(g => g.gateau_message).join('\n')
		printData.azyme = ''
		printData.modele = command.gateaux.map(g => g.gateau_model).join('\n')
		printData.sexe = command.client.client_sexe
		printData.age = command.client.client_age
		printData.autre = ''
		printData.contact = command.client.client_contact
		printData.observation = command.command_retour_client
		printData.montant_total = command.gateaux.reduce((acc, g) => acc + parseInt(g.gateau_montant_total), 0)
		printData.avance = command.command_montant_a_compte
		printData.reste = printData.montant_total - parseInt(command.command_montant_a_compte)
		printData.gateaux = command.gateaux.map(g => {
			return {
				...g,
				gateau_model: g.gateau_model !== '' && g.gateau_model ? 'data:image/png;base64,' + fs.readFileSync(path.resolve(g.gateau_model), {encoding: 'base64'}) : ''
			}
		})

		const html = ejs.render(readFile('templates/purchase-order.ejs', {encoding: 'utf8'}), printData)

		const data = await htmlToPdf(html, {
			output: 'B',
			format: 'A5'
		})

		res.json({
			message: 'Téléchargement du bon de commande',
			data,
			status: StatusCodes.OK
		})
	// } catch (e) {
	// 	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
	// }
})

router.get('/gateau_model/:gateau_id', async (req, res) => {
	// try {
		const {gateau_id} = req.params
		const gateau = (await Gateau.findByPk(gateau_id)).toJSON()
		const data = fs.readFileSync(gateau.gateau_model, {encoding: 'base64'})
		res.json({
			message: 'model du gâteau',
			data,
			status: StatusCodes.OK
		})
	// } catch (e) {
	// 	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
	// }
})

router.get('/chart', async (req, res) => {
	let { date_du, date_au, type } = req.query
	let data = []
	const select = type === 'paiements' ? 'sum(gateaux.gateau_montant_total)' : 'count(*)'
	type = type === 'paiements' ? 'gateaux' : type
	let dates = getDates(new Date(date_du), new Date(date_au)).map(d => castDateForDb(d))

	for (let i = 0; i < dates.length; i++) {
		const date = dates[i];

		let {count} = (await db.query(`SELECT ${select} AS count FROM ${type} AS ${type} WHERE DATE(${type}.created_at) = '${date}'`))[0][0]
		data = [...data, {
			date, count
		}]
	}

	res.json({
		message: 'Results',
		data,
		status: StatusCodes.OK
	})
})

router.get('/day-data', checkToken, async (req, res) => {
	let data = {}

	data.commandDay = (await db.query(`SELECT count(*) AS count FROM commands WHERE DATE(commands.created_at) = '${castDateForDb(new Date())}'`))[0][0].count
	data.gateauDay = (await db.query(`SELECT count(*) AS count FROM gateaux WHERE DATE(gateaux.created_at) = '${castDateForDb(new Date())}'`))[0][0].count
	data.clientDay = (await db.query(`SELECT count(*) AS count FROM clients WHERE DATE(clients.created_at) = '${castDateForDb(new Date())}'`))[0][0].count
	data.montantDay = (await db.query(`SELECT sum(gateaux.gateau_montant_total) AS count FROM gateaux WHERE DATE(gateaux.created_at) = '${castDateForDb(new Date())}'`))[0][0].count

	res.json({
		message: 'Results',
		data,
		status: StatusCodes.OK
	})
})

module.exports = router
