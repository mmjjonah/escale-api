"use strict"

const { Sequelize } = require('sequelize')
const db = require('../config/database')

module.exports = db.define("users", {
  user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    user_nom: {
      type: Sequelize.STRING
    },
    user_prenom: {
      type: Sequelize.STRING
    }
  }, { 
    timestamps: false 
  }
)