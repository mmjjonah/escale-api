"use strict"

const Sequelize = require('sequelize')
const db = require('../config/database')

let Gateau = db.define("gateaux", {
		gateau_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		gateau_nb_pax: {
			type: Sequelize.INTEGER
		},
		gateau_decoration: {
			type: Sequelize.TEXT
		},
		gateau_model: {
			type: Sequelize.STRING(255)
		},
		gateau_observation: {
			type: Sequelize.TEXT
		},
		gateau_message: {
			type: Sequelize.STRING(255)
		},
		gateau_montant_unitaire: {
			type: Sequelize.INTEGER
		},
		gateau_montant_total: {
			type: Sequelize.INTEGER
		},
		gateau_command_fk: {
			type: Sequelize.INTEGER,
			reference: {
				model: 'Commands',
				key: 'command_id'
			}
		},
		user_form_param_fk: {
			type: Sequelize.INTEGER,
			reference: {
				model: 'Param_generals',
				key: 'param_id'
			}
		},
		gateau_type_param_fk: {
			type: Sequelize.INTEGER,
			reference: {
				model: 'Param_generals',
				key: 'param_id'
			}
		},
	}, {
		timestamps: false
	}
)
Gateau.associate = (models) => {
	Gateau.belongsTo(models.param_generals, {foreignKey: 'user_form_param_fk', as: 'FORME_GATEAU'})
	Gateau.belongsTo(models.param_generals, {foreignKey: 'gateau_type_param_fk', as: 'TYPE_GATEAU'})
	Gateau.belongsTo(models.commands, {foreignKey: 'gateau_command_fk', as: 'command'})
}
module.exports = Gateau
