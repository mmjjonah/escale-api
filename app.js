"use strict"

const express = require('express')
const dotenv = require('dotenv')
const ROUTES = require('./app.routing')
const cors = require('cors');

const app = express()
dotenv.config()
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())

console.log(ROUTES);
ROUTES.map((route) => {
  app.use(route.path, require(`./controllers/${route.controller}`) )
})

app.listen(process.env.PORT, () => {
  console.log(`Serveur connecter : \n PORT: ${process.env.PORT}`)
})