"use strict"

const Sequelize = require('sequelize')
const db = require('../config/database')

let Command = db.define("commands", {
		command_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		command_date_livraison: {
			type: Sequelize.DATE
		},
		command_lieu_livraison: {
			type: Sequelize.STRING(255)
		},
		command_evenement: {
			type: Sequelize.STRING(255)
		},
		command_montant_a_compte: {
			type: Sequelize.INTEGER
		},
		command_retour_client: {
			type: Sequelize.TEXT
		},
		command_client_fk: {
			type: Sequelize.INTEGER,
			reference: {
				model: 'client',
				key: 'client_id'
			}
		},
		command_user_fk: {
			type: Sequelize.INTEGER,
			reference: {
				model: 'users',
				key: 'user_id'
			}
		},
	}, {
		timestamps: true,
		underscored: true,
	}
)
Command.associate = (models) => {
	Command.belongsTo(models.User, {foreignKey: 'command_user_fk', as: 'user'})
	Command.belongsTo(models.Client, {foreignKey: 'command_client_fk', as: 'client'})
	Command.hasMany(models.Gateau, {foreignKey: 'gateau_command_fk', sourceKey: 'command_id', as: 'gateaux'})
}
module.exports = Command
