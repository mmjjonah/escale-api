"use strict"

const Sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define("param_general", {
	param_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	param_categories: {
		type: Sequelize.STRING(100)
	},
	param_code: {
		type: Sequelize.STRING(100)
	},
	param_description: {
		type: Sequelize.TEXT
	},
	param_ordre: {
		type: Sequelize.INTEGER
	}
}, {
	timestamps: false
})
