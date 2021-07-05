"use strict"

const Sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define("users", {
		user_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		user_lastname: {
			type: Sequelize.STRING
		},
		user_firstname: {
			type: Sequelize.STRING
		},
		user_email: {
			type: Sequelize.STRING
		},
		user_group: {
			type: Sequelize.STRING
		},
		user_login: {
			type: Sequelize.STRING(100),
			unique: true
		},
		user_password: {
			type: Sequelize.TEXT
		},
		user_status: {
			type: Sequelize.STRING
		}
	}, {
		timestamps: false,
		underscored: true,
	}
)
