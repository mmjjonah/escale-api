"use strict"

const Sequelize = require('sequelize')
const db = require('../config/database')

let Command = db.define("commands", {
		command_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		user_date_livraison: {
			type: Sequelize.DATE
		},
		user_client_fk: {
			type: Sequelize.INTEGER,
			reference: {
				model: 'Clients',
				key: 'client_id'
			}
		},
	}, {
		timestamps: false
	}
)
Command.associate = (models) => {
	Command.belongsTo(models.clients, {foreignKey: 'user_form_param_fk', as: 'clients'})
}
module.exports = Command
