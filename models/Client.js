"use strict"

const Sequelize = require('sequelize')
const db = require('../config/database')

let Client = db.define("clients", {
		client_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		client_lastname: {
			type: Sequelize.STRING(255)
		},
		client_firstname: {
			type: Sequelize.STRING(255)
		},
		client_contact: {
			type: Sequelize.STRING(255)
		},
	}, {
		timestamps: false
	}
)
Client.associate = (models) => {
	Client.hasMany(models.commands, {as: 'commands'})
}
module.exports = Client
