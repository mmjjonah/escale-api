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
		gateau_arome_special: {
			type: Sequelize.STRING(255)
		},
		gateau_piece_montee: {
			type: Sequelize.INTEGER
		},
		gateau_layercake: {
			type: Sequelize.INTEGER
		},
		gateau_dripcake: {
			type: Sequelize.INTEGER
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
		gateau_form_param_fk: {
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
		timestamps: false,
		freezeTableName: true,
		underscored: true,
	}
)
Gateau.associate = (models) => {
	Gateau.belongsTo(models.Param_general, {foreignKey: 'gateau_form_param_fk', as: 'forme'})
	Gateau.belongsTo(models.Param_general, {foreignKey: 'gateau_type_param_fk', as: 'type'})
	Gateau.belongsTo(models.Command, {foreignKey: 'gateau_command_fk', as: 'command'})
}
module.exports = Gateau
