const { Sequelize } = require('sequelize')

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  logging: true
})

db.authenticate()
.then((_) => {
  console.log("Base de données connecté");
})

module.exports = db
