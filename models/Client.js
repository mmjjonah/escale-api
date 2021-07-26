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
		client_sexe: {
			type: Sequelize.STRING(1)
		},
		client_age: {
			type: Sequelize.INTEGER
		},
	}, {
		timestamps: false,
		underscored: true,
	}
)
Client.associate = (models) => {
	Client.hasOne(models.Command, {as: 'command', sourceKey: 'client_id', foreignKey: 'command_client_fk'})
}
module.exports = Client
